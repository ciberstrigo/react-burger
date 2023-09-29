import ReactDOM from "react-dom";
import styles from "./ModalOverlay.module.css";
import React, {FC, ReactNode} from "react";

const modalRoot = document.getElementById("modals");

interface IModalOverlay {
    children: ReactNode
    onClick: () => void
}

const ModalOverlay: FC<IModalOverlay> = ({ children, onClick }) => {
    React.useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClick();
            }
        };

        document.addEventListener("keydown", handleEsc, false);

        return () => {
            document.removeEventListener("keydown", handleEsc, false);
        };
    }, [onClick]);

    if (modalRoot) {
        return ReactDOM.createPortal(
            <div className={styles.root} onClick={onClick}>
                {children}
            </div>,
            modalRoot,
        );
    } else {
        return null;
    }
};

export default ModalOverlay;
