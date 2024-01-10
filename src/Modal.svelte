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
            close();
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (!options.closeWithEscape) {
            return;
        }

        if (event.key === "Escape") {
            close();
        }
    }

    function close() {
        dispatch("close", null);
    }
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    class="dark-overlay"
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
        <svelte:component this={component} {...componentProps} />
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
