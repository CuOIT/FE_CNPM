import * as Types from "../constants";
const initialState = {};
if (localStorage.getItem("user") !== null) {
  initialState = JSON.parse(localStorage.getItem("user"));
}

export const AuthReducer = (state = initialState, action) => {
  console.log(initialState);
  switch (action.type) {
    case Types.LOG_IN: {
      let cloneState = JSON.parse(JSON.stringify(state));
      cloneState = action.payload;
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("user", JSON.stringify(action.payload));
      return cloneState;
    }
    case Types.ADD_TO_CART: {
      let cloneState = JSON.parse(JSON.stringify(state));
      const listCart = cloneState.cart;

      const idOfProduct = action.payload.id;
      const indexItemNeedUpdate = listCart.findIndex(
        (i) => i.id === idOfProduct
      );
      if (indexItemNeedUpdate !== -1) {
        listCart[indexItemNeedUpdate].amount += 1;
      } else {
        listCart.push(action.payload);
      }
      return cloneState;
    }

    case Types.UPDATE_ITEM_CART: {
      let cloneState = JSON.parse(JSON.stringify(state));
      const idOfProduct = action.payload.id;
      const listCart = cloneState.cart;
      const indexItemNeedUpdate = listCart.findIndex(
        (i) => i.id === idOfProduct
      );
      listCart[indexItemNeedUpdate] = action.payload;

      return cloneState;
    }

    case Types.DELETE_ITEM_CART: {
      let cloneState = JSON.parse(JSON.stringify(state));
      const idOfProduct = action.payload;
      console.log(idOfProduct);
      if (cloneState.cart.length > 0) {
        let listCart = cloneState.cart.filter((i) => i.id !== idOfProduct);
        cloneState.cart = listCart;
      }
      console.log(cloneState.cart);
      return cloneState;
    }

    case Types.LOG_OUT: {
      localStorage.clear();
      state = {};
      return state;
    }
    default:
      return state;
  }
};
