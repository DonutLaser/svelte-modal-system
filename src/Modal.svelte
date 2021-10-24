<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    import type { ModalOptions } from "./types";
    import { fly, fade } from "svelte/transition";
    import { cubicInOut } from "svelte/easing";

    // ================== VARIABLES ==================
    export let component: any = null;
    export let options: ModalOptions = {};
    export let componentProps: any = {};

    $: transitionDuration = options?.animate ? 350 : 0;

    // ================== FUNCTIONS ==================
    function handleClick(event: MouseEvent) {
        if (!options.closeOnOutsideClick) {
            return;
        }

        const target = event.target as HTMLElement;
        if (target.id === "dark-overlay") {
            close(null);
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (!options.closeWithEscape) {
            return;
        }

        if (event.key === "Escape") {
            close(null);
        }
    }

    function close(data: any) {
        dispatch("close", data);
    }
</script>

<svelte:window on:keydown={handleKeydown} />

<div
    class="dark-overlay"
    class:center-children={options.openInCenter}
    class:top-children={!options.openInCenter}
    id="dark-overlay"
    on:click={handleClick}
    transition:fade={{ duration: transitionDuration }}
>
    <div
        class={options.customWindowClass || "modal-system-modal"}
        style="width: {options.width}; height: {options.height}"
        transition:fly={{
            duration: transitionDuration,
            y: 100,
            opacity: 0,
            easing: cubicInOut,
        }}
    >
        <svelte:component this={component} {...componentProps} on:close={close} />
    </div>
</div>

<style>
    .dark-overlay {
        display: flex;
        justify-content: center;

        width: 100%;
        height: 100%;

        position: absolute;
        top: 0;
        left: 0;

        background-color: rgba(0, 0, 0, 0.3);

        padding: 1rem;
    }

    .dark-overlay.center-children {
        align-items: center;
    }

    .dark-overlay.top-children {
        align-items: flex-start;
    }

    .modal-system-modal {
        background-color: white;
        box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.67);

        border-radius: 0.3rem;
    }
</style>
