import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsItem from "../BurgerIngredientsItem/BurgerIngredientsItem";
import style from "./BurgerIngridients.module.css";
import PropTypes from "prop-types";
import types from "../../utils/types";
import {useSelector} from "react-redux";

const BurgerIngredients = ({ showDetails }) => {
    const tabs = [
        {
            name: "bun",
            title: "Булки",
        },
        {
            name: "sauce",
            title: "Соусы",
        },
        {
            name: "main",
            title: "Начинки",
        },
    ];

    const [current, setCurrent] = React.useState(tabs[0].name);
    const scrollContainerRef = React.useRef(null);

    const tabRefs = {
        bun: React.useRef(null),
        sauce: React.useRef(null),
        main: React.useRef(null)
    };

    const ingredients = useSelector(store => store.burger.ingredients);

    const handleScroll = () => {
        const scrollContainerPosition =
            scrollContainerRef
                .current
                .getBoundingClientRect()
                .top;

        const bunHeaderPosition =  tabRefs['bun'].current.getBoundingClientRect().top;
        const sauceHeaderPosition = tabRefs['sauce'].current.getBoundingClientRect().top;
        const mainHeaderPosition = tabRefs['main'].current.getBoundingClientRect().top;

        const bunDiff = Math.abs(scrollContainerPosition - bunHeaderPosition);
        const sauceDiff = Math.abs(scrollContainerPosition - sauceHeaderPosition);
        const mainDiff = Math.abs(scrollContainerPosition - mainHeaderPosition);

        if(bunDiff < sauceDiff) {
            setCurrent('bun');
        } else if (sauceDiff < mainDiff) {
            setCurrent('sauce');
        } else {
            setCurrent('main');
        }
    };

    return (
        <section className={style.ingredients}>
            <h1 className={style.ingredients__title}>Соберите бургер</h1>
            <div className={style.ingredients__menu}>
                {tabs.map((tab) => (
                    <Tab
                        value={tab.name}
                        active={current === tab.name}
                        onClick={(tabName) => {
                            setCurrent(tabName);
                            scrollContainerRef
                                .current.scrollTop =
                                tabRefs[tabName].current.offsetTop - scrollContainerRef.current.offsetTop - 40;
                        }}
                        key={tab.name}
                    >
                        {tab.title}
                    </Tab>
                ))}
            </div>
            <div className={`${style.ingredients__list}`}
                 ref={scrollContainerRef}
                 onScroll={handleScroll}>
                {tabs.map((category) => (
                    <div key={category.name}>
                        <h1 className={style.ingredients__list__title} ref={tabRefs[category.name]}>
                            {category.title}
                        </h1>
                        <ul className={style.ingredients__list__collection}>
                            {ingredients &&
                                ingredients
                                    .filter(
                                        (position) =>
                                            position.type === category.name,
                                    )
                                    .map((e) => {
                                        return (
                                            <BurgerIngredientsItem
                                                onClick={showDetails}
                                                key={e._id}
                                                data={e}
                                                count={0}
                                            />
                                        );
                                    })}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

BurgerIngredients.propTypes = {
    assortment: PropTypes.arrayOf(types.ingredient),
    showDetails: PropTypes.func,
};

export default BurgerIngredients;
