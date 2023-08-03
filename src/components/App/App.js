import React from "react";
import AppHeader from "../AppHeaders/AppHeader";
import BurgerIngredients from "../BurgerIngridients/BurgerIngridients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor"
import style from "./App.module.css"
import data from "../../utils/data";

class App extends React.Component {
    state = {
        assortment: data,
        burgerBun: data.filter((e) => e.type === 'bun')[0],
        ingredients: data.filter((e) => e.type !== 'bun')
    };

    render() {
        return (<main className={style.App__main}>
            <AppHeader/>
            <div className={style.App__content}>
                <div className={style.App__container}>
                    <BurgerIngredients assortment={this.state.assortment}/>
                    <BurgerConstructor ingredients={this.state.ingredients} burgerBun={this.state.burgerBun}/>
                </div>
            </div>
        </main>);
    }
}

export default App;
