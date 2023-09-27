import React, {ChangeEvent, FC, FormEvent, useState} from "react";
import styles from "./login.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import {loginning} from "../../services/actions/user";
import {useAppDispatch} from "../../utils/hooks";

const Login: FC = () => {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState({email: '', password: ''});

    const onChangeFormData = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setFormData({...formData, [target.name]: target.value})
    }

    const onLogging = (e: FormEvent<HTMLFormElement>) => {
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