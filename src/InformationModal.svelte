<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    // ================== VARIABLES ==================
    export let message = "";
    export let buttonName = "Ok";
    export let buttonClass = "";

    // ================== FUNCTIONS ==================
    function onOkClick() {
        dispatch("close", null);
    }
</script>

<div class="information-modal-body">
    <span>{message}</span>
</div>
<div class="information-modal-footer">
    <button class={buttonClass} on:click={onOkClick}>{buttonName}</button>
</div>

<style>
    .information-modal-body {
        width: 100%;
        height: fit-content;
        padding: 0.5rem;
    }

    .information-modal-footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;

        border-top: 1px solid #eee;
        padding: 0.5rem;
    }
</style>
