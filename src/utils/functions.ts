import {TIngredient, TOrder} from "./types";

export const uniq = (arr: Array<any>) => {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (result.indexOf(arr[i]) === -1) {
            result.push(arr[i]);
        }
    }
    return result
}

export const countTotalPrice = (orderIngredientsData: Array<TIngredient>) => {
    return orderIngredientsData.reduce(
        (sum : number, item : TIngredient | undefined) => {
            if (item?.type === "bun") {
                return item.price * 2;
            }
            return item ? item.price : 0;
        },
    0);
}

export const getOrderStatusAsString = (order: TOrder): string => {
    if (order.status === "done") {
        return "Выполнен";
    }

    if (order.status === "pending") {
        return "Готовится";
    }

    if (order.status === "created") {
        return "Создан";
    }

    return "Выполнен";
}
