import * as Types from "../constants";

const initialState = {};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOGIN: {
      let cloneState = JSON.parse(JSON.stringify(state));
      cloneState = action.payload;
      console.log(cloneState);
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("user", JSON.stringify(action.payload));
      return cloneState;
    }
    case Types.ADD_TO_CART: {
      let cloneState = JSON.parse(JSON.stringify(state));
      console.log(cloneState);  
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

    case Types.LOGOUT: {
      localStorage.clear();
      state = { data: { token: null } };
      return state;
    }
    default:
      return state;
  }
};
