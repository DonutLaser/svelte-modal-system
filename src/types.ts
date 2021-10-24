export interface ModalOptions {
    width?: string;
    height?: string;
    customWindowClass?: string;
    closeWithEscape?: boolean;
    closeOnOutsideClick?: boolean;
    animate?: boolean;
    openInCenter?: boolean;
}

export interface InformationModalOptions extends ModalOptions {
    okButtonName?: string;
    okButtonClass?: string;
    message: string;
}

export interface ConfirmationModalOptions extends ModalOptions {
    confirmButtonName?: string;
    cancelButtonName?: string;
    confirmButtonClass?: string;
    cancelButtonClass?: string;
    message: string;
}