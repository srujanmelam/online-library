import { connect } from "react-redux";
import { Link } from "react-router-dom"
import CartProduct from "./CartProduct";

function Cart({cart}) {

  return(
    <div>
        <Link to="/home">Home</Link>
        <h4>Cart</h4>
        {cart.map((item,id)=>{
            return (<CartProduct item={item} key={id}/>);
          })
        }
        <button>CheckOut</button>
    </div>
  );

}

const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer.cart,
  };
};

export default connect(mapStateToProps)(Cart);
