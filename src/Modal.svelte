<script lang="ts">
    import type { Component } from "svelte";
    import { cubicInOut } from "svelte/easing";
    import { fade, fly } from "svelte/transition";
    import { closeActiveModal } from "./modal-system";
    import type { ModalOptions } from "./types";

    // ================== VARIABLES ==================
    interface Props {
        component?: Component;
        options?: ModalOptions;
        componentProps?: any;
    }

    let { component, options = {}, componentProps = {} }: Props = $props();

    let outsideClickStartedOnOverlay = false;

    let isDragging = $state(false);
    let top = $state(0);
    let left = $state(0);

    let startX = 0;
    let startY = 0;
    let initialLeft = 0;
    let initialTop = 0;

    let transitionDuration = $derived(options?.animate ? 350 : 0);
    const SvelteComponent = $derived(component);

    // ================== FUNCTIONS ==================
    function startDrag(event: MouseEvent): void {
        if (event.button !== 0) {
            return;
        }

        event.preventDefault();
        isDragging = true;
        startX = event.clientX;
        startY = event.clientY;
        initialLeft = left;
        initialTop = top;
    }

    function onMouseMove(event: MouseEvent): void {
        if (!isDragging) {
            return;
        }

        if (event.buttons === 0) {
            isDragging = false;
            return;
        }

        left = initialLeft + (event.clientX - startX);
        top = initialTop + (event.clientY - startY);
    }

    function onMouseUp(): void {
        if (isDragging) {
            isDragging = false;
        }
    }

    function onTouchStart(event: TouchEvent): void {
        if (event.touches.length !== 1) {
            return;
        }

        const touch = event.touches[0];
        isDragging = true;
        startX = touch.clientX;
        startY = touch.clientY;
        initialLeft = left;
        initialTop = top;
    }

    function onTouchMove(event: TouchEvent): void {
        if (!isDragging || event.touches.length !== 1) {
            return;
        }

        const touch = event.touches[0];
        left = initialLeft + (touch.clientX - startX);
        top = initialTop + (touch.clientY - startY);
    }

    function onTouchEnd(): void {
        if (isDragging) {
            isDragging = false;
        }
    }
    function onMouseDown(event: MouseEvent): void {
        if (!options.closeOnOutsideClick) {
            return;
        }

        const target = event.target as HTMLElement;
        if (target.id === "dark-overlay") {
            // We do this to prevent click that started in the modal from closing the modal accidentally when
            // it ends outside the modal.
            outsideClickStartedOnOverlay = true;
        }
    }

    function handleClick(event: MouseEvent): void {
        if (!options.closeOnOutsideClick) {
            return;
        }

        const target = event.target as HTMLElement;
        if (target.id === "dark-overlay" && outsideClickStartedOnOverlay) {
            outsideClickStartedOnOverlay = false;
            close();
        }
    }

    function handleKeydown(event: KeyboardEvent): void {
        if (!options.closeWithEscape) {
            return;
        }

        if (event.key === "Escape") {
            close();
        }
    }

    function close(): void {
        closeActiveModal(null);
    }
</script>

<svelte:window
    onkeydown={handleKeydown}
    onmousemove={onMouseMove}
    onmouseup={onMouseUp}
    ontouchmove={onTouchMove}
    ontouchend={onTouchEnd}
    ontouchcancel={onTouchEnd}
/>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
    class="dark-overlay"
    id="dark-overlay"
    onmousedown={onMouseDown}
    onclick={handleClick}
    transition:fade={{ duration: transitionDuration }}
>
    <div
        class={[options.customWindowClass || "modal-system-modal", options.draggable ? "draggable" : ""]}
        style="width: {options.width}; height: {options.height};{options.draggable ? ` top: ${top}px; left: ${left}px;` : ''}"
        transition:fly={{
            duration: transitionDuration,
            y: 100,
            opacity: 0,
            easing: cubicInOut,
        }}
    >
        {#if options.draggable}
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
                class="draggable-overlay"
                class:dragging={isDragging}
                onmousedown={startDrag}
                ontouchstart={onTouchStart}
            ></div>
        {/if}
        <SvelteComponent {...componentProps}></SvelteComponent>
    </div>
</div>

<style>
    .dark-overlay {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 100%;
        height: 100%;

        position: absolute;
        top: 0;
        left: 0;

        background-color: rgba(0, 0, 0, 0.3);

        z-index: 1000;
    }

    .modal-system-modal {
        background-color: white;
        box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.67);

        border-radius: 0.4rem;

        z-index: 2000;
    }

    .draggable {
        position: relative;
    }

    .draggable-overlay {
        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 30px;

        cursor: grab;
        touch-action: none;
        user-select: none;
    }

    .draggable-overlay.dragging {
        cursor: grabbing;
    }
</style>
