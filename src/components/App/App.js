import React, {useCallback} from "react";
import AppHeader from "../AppHeaders/AppHeader";
import style from "./App.module.css";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import { getIngredients } from "../../services/actions/getIngredients";
import { useDispatch } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import HomePage from "../../pages/HomePage/homePage";
import PageNotFound from "../../pages/PageNotFound/pageNotFound";
import Login from "../../pages/Login/login";
import Register from "../../pages/Register/register";
import ForgotPassword from "../../pages/ForgotPassword/forgotPassword";
import Logout from "../../pages/Logout/logout";
import ResetPassword from "../../pages/ResetPassword/resetPassword";
import {Profile} from "../../pages/Profile/profile";
import ProtectedRoute from "../ProtectedRouteElement/ProtectedRoute";

const App = () => {
    const [orderVisible, setOrderVisible] = React.useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state && location.state.background;

    const toggleOrderDetails = () => {
        setOrderVisible(!orderVisible);
    };

    const showIngredientDetails = (ingredient) => {
        navigate(`/ingredients/${ingredient._id}`, {
            state: { background: location },
        });
    };

    const modalClose = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    React.useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    return (
        <div className={style.App__main}>
            <AppHeader />
            <Routes location={background || location}>
                <Route path="/" exact
                       element={
                            <DndProvider backend={HTML5Backend}>
                                <HomePage toggleOrderDetails={toggleOrderDetails}
                                          showIngredientDetails={showIngredientDetails}/>
                            </DndProvider>} />

                <Route path="*" element={<PageNotFound />} />
                <Route path="/login" exact element={<ProtectedRoute onlyAuth={false}><Login /></ProtectedRoute>} />
                <Route path="/register" exact element={<ProtectedRoute onlyAuth={false}><Register /></ProtectedRoute>} />
                <Route path="/forgot-password" exact element={<ProtectedRoute onlyAuth={false}><ForgotPassword /></ProtectedRoute>} />
                <Route path="/reset-password" exact element={<ProtectedRoute onlyAuth={false}><ResetPassword /></ProtectedRoute>} />
                <Route path="/logout" exact element={<Logout />} />
                <Route path="/profile" exact element={<ProtectedRoute onlyAuth><Profile /></ProtectedRoute>} />
                <Route path={"/ingredients/:ingredientId"} element={<IngredientDetails header="Детали ингредиента"/>}/>
            </Routes>
            {orderVisible && (
                <Modal onClose={toggleOrderDetails}>
                    <OrderDetails />
                </Modal>
            )}
            {background && (
                <Routes>
                    <Route
                        path="/ingredients/:ingredientId"
                        element={
                            <Modal
                                header={"Детали ингредиента"}
                                onClose={modalClose}
                            >
                                <IngredientDetails/>
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </div>
    );
};

export default App;
