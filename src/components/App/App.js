import React from "react";
import AppHeader from "../AppHeaders/AppHeader";
import BurgerIngredients from "../BurgerIngridients/BurgerIngridients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor"
import style from "./App.module.css"
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";

const API_URL = 'https://norma.nomoreparties.space/api';

class App extends React.Component {
    state = {
        orderVisible: false,
        currentIngredient: null
    };

    toggleOrderDetails = () => {
        this.setState({
            ...this.state,
            orderVisible: !this.state.orderVisible
        });
    }

    showIngredientDetails = (ingredient) => {
        this.setState({
            ...this.state,
            currentIngredient: ingredient ?? null
        });
    }

    componentDidMount() {
        fetch(`${API_URL}/ingredients`)
            .then(response => response.json())
            .then(({data}) => {
                console.log('first time executed');
                this.setState({
                    ...this.state,
                    assortment: data, // TODO вылечить эту фигню, три стейта это странно наверное
                    burgerBun: data.filter((e) => e.type === 'bun')[0],
                    ingredients: data.filter((e) => e.type !== 'bun'),
                });
            }).catch(error => {
                console.error('Ошибка при получении данных:', error);
            });
    }

    render() {
        return (<main className={style.App__main}>
            <AppHeader/>
            <div className={style.App__content}>
                <div className={style.App__container}>
                    <BurgerIngredients assortment={this.state.assortment}
                                       showDetails={this.showIngredientDetails}
                    />
                    <BurgerConstructor ingredients={this.state.ingredients}
                                       burgerBun={this.state.burgerBun}
                                       showOrderDetails={this.toggleOrderDetails}
                    />
                </div>
            </div>
            {this.state.orderVisible && (<Modal onClick={this.toggleOrderDetails}>
                <OrderDetails />
            </Modal>)}
            {this.state.currentIngredient &&
                (<Modal header={"Детали ингредиента"} onClick={() => {this.showIngredientDetails(null)}}>
                    <IngredientDetails ingredient={this.state.currentIngredient}/>
                </Modal>)}
        </main>);
    }
}

export default App;
