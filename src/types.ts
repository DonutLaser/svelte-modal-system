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
}