<script lang="ts">
    import type { Component } from 'svelte';
    import { cubicInOut } from 'svelte/easing';
    import { fade, fly } from 'svelte/transition';
    import { closeActiveModal } from './modal-system';
    import type { ModalOptions } from './types';

    // ================== VARIABLES ==================
    interface Props {
        component?: Component;
        options?: ModalOptions;
        componentProps?: any;
    }

    let { component, options = {}, componentProps = {} }: Props = $props();

    let transitionDuration = $derived(options?.animate ? 350 : 0);
    const SvelteComponent = $derived(component);

    // ================== FUNCTIONS ==================
    function handleClick(event: MouseEvent) {
        if (!options.closeOnOutsideClick) {
            return;
        }

        const target = event.target as HTMLElement;
        if (target.id === 'dark-overlay') {
            close();
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (!options.closeWithEscape) {
            return;
        }

        if (event.key === 'Escape') {
            close();
        }
    }

    function close() {
        closeActiveModal(null);
    }
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
    class="dark-overlay"
    id="dark-overlay"
    onclick={handleClick}
    transition:fade={{ duration: transitionDuration }}
>
    <div
        class={options.customWindowClass || 'modal-system-modal'}
        style="width: {options.width}; height: {options.height}"
        transition:fly={{
            duration: transitionDuration,
            y: 100,
            opacity: 0,
            easing: cubicInOut,
        }}
    >
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
</style>
