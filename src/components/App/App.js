import React from "react";
import AppHeader from "../AppHeaders/AppHeader";
import BurgerIngredients from "../BurgerIngridients/BurgerIngridients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import style from "./App.module.css";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";

const API_URL = "https://norma.nomoreparties.space/api";

const App = () => {
  const [orderVisible, setOrderVisible] = React.useState(false);
  const [currentIngredient, setCurrentIngredient] = React.useState(null);

  const [assortment, setAssortment] = React.useState();
  const [burgerBun, setBurgerBun] = React.useState();
  const [ingredients, setIngredients] = React.useState();

  React.useEffect(() => {
    fetch(`${API_URL}/ingredients`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(`Ошибка ${response.status}`);
      })
      .then(({ data }) => {
        setAssortment(data);
        setBurgerBun(data.filter((e) => e.type === "bun")[0]);
        setIngredients(data.filter((e) => e.type !== "bun"));
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
      });
  }, []);

  const toggleOrderDetails = () => {
    setOrderVisible(!orderVisible);
  };

  const showIngredientDetails = (ingredient) => {
    setCurrentIngredient(ingredient ?? null);
  };

  return (
    <div className={style.App__main}>
      <AppHeader />
      <main className={style.App__content}>
        <div className={style.App__container}>
          <BurgerIngredients
            assortment={assortment}
            showDetails={showIngredientDetails}
          />
          <BurgerConstructor
            ingredients={ingredients}
            burgerBun={burgerBun}
            showOrderDetails={toggleOrderDetails}
          />
        </div>
      </main>
      {orderVisible && (
        <Modal onClick={toggleOrderDetails}>
          <OrderDetails />
        </Modal>
      )}
      {currentIngredient && (
        <Modal
          header={"Детали ингредиента"}
          onClick={() => {
            showIngredientDetails(null);
          }}
        >
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
    </div>
  );
};

export default App;
