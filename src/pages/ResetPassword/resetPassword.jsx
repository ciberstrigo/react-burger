import React from "react";
import styles from "./resetPassword.module.css"
import {useDispatch, useSelector} from "react-redux";
import {Link, Navigate, useLocation, useNavigate} from "react-router-dom";
import {resetPassword} from "../../services/actions/user";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";

const ResetPassword = () => {
    const dispatch = useDispatch();
    const isAuth= useSelector(store => store.user.isAuth);
    const navigate = useNavigate();
    const location = useLocation();
    const [token, setToken] = React.useState('');
    const [password, setPassword] = React.useState('');

    const onChangePassword = (e) => {
        e.preventDefault();
        dispatch(resetPassword(password, token, navigate));
    }

    if (isAuth || !location?.state) {
        return (
            <Navigate to={"/"}/>
        );
    }

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <h1 className={`${styles.title} text_type_main-medium mb-6`}>Восстановление пароля</h1>
                <form
                    id="forgot-password-form"
                    className={`${styles.form} mb-20`}
                    onSubmit={onChangePassword}
                >
                    <Input
                        type={'password'}
                        placeholder={'Введите новый пароль'}
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        name={'password'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        autoComplete={'new-password'}
                    />
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={e => setToken(e.target.value)}
                        value={token}
                        name={'code'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        autoComplete={'one-time-code'}
                    />
                    <Button type="primary" size="medium" htmlType="submit">
                        Сохранить
                    </Button>
                </form>
                <div className={styles.logging}>
                    <span className="text_type_main-default">Вспомнили пароль?</span>
                    <Link to="/login" className={`${styles.link} ml-2 text_type_main-default`}>Войти</Link>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;