import type { ModalOptions } from './types';
import { ModalRef } from './ModalRef';

import Modal from './Modal.svelte';

let modalRef: ModalRef = null;

export function openModal(component: any, options?: ModalOptions, componentProps?: any) {
    if (modalRef) {
        console.error('A modal is already open.');
        return;
    }

    let modalOptions: ModalOptions = {
        width: '600px',
        height: '500px',
        customWindowClass: '',
        closeOnOutsideClick: true,
        closeWithEscape: true,
        animate: true,
        openInCenter: true,
    };
    modalOptions = { ...modalOptions, ...options };

    const props: any = { component };
    props.options = modalOptions;
    if (componentProps) { props.componentProps = componentProps; }

    const modal = new Modal({
        target: document.body,
        props,
        intro: true,
    });

    modal.$on('close', (event: CustomEvent<any>) => { closeActiveModal(event.detail) });

    modalRef = new ModalRef(modal);

    return modalRef;
}

export function closeActiveModal(artifacts?: any) {
    if (!modalRef) { return; }

    modalRef.close(artifacts)
    modalRef = null;
}