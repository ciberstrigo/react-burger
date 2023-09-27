import React, {FC} from "react";
import styles from "./profile.module.css";
import {ProfileMenu} from "../../components/ProfileMenu/ProfileMenu";
import ProfileForm from "../../components/ProfileForm/ProfileForm";

export const Profile: FC = () => {
    return (
        <div className={styles.root}>
            <ProfileMenu />
            <ProfileForm />
        </div>
    );
}