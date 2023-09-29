import React, {FormEvent} from "react";
import styles from "./forgotPassword.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {forgotPassword} from "../../services/actions/user";
import {FC} from "react";
import {useAppDispatch} from "../../utils/hooks";

const ForgotPassword: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');

    const onEmailConfirm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(forgotPassword(email, navigate));
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
                        autoComplete={'email'}
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