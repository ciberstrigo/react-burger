import styles from "./IngredientImage.module.css";
import { FC } from "react";

interface IProps {
    image : string | undefined,
    alt : string | undefined,
    hide?: string
}

const IngredientImage : FC<IProps> = ({ image, alt, hide=false }) => {
    return (
        <div className={hide ? (`${styles.content} ${styles.hide}`) : (`${styles.content}`)}>
            <div className={styles.item}>
                <img className={styles.image} src={image} alt={alt} />
            </div>
        </div>
    );
};

export default IngredientImage;