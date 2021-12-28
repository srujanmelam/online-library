const initialState = {
  cart: [],
};

export const actionTypes = {
  ADD_TO_CART: "ADD_TO_CART",
  DELETE_FROM_CART: "DELETE_FROM_CART",
  CHANGE_QUANTITY: "CHANGE_QUANTITY",
}

const CartReducer = (state = initialState, action) => {

  switch (action.type) {

    case actionTypes.ADD_TO_CART:
      const isPre = state.cart.find((i) => i.id === action.payload.item.id);
      return {
        ...state,
        cart: (isPre !== undefined) ?
          state.cart.map((elem) => elem.id === action.payload.item.id ? { ...action.payload.item, count: elem.count + 1 } : elem)
          : [...state.cart, { ...action.payload.item, count: 1 }]
      }

    case actionTypes.DELETE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((i) => i.id !== action.payload.item.id)
      }

    case actionTypes.CHANGE_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((elem) => action.payload.item.id === elem.id ? { ...action.payload.item } : elem)
      }

    default:
      return state;
  }
}

export default CartReducer;