import React from "react";
import styles from "./forgotPassword.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {forgotPassword} from "../../services/actions/user";

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const { isAuth } = useSelector(store => store.user);
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');

    const onEmailConfirm = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email, navigate));
    }

    if (isAuth) {
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
                    onSubmit={onEmailConfirm}
                >
                    <Input
                        type={'email'}
                        placeholder={'E-mail'}
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        name={'email'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                    <Button type="primary" size="medium" htmlType="submit">
                        Восстановить
                    </Button>
                </form>
                <div className={styles.logging}>
                    <span className="text_type_main-default">Вспомнили пароль?</span>
                    <Link to="/login" className={`${styles.link} ml-2 text_type_main-default`}>Войти</Link>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;