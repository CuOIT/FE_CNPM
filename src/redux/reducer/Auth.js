import * as Types from "../constants";
const initialState = JSON.parse(localStorage.getItem("user"));
export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOG_IN: {
      let cloneState = JSON.parse(JSON.stringify(state));
      cloneState = action.payload;
      cloneState.cart = [];
      localStorage.setItem("user", JSON.stringify(cloneState));
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
        listCart.push({ ...action.payload, amount: 1 });
      }
      console.log(cloneState);
      localStorage.setItem("user", JSON.stringify(cloneState));
      console.log(JSON.parse(localStorage.getItem("user")));
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
      localStorage.setItem("user", JSON.stringify(cloneState));
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
      localStorage.setItem("user", JSON.stringify(cloneState));
      return cloneState;
    }

    case Types.ORDER: {
      console.log("HI");
      let cloneState = JSON.parse(JSON.stringify(state));
      cloneState.cart = [];
      localStorage.setItem("user", JSON.stringify(cloneState));
      console.log(cloneState);
      return cloneState;
    }
    case Types.LOG_OUT: {
      console.log("LOGOUT");
      localStorage.clear();
      state = {};
      return state;
    }
    default:
      return state;
  }
};
