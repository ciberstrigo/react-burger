import styles from './pageNotFound.module.css';
import React from "react";

const PageNotFound = () => {
    return (
        <div className={styles.root}>
            <p className="text_type_main-large mt-0">404 page not found...</p>
        </div>
    );
}

export default PageNotFound;