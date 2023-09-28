import React, {FC, useRef} from "react";
import style from "./BurgerConstructorItem.module.css";
import {
    ConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
    DELETE_INGREDIENT_FROM_CONSTRUCTOR,
    replaceItems
} from "../../services/actions/constructor";

import {useDrag, useDrop, XYCoord} from "react-dnd";
import {TIngredient} from "../../utils/types";
import {useAppDispatch} from "../../utils/hooks";

interface IBurgerConstrictorItem {
    item: TIngredient,
    index: number
}

const BurgerConstructorItem: FC<IBurgerConstrictorItem> = ({ item, index }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const dispatch = useAppDispatch();

    const deleteIngredientFromConstructor = (item: TIngredient) => {
        dispatch({
            type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
            id: item._id,
        });
    };

    const [, drop] = useDrop({
        accept: "constructorIngredient",
        hover: (item: TIngredient, monitor) => {
            if (!ref.current) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset: XYCoord|null = monitor.getClientOffset();
            const hoverClientY = clientOffset?.y as number - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            dispatch(replaceItems(dragIndex, hoverIndex));

            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: "constructorIngredient",
        item: () => {
            return { id: item._id, index: index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    const opacity = isDragging ? 0 : 1;

    return (
        <div
            className={`${style.item}`}
            draggable
            ref={ref}
            style={{ opacity }}
        >
            <DragIcon type="primary" />
            <ConstructorElement
                isLocked={false}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => deleteIngredientFromConstructor(item)}
            />
        </div>
    );
};

export default BurgerConstructorItem;
