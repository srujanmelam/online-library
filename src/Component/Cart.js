import axios from "axios";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import store from "./store";
import CartProduct from "./CartProduct";
import { actionTypes } from "./reducers/CartReducer";
import NavBar from "./NavBar";
import { ShoppingCartRounded } from "@material-ui/icons";
import { Typography, Button } from "@material-ui/core";

function Cart({ cart, user }) {
  const history = useNavigate();

  const placeOrder = () => {
    cart.forEach((item) => {
      let order = {
        date: new Date().toUTCString(),
        username: user,
        bookId: item.id,
        return: false,
      };
      axios
        .post(`http://localhost:3000/orders`, order)
        .then((res) => {
          console.log("book" + item.id + " added to orders table");
        })
        .catch((err) => {
          console.log(err);
        });
    });
    setTimeout(() => {
      store.dispatch({ type: actionTypes.RESET_CART });
      console.log("Cart Reset");
      history("/orders");
    }, 1000);
  };

  return (
    <div>
      <NavBar />
      <div style={{ marginTop: 30 }}></div>
      <Typography variant="h3">
        <ShoppingCartRounded fontSize="large" />
        &nbsp; Cart
      </Typography>
      &nbsp;
      {cart.length === 0 ? (
        <Typography variant="h5">Cart is empty</Typography>
      ) : (
        cart.map((item, id) => {
          return <CartProduct item={item} key={id} />;
        })
      )}
      <div style={{ marginTop: 30 }}></div>
      <Button color="secondary" variant="contained" onClick={placeOrder}>
        Check Out
      </Button>
      <div style={{ marginTop: 30 }}></div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer.cart,
    user: state.loginReducer.user.username,
  };
};

export default connect(mapStateToProps)(Cart);
