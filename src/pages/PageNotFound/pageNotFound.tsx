import styles from './pageNotFound.module.css';
import React, {FC} from "react";

const PageNotFound: FC = () => {
    return (
        <div className={styles.root}>
            <p className="text_type_main-large mt-0">404 page not found...</p>
        </div>
    );
}

export default PageNotFound;