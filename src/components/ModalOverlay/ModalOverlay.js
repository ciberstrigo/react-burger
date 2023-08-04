import ReactDOM from 'react-dom';
import styles from './ModalOverlay.module.css';
import PropTypes from "prop-types";
import React from "react";

const modalRoot = document.getElementById("modals");

const ModalOverlay = ({ children, onClick }) => {
    const handleEsc = (e) => {
        if (e.key === "Escape") {
            onClick();
        }
    }

    React.useEffect(() => {
        document.addEventListener("keydown", handleEsc, false);

        return () => {
            document.removeEventListener("keydown", handleEsc, false);
        };
    }, []);

    if(modalRoot) {
        return ReactDOM.createPortal(
            (
                <div className={styles.root} onClick={onClick}>
                    {children}
                </div>
            ),
            modalRoot
        );
    } else {
        return null;
    }
};

ModalOverlay.propTypes = {
    children: PropTypes.element,
    onClick: PropTypes.func
};

export default ModalOverlay;