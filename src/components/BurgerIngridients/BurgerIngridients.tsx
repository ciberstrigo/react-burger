import React, {FC, MutableRefObject} from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsItem from "../BurgerIngredientsItem/BurgerIngredientsItem";
import style from "./BurgerIngridients.module.css";
import {useAppSelector} from "../../utils/hooks";
import {TIngredient} from "../../utils/types";

interface IBurgerIngredients {
    showDetails: (ingredient: TIngredient) => void
}

const BurgerIngredients: FC<IBurgerIngredients> = ({ showDetails }) => {
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
    const scrollContainerRef = React.useRef() as MutableRefObject<HTMLDivElement>;

    const tabRefs = {
        bun: React.useRef() as MutableRefObject<HTMLDivElement>,
        sauce: React.useRef() as MutableRefObject<HTMLDivElement>,
        main: React.useRef() as MutableRefObject<HTMLDivElement>,
    };

    const ingredients: Array<TIngredient> =
        useAppSelector(store => store.burger.ingredientsReducer.ingredients);

    const handleScroll = () => {
        const scrollContainerPosition =
            scrollContainerRef.current.getBoundingClientRect().top;

        const bunHeaderPosition =
            tabRefs["bun"].current.getBoundingClientRect().top;
        const sauceHeaderPosition =
            tabRefs["sauce"].current.getBoundingClientRect().top;
        const mainHeaderPosition =
            tabRefs["main"].current.getBoundingClientRect().top;

        const bunDiff = Math.abs(scrollContainerPosition - bunHeaderPosition);
        const sauceDiff = Math.abs(
            scrollContainerPosition - sauceHeaderPosition,
        );
        const mainDiff = Math.abs(scrollContainerPosition - mainHeaderPosition);

        if (bunDiff < sauceDiff) {
            setCurrent("bun");
        } else if (sauceDiff < mainDiff) {
            setCurrent("sauce");
        } else {
            setCurrent("main");
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
                            scrollContainerRef.current.scrollTop =
                                tabRefs[tabName as keyof typeof tabRefs].current.offsetTop -
                                scrollContainerRef.current.offsetTop -
                                40;
                        }}
                        key={tab.name}
                    >
                        {tab.title}
                    </Tab>
                ))}
            </div>
            <div
                className={`${style.ingredients__list}`}
                ref={scrollContainerRef}
                onScroll={handleScroll}
            >
                {tabs.map((category) => (
                    <div key={category.name}>
                        <h1
                            className={style.ingredients__list__title}
                            ref={tabRefs[category.name as keyof typeof tabRefs]}
                        >
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
                                                ingredient={e}
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

export default BurgerIngredients;
