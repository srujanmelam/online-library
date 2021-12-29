const initialState = {
  cart: [],
};

export const actionTypes = {
  ADD_TO_CART: "ADD_TO_CART",
  DELETE_FROM_CART: "DELETE_FROM_CART",
}

const CartReducer = (state = initialState, action) => {

  switch (action.type) {

    case actionTypes.ADD_TO_CART:
      const isPre = state.cart.find((i) => i.id === action.payload.item.id);
      return {
        ...state,
        cart:
          isPre !== undefined? 
            [...state.cart]
          : [...state.cart, { ...action.payload.item }],
      };

    case actionTypes.DELETE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((i) => i.id !== action.payload.item.id)
      }

    default:
      return state;
  }
}

export default CartReducer;