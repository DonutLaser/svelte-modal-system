<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    // ================== VARIABLES ==================
    export let message = "";
    export let confirmButtonName = "Confirm";
    export let confirmButtonClass = "";
    export let cancelButtonName = "Cancel";
    export let cancelButtonClass = "";

    // ================== FUNCTIONS ==================
    function onConfirmClick() {
        dispatch("close", true);
    }

    function onCancelClick() {
        dispatch("close", false);
    }
</script>

<div class="confirmation-modal-body">
    <span>{message}</span>
</div>
<div class="confirmation-modal-footer">
    <button class="{confirmButtonClass} spacing" on:click={onConfirmClick}>{confirmButtonName}</button>
    <button class={cancelButtonClass} on:click={onCancelClick}>{cancelButtonName}</button>
</div>

<style>
    .confirmation-modal-body {
        width: 100%;
        height: fit-content;
        padding: 0.5rem;
    }

    .confirmation-modal-footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;

        border-top: 1px solid #eee;
        padding: 0.5rem;
    }

    button.spacing {
        margin-right: 0.5rem;
    }
</style>
