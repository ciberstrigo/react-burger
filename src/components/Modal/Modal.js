import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import PropTypes from "prop-types";

const Modal = ({ header, children, onClick }) => {
    return (
        <ModalOverlay onClick={onClick}>
            <div className={`${styles.Modal__root} pt-10 pr-10 pb-15 pl-10`} onClick={e => e.stopPropagation()}>
                <div className={styles.Modal__header}>
                    { header && <h2 className="text_type_main-large">{header}</h2>}
                    <button className={styles.Modal__closeButton} onClick={onClick}>
                        <CloseIcon type="primary" />
                    </button>
                </div>
                {children}
            </div>
        </ModalOverlay>
    );
};

Modal.propTypes = {
    header: PropTypes.string,
    children: PropTypes.element,
    onClick: PropTypes.func
};

export default Modal;
