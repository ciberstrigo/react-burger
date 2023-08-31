import React from "react";
import AppHeader from "../AppHeaders/AppHeader";
import style from "./App.module.css";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import { getIngredients } from "../../services/actions/getIngredients";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from "../../pages/HomePage/homePage";
import {SET_CURRENT_INGREDIENT} from "../../services/actions/ingredientInfo";
import PageNotFound from "../../pages/PageNotFound/pageNotFound";
import Login from "../../pages/Login/login";
import Register from "../../pages/Register/register";
import ForgotPassword from "../../pages/ForgotPassword/forgotPassword";
import Logout from "../../pages/Logout/logout";
import ResetPassword from "../../pages/ResetPassword/resetPassword";
import {Profile} from "../../pages/Profile/profile";
import ProtectedRouteElement from "../ProtectedRouteElement/ProtectedRouteElement";

const App = () => {
    const [orderVisible, setOrderVisible] = React.useState(false);
    const currentIngredient = useSelector(
        (store) => store.burger.modalReducer.currentIngredient,
    );
    const dispatch = useDispatch();
    const location = useLocation();

    let background = location.state;

    if (location.state) {
        background = location.state.background;
    }

    const toggleOrderDetails = () => {
        setOrderVisible(!orderVisible);
    };

    const showIngredientDetails = (ingredient) => {
        dispatch({
            type: SET_CURRENT_INGREDIENT,
            currentIngredient: ingredient ?? null,
        });
    };

    React.useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    return (
        <div className={style.App__main}>
            <AppHeader />
            <Routes location={background || location}>
                <Route path="/" exact={true}
                       element={
                            <DndProvider backend={HTML5Backend}>
                                <HomePage toggleOrderDetails={toggleOrderDetails}
                                          showIngredientDetails={showIngredientDetails}/>
                            </DndProvider>} />

                <Route path="*" element={<PageNotFound />} />
                <Route path="/login" exact={true} element={<Login />} />
                <Route path="/register" exact={true} element={<Register />} />
                <Route path="/forgot-password" exact={true} element={<ForgotPassword />} />
                <Route path="/reset-password" exact={true} element={<ResetPassword />} />
                <Route path="/logout" exact={true} element={<Logout />} />
                <Route path="/profile" exact={true} element={<ProtectedRouteElement><Profile /></ProtectedRouteElement>} />
            </Routes>
            {orderVisible && (
                <Modal onClose={toggleOrderDetails}>
                    <OrderDetails />
                </Modal>
            )}
            {currentIngredient && (
                <Modal
                    header={"Детали ингредиента"}
                    onClose={() => {
                        showIngredientDetails(null);
                    }}
                >
                    <IngredientDetails ingredient={currentIngredient} />
                </Modal>
            )}
        </div>
    );
};

export default App;
