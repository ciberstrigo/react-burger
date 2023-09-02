import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getUserInfo, updateUserInfo} from "../services/actions/user";

export default function useFormData() {
    const userData = useSelector(state => state.user.data);
    const dispatch = useDispatch();

    const onChangeFormData = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
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

    const onCancel = (e) => {
        e.preventDefault();
        dispatch(getUserInfo());
    };

    const onSaveChanges = (e) => {
        e.preventDefault();
        dispatch(updateUserInfo(formData));
    }

    return [formData, onChangeFormData, onCancel, onSaveChanges];
}