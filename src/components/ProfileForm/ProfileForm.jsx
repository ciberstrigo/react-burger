import React from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ProfileForm.module.css';
import useFormData from "../../utils/useFormData";

export default function ProfileForm() {
    const [formData, onChangeFormData, onCancel, onSaveChanges] = useFormData()

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