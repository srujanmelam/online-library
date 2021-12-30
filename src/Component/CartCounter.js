import { connect } from "react-redux";
import { useEffect, useState } from "react";

function CartCounter({cart}) {
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    setCartCount(cart.length);
  }, [cart, cartCount]);

  return (
    <div>
      <p>Cart: {cartCount}</p>
    </div>
  );

}

const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer.cart,
  };
};

export default connect(mapStateToProps)(CartCounter);
