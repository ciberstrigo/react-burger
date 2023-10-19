import React, {useCallback} from "react";
import AppHeader from "../AppHeaders/AppHeader";
import style from "./App.module.css";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import { getIngredients } from "../../services/actions/getIngredients";
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
import {TIngredient} from "../../utils/types";
import {useAppDispatch} from "../../utils/hooks";
import Feed from "../../pages/Feed/feed";
import Order from "../../pages/Order/Order";
import {CLEAN_ORDER_NUMBER} from "../../services/actions/applyOrder";

const App = () => {
    const [orderVisible, setOrderVisible] = React.useState(false);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state?.background;

    const toggleOrderDetails = () => {
        setOrderVisible(!orderVisible);
    };

    const closeOrderDetails = () => {
        setOrderVisible(false);
        dispatch({type: CLEAN_ORDER_NUMBER});
    };

    const showIngredientDetails = (ingredient: TIngredient) => {
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
                <Route path="/"
                       element={
                            <DndProvider backend={HTML5Backend}>
                                <HomePage toggleOrderDetails={toggleOrderDetails}
                                          showIngredientDetails={showIngredientDetails}/>
                            </DndProvider>} />

                <Route path="*" element={<PageNotFound />} />
                <Route path="/login" element={<ProtectedRoute anonymous={true}><Login /></ProtectedRoute>} />
                <Route path="/register" element={<ProtectedRoute anonymous={true}><Register /></ProtectedRoute>} />
                <Route path="/forgot-password" element={<ProtectedRoute anonymous={true}><ForgotPassword /></ProtectedRoute>} />
                <Route path="/reset-password" element={<ProtectedRoute anonymous={true}><ResetPassword /></ProtectedRoute>} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/profile/orders/:id" element={<ProtectedRoute anonymous={false}><Order /></ProtectedRoute>} />
                <Route path="/profile/*" element={<ProtectedRoute anonymous={false}><Profile /></ProtectedRoute>} />
                <Route path={"/ingredients/:ingredientId"} element={<IngredientDetails/>}/>
                <Route path={"/feed"} element={<Feed />}/>
                <Route path={"/feed/:id"} element={<Order />}/>
            </Routes>
            {orderVisible && (
                <Modal onClose={closeOrderDetails}>
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
            {background && (
                <Routes>
                    <Route
                        path="/feed/:id"
                        element={
                            <Modal onClose={modalClose}>
                                <Order />
                            </Modal>
                        }
                    />
                </Routes>
            )}
            {background && (
                <Routes>
                    <Route
                        path="/profile/orders/:id"
                        element={
                            <Modal onClose={modalClose}>
                                <Order />
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </div>
    );
};

export default App;
