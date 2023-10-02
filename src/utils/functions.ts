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

type TResult = {
    done: Array<number>,
    pending: Array<number>
}

export const filterOrders = (orders : Array<TOrder>) => {
    if (!orders) {
        return null
    }
    const result : TResult = {done: [], pending: []}
    orders.filter((item : TOrder) => {
        return item.status === "done"
            ? result.done.push(item.number)
            : result.pending.push(item.number)
    })

    // Комментарий кода который сокращает просто гигантский список
    // result.done = result.done.slice(0, 5);
    // result.pending = result.pending.slice(0, 5);

    return result
}
