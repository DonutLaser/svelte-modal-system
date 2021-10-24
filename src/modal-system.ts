import type { ConfirmationModalOptions, InformationModalOptions, ModalOptions } from './types';
import { ModalRef } from './ModalRef';

import Modal from './Modal.svelte';
import InformationModal from './InformationModal.svelte';
import ConfirmationModal from './ConfirmationModal.svelte';

let modalRef: ModalRef = null;

function openModalWithComponent(component: any, options: ModalOptions | InformationModalOptions, componentProps?: any) {
    if (modalRef) {
        console.error("A modal is already open.");
        return;
    }

    const props: any = { component };
    props.options = options;
    if (componentProps) { props.componentProps = componentProps; }

    const modal = new Modal({
        target: document.body,
        props,
        intro: true,
    });

    modal.$on("close", (event: CustomEvent<any>) => { closeActiveModal(event.detail); });

    modalRef = new ModalRef(modal);
    return modalRef;
}

export function openModal(component: any, options?: ModalOptions, componentProps?: any) {
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

    return openModalWithComponent(component, modalOptions, componentProps);
}

export function openInformationModal(options?: InformationModalOptions) {
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

    const componentProps: any = { message: modalOptions.message, buttonClass: modalOptions.okButtonClass, buttonName: modalOptions.okButtonName };

    return openModalWithComponent(InformationModal, modalOptions, componentProps);
}

export function openConfirmationModal(options?: ConfirmationModalOptions) {
    let modalOptions: ConfirmationModalOptions = {
        width: '480px',
        height: 'fit-content',
        customWindowClass: '',
        closeOnOutsideClick: false,
        closeWithEscape: true,
        animate: true,
        openInCenter: false,
        confirmButtonClass: '',
        confirmButtonName: 'Confirm',
        cancelButtonClass: '',
        cancelButtonName: 'Cancel',
        message: '',
    };
    modalOptions = { ...modalOptions, ...options };

    const componentProps: any = {
        message: modalOptions.message,
        confirmButtonClass: modalOptions.confirmButtonClass,
        confirmButtonName: modalOptions.confirmButtonName,
        cancelButtonClass: modalOptions.cancelButtonClass,
        cancelButtonName: modalOptions.cancelButtonName,
    };

    return openModalWithComponent(ConfirmationModal, modalOptions, componentProps);
}

export function closeActiveModal(artifacts?: any) {
    if (!modalRef) { return; }

    modalRef.close(artifacts)
    modalRef = null;
}