import React, {FC} from "react";
import styles from "./register.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Navigate} from "react-router-dom";
import {useAppSelector} from "../../utils/hooks";
import { register } from '../../services/actions/user';
import {RootState} from "../../utils/store";
import {useAppDispatch} from "../../utils/hooks";

const Register: FC = () => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector((store: RootState) => store.user.isAuth);

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: ''
    });

    const onChangeFormData = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setFormData({
            ...formData,
            [target.name]: target.value
        });
    }

    const onRegistration = (e: React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(register({ ...formData }));
    }

    if (isAuth) {
        return (
            <Navigate
                to={{
                    pathname: '/'
                }}
            />
        );
    }

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <h1 className={`${styles.title} text_type_main-medium mb-6`}>Регистрация</h1>
                <form
                    id="registration-form"
                    className={`${styles.form} mb-20`}
                    onSubmit={onRegistration}
                >
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={onChangeFormData}
                        value={formData.name}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        autoComplete={'username'}
                    />
                    <Input
                        type={'email'}
                        placeholder={'E-mail'}
                        onChange={onChangeFormData}
                        value={formData.email}
                        name={'email'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        autoComplete={'email'}
                    />
                    <Input
                        type={'password'}
                        placeholder={'Пароль'}
                        onChange={onChangeFormData}
                        value={formData.password}
                        name={'password'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        autoComplete={'current-password'}
                    />
                    <Button type="primary" size="medium" htmlType={"submit"}>
                        Зарегистироваться
                    </Button>
                </form>
                <div className={styles.logging}>
                    <span className="text_type_main-default">Уже зарегистированы?</span>
                    <Link to="/login" className={`${styles.link} ml-2 text_type_main-default`}>Войти</Link>
                </div>
            </div>
        </div>
    )
}

export default Register;