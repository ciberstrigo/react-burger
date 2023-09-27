import {useAppSelector} from "./hooks";
import React, {useEffect, useState} from "react";
import {getUserInfo, updateUserInfo} from "../services/actions/user";
import {useAppDispatch} from "./hooks";
import {RootState} from "./store";

export default function useFormData(): [
    formData: {name: string, email: string, password: string},
    onChangeFormData: (e: React.SyntheticEvent) => void,
    onCancel: (e: React.SyntheticEvent) => void,
    onSaveChanges: (e: React.FormEvent) => void
] {
    const userData = useAppSelector((state: RootState) => state.user.data);
    const dispatch = useAppDispatch();

    const onChangeFormData = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setFormData({
            ...formData,
            [target.name]: target.value
        });
    }

    const [formData, setFormData] = useState({
        name: userData.name,
        email: userData.email,
        password: userData.password
    });

    useEffect(() => {
        dispatch(getUserInfo());
    }, [dispatch])

    useEffect(() => {
        setFormData({...formData, ...userData});
    }, [userData]);

    const onCancel = (e: React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(getUserInfo());
    };

    const onSaveChanges = (e: React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(updateUserInfo(formData));
    }

    return [formData, onChangeFormData, onCancel, onSaveChanges];
}