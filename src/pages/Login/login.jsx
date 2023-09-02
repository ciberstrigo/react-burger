import React from "react";
import styles from "./login.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginning, UPDATE_USER_DATA} from "../../services/actions/user";

const Login = () => {
    const dispatch = useDispatch();
    const formData = useSelector(store => store.user.data);

    const onChangeFormData = (e) => {
        dispatch({type: UPDATE_USER_DATA, payload: {
                ...formData,
                [e.target.name]: e.target.value
        }});
    }

    const onLogging = (e) => {
        e.preventDefault();
        dispatch(loginning({ ...formData }));
    }

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <h1 className={`${styles.title} text_type_main-medium mb-6`}>Вход</h1>
                <form
                    id="login-form"
                    className={`${styles.form} mb-20`}
                    onSubmit={onLogging}
                >
                    <Input
                        type={'email'}
                        placeholder={'E-mail'}
                        onChange={onChangeFormData}
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
                        value={formData.password}
                        name={'password'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                    <Button type="primary" size="medium" htmlType="submit">
                        Войти
                    </Button>
                </form>
                <div className={`${styles.logging} mb-4`}>
                    <span className="text_type_main-default">Вы — новый пользователь?</span>
                    <Link to="/register" className={`${styles.link} ml-2 text_type_main-default`}>Зарегистироваться</Link>
                </div>
                <div className={styles.logging}>
                    <span className="text_type_main-default">Забыли пароль?</span>
                    <Link to="/forgot-password" className={`${styles.link} ml-2 text_type_main-default`}>Восстановить пароль</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;