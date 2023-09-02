import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import {getUserInfo, updateUserInfo} from '../../services/actions/user';
import styles from './ProfileForm.module.css';

export default function ProfileForm() {
    const dispatch = useDispatch();
    const onChangeFormData = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const userData = useSelector(state => state.user.data);

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

    const onCancel = (e) => {
        e.preventDefault();
        dispatch(getUserInfo());
    };

    const onSaveChanges = (e) => {
        e.preventDefault();
        dispatch(updateUserInfo(formData));
    }

    return (
        <form
            id="profile-form"
            className={styles.form}
            onSubmit={onSaveChanges}
        >
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={onChangeFormData}
                icon={'EditIcon'}
                value={formData.name}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />
            <Input
                type={'email'}
                placeholder={'E-mail'}
                onChange={onChangeFormData}
                icon={'EditIcon'}
                value={formData.email}
                name={'email'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />
            <Input
                type={'password'}
                placeholder={'Пароль'}
                onChange={onChangeFormData}
                icon={'EditIcon'}
                value={formData.password}
                name={'password'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />
            <div className={styles.container}>
                <Button
                    type={"primary"}
                    size={"medium"}
                    htmlType={"submit"}
                >
                    Сохранить
                </Button>
                <Button
                    type={"secondary"}
                    size={"medium"}
                    onClick={onCancel}
                    htmlType={"button"}
                >
                    Отмена
                </Button>
            </div>
        </form>
    );
}