import React, {FC} from "react";
import styles from "./profile.module.css";
import {ProfileMenu} from "../../components/ProfileMenu/ProfileMenu";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import {Route, Routes} from "react-router-dom";
import ProfileOrders from "../../components/ProfileOrders/ProfileOrders";

export const Profile: FC = () => {
    return (
        <div className={styles.root}>
            <ProfileMenu />
            <Routes>
                <Route path={'orders'} element={<ProfileOrders />}></Route>
                <Route path={''} element={<ProfileForm />}></Route>
            </Routes>
        </div>
    );
}