import React, {FC} from "react";
import style from "./LoadingSpinner.module.css";

export const LoadingSpinner: FC = () => {
    return (
        <div className={style.ldsRing}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}