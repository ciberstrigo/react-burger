import {useAppSelector} from "./hooks";
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {getUserInfo, updateUserInfo} from "../services/actions/user";
import {useAppDispatch} from "./hooks";

export default function useFormData(): [
    formData: {name: string, email: string, password: string},
    onChangeFormData: (e: ChangeEvent<HTMLInputElement>) => void,
    onCancel: (e: React.SyntheticEvent) => void,
    onSaveChanges: (e: FormEvent<HTMLFormElement>) => void
] {
    const userData = useAppSelector(state => state.user.data);
    const dispatch = useAppDispatch();

    const onChangeFormData = (e: ChangeEvent<HTMLInputElement>) => {
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

    const onSaveChanges = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updateUserInfo(formData));
    }

    return [formData, onChangeFormData, onCancel, onSaveChanges];
}