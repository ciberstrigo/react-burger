import React from "react";
import {FC} from "react";
import {useAppDispatch} from "../../utils/hooks";
import styles from "./feed.module.css";
import {WS_FEED_CONNECTION_CLOSED, WS_FEED_CONNECTION_START} from "../../services/actions/webSocketActionTypes";
import Orders from "../../components/Orders/orders";
import OrdersStats from "../../components/OrderStats/orderStats";

const Feed: FC = () => {
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch({ type: WS_FEED_CONNECTION_START });

        return () => {
            dispatch({type: WS_FEED_CONNECTION_CLOSED})
        }
    }, [dispatch]);

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