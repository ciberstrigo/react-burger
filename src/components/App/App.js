import React from "react";
import AppHeader from "../AppHeaders/AppHeaders";
import BurgerIngredients from "../BurgerIngridients/BurgerIngridients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor"
import AppStyles from "./App.module.css"
import data from "../../utils/data";

class App extends React.Component {
    state = {
        assortment: data,
        burgerBun: data.filter((e) => e.type === 'bun')[0]
    };

    render() {
        return <main className={AppStyles.App__main}>
            <AppHeader/>
            <main style={{ display: "flex", justifyContent: "center" }}> {/*, "*/}
                <div style={{maxWidth: "1250px", display: "flex", gap: "40px"}}>
                    <BurgerIngredients assortment={this.state.assortment}/>
                    <BurgerConstructor ingredients={this.state.assortment} burgerBun={this.state.burgerBun}/>
                </div>
            </main>
        </main>;
    }
}

export default App;