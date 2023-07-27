import React from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsItem from "../BurgerIngredientsItem/BurgerIngredientsItem";
import style from "./BurgerIngridients.module.css"
import PropTypes from "prop-types";

class BurgerIngredients extends React.Component {
    tabs = [
        {
            name: 'bun',
            title: 'Булки',
        },
        {
            name: 'sauce',
            title: 'Соусы',
        },
        {
            name: 'main',
            title: 'Начинки',
        },
    ]

    constructor(props) {
        super(props);
        this.state = {
            current: this.tabs[0].name,
        };
    }

    render() {
        return <section className={style.ingredients}>
            <h1 className={style.ingredients__title}>
                Соберите бургер
            </h1>
            <div style={{display: "flex"}}>
                {
                    this.tabs.map((tab) => (
                        <Tab
                            value={tab.name}
                            active={this.state.current === tab.name}
                            onClick={(tabName) => {this.setState(prevState => {
                                return {
                                    ...prevState.current,
                                    current: tabName
                                }
                            })}}
                            key={tab.name}
                        >
                            {tab.title}
                        </Tab>
                    ))
                }
            </div>
            <div className={style.ingredients__list}>
                {this.tabs.map( (category) => (
                    <div key={category.name}>
                        <h1 className={style.ingredients__list__title}>
                            {category.title}
                        </h1>
                        <ul className={style.ingredients__list__collection}>
                            {
                                this.props.assortment
                                    .filter((position) => position.type === category.name)
                                    .map(
                                        (e) => {
                                            return <BurgerIngredientsItem key={e._id} data={e} count={'0'}/>
                                        }
                                    )
                            }
                        </ul>
                    </div>
                ) )}
            </div>
        </section>;
    }
}

BurgerIngredients.propTypes = {
    assortment: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string,
            name: PropTypes.string,
            price: PropTypes.number,
            image: PropTypes.string
        })
    ),
};


export default BurgerIngredients;