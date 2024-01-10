import type Modal from './Modal.svelte';

export class ModalRef {
    private modal: Modal = null;
    private closeCallback: Function = null;

    constructor(modal: Modal) {
        this.modal = modal;
    }

    close(artifacts?: any) {
        this.modal.$destroy();
        if (this.closeCallback) {
            this.closeCallback(artifacts);
        }
    }

    onClose(callback: Function) {
        this.closeCallback = callback;
    }
}