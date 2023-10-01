import React, {useEffect} from "react";
import {FC} from "react";
import {useAppDispatch} from "../../utils/hooks";
import styles from "./feed.module.css";
import {WS_FEED_CONNECTION_CLOSED, WS_FEED_CONNECTION_START} from "../../services/actions/webSocketActionTypes";
import Orders from "../../components/Orders/orders";
import OrdersStats from "../../components/OrderStats/orderStats";

const Feed: FC = () => {
    return (
        <main className={styles.content}>
            <div className={styles.container}>
                <Orders />
                <OrdersStats />
            </div>
        </main>
    );
}

export default Feed;