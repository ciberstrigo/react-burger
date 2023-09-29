import React, {FC, ReactNode} from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

interface IModal {
    header?: string;
    children?: ReactNode;
    onClose: () => void;
}

const Modal: FC<IModal> = ({ header, children, onClose }) => {
    return (
        <ModalOverlay onClick={onClose}>
            <div
                className={`${styles.Modal__root} pt-10 pr-10 pb-15 pl-10`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.Modal__header}>
                    {header && (
                        <h2 className="text_type_main-large">{header}</h2>
                    )}
                    <button
                        className={styles.Modal__closeButton}
                        onClick={onClose}
                    >
                        <CloseIcon type="primary" />
                    </button>
                </div>
                {children}
            </div>
        </ModalOverlay>
    );
};

export default Modal;
