import type Modal from './Modal.svelte';

export class ModalRef {
    private modal: Modal | null = null;
    private closeCallback: Function | null = null;

    constructor(modal: Modal) {
        this.modal = modal;
    }

    close(artifacts?: any) {
        if (this.modal) {
            this.modal.$destroy();

            if (this.closeCallback) {
                this.closeCallback(artifacts);
            }
        }
    }

    onClose(callback: Function) {
        this.closeCallback = callback;
    }
}