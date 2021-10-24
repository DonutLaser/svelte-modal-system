import type { InformationModalOptions, ModalOptions } from './types';
import { ModalRef } from './ModalRef';

import Modal from './Modal.svelte';
import InformationModal from './InformationModal.svelte';

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

export function openInformationModal(options?: InformationModalOptions) {
    if (modalRef) {
        console.error("A modal is already open.")
        return;
    }

    let modalOptions: InformationModalOptions = {
        width: '480px',
        height: 'fit-content',
        customWindowClass: '',
        closeOnOutsideClick: false,
        closeWithEscape: true,
        animate: true,
        openInCenter: false,
        okButtonClass: '',
        okButtonName: 'Ok',
        message: '',
    };
    modalOptions = { ...modalOptions, ...options };

    const props: any = { component: InformationModal };
    props.options = modalOptions;
    props.componentProps = {
        message: modalOptions.message,
        buttonClass: modalOptions.okButtonClass,
        buttonName: modalOptions.okButtonName,
    };

    const modal = new Modal({
        target: document.body,
        props,
        intro: true,
    });

    modal.$on('close', () => { closeActiveModal(null); });

    modalRef = new ModalRef(modal);

    return modalRef;
}

export function closeActiveModal(artifacts?: any) {
    if (!modalRef) { return; }

    modalRef.close(artifacts)
    modalRef = null;
}