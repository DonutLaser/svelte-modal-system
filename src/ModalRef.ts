import { unmount, type Component } from 'svelte';

export class ModalRef {
    private modal: Component | null = null;
    private closeCallback: Function | null = null;

    constructor(modal: Component) {
        this.modal = modal;
    }

    close(artifacts?: any) {
        if (this.modal) {
            unmount(this.modal);

            if (this.closeCallback) {
                this.closeCallback(artifacts);
            }
        }
    }

    onClose(callback: Function) {
        this.closeCallback = callback;
    }
}