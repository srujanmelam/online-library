import axios from "axios";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import store from "./store";
import CartProduct from "./CartProduct";
import { actionTypes } from "./reducers/CartReducer";

function Cart({cart,user}) {

  const history = useNavigate();

  const placeOrder= ()=>{

    cart.forEach(item => {
      const order ={
        "date" : new Date().toUTCString(),
        "username": user,
        "bookId" : item.id
      }
      axios.post(`http://localhost:3000/orders`,order).then((res)=>{
        console.log("book"+item.id+" added to orders table");
      }).catch((err)=>{
        console.log(err);
      });
    });
    store.dispatch({type: actionTypes.RESET_CART});
    console.log("Cart Reset");
    history("/orders");
  }

  return(
    <div>
        <Link to="/home">Home</Link>
        <h4>Cart</h4>
        {cart.map((item,id)=>{
            return (<CartProduct item={item} key={id}/>);
          })
        }
        <button onClick={placeOrder}>CheckOut</button>
    </div>
  );

}

const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer.cart,
    user: state.loginReducer.user.username
  };
};

export default connect(mapStateToProps)(Cart);
