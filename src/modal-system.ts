import { ModalRef } from './ModalRef';
import type { ModalOptions } from './types';

import { mount, type Component } from "svelte";
import Modal from './Modal.svelte';

let modalRef: ModalRef | null = null;

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
        animate: false
    };
    modalOptions = { ...modalOptions, ...options };

    const props: any = { component };
    props.options = modalOptions;
    if (componentProps) { props.componentProps = componentProps; }

    const modal = mount(Modal, {
        target: document.body,
        props,
        intro: true
    });

    modalRef = new ModalRef(modal as Component);

    return modalRef;
}

export function closeActiveModal(artifacts?: any) {
    if (!modalRef) { return; }

    modalRef.close(artifacts)
    modalRef = null;
}