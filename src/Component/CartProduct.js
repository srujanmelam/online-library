import store from "./store";
import { actionTypes } from "./reducers/CartReducer";

const CartProduct = ({item}) => {

  const deleteFromCart = () => {
    const action = {
      type: actionTypes.DELETE_FROM_CART,
      payload: {
        item: item,
      },
    };
    store.dispatch(action);
    console.log("deleted a book in cart")
  };

  return (
    <div>
      <label>Title : {item.title}</label>
      <label>Author : {item.author}</label>
      <label>ISBN : {item.ISBN}</label>
      <label>Publication : {item.publication}</label>
      <button onClick={deleteFromCart}>Delete from Cart</button>
    </div>
  );
};

export default CartProduct;
