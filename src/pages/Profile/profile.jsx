import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useLocation} from "react-router-dom";
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