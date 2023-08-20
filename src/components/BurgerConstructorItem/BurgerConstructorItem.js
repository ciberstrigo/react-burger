import React, { useRef } from "react";
import style from "./BurgerConstructorItem.module.css";
import {
    ConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import types from "../../utils/types";
import { useDispatch } from "react-redux";
import {
    DELETE_INGREDIENT_FROM_CONSTRUCTOR,
    replaceItems,
} from "../../services/actions";
import { useDrag, useDrop } from "react-dnd";
import PropTypes from "prop-types";

const BurgerConstructorItem = ({ item, index }) => {
    const ref = useRef(null);
    const dispatch = useDispatch();

    const deleteIngredientFromConstructor = (e, item) => {
        e.preventDefault();

        dispatch({
            type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
            id: item._id,
        });
    };

    const [, drop] = useDrop({
        accept: "constructorIngredient",
        hover: (item, monitor) => {
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
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
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
                handleClose={(e) => deleteIngredientFromConstructor(e, item)}
            />
        </div>
    );
};

BurgerConstructorItem.propTypes = {
    item: types.ingredient,
    index: PropTypes.number,
};

export default BurgerConstructorItem;
