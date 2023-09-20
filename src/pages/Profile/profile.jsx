import React from "react";
import styles from "./profile.module.css";
import {ProfileMenu} from "../../components/ProfileMenu/ProfileMenu";
import ProfileForm from "../../components/ProfileForm/ProfileForm";

export function Profile() {
    return (
        <div className={styles.root}>
            <ProfileMenu />
            <ProfileForm />
        </div>
    );
}