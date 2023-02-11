import * as Types from "../constants";

const initialState = {};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOGIN: {
      let cloneState = JSON.parse(JSON.stringify(state));
      cloneState = action.payload;
      JSON.stringify(localStorage.setItem("idUser", action.payload.id));
      return cloneState;
    }
    case Types.ADD_TO_CART: {
      let cloneState = JSON.parse(JSON.stringify(state));
      //   cloneState = action.payload;
      return cloneState;
    }
    case Types.UPDATE_ITEM_CART: {
      let cloneState = JSON.parse(JSON.stringify(state));
      // cloneState = action.payload;
      return cloneState;
    }

    case Types.DELETE_ITEM_CART: {
      let cloneState = JSON.parse(JSON.stringify(state));
      // cloneState = action.payload;
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
