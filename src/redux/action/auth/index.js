import { useDispatch } from "react-redux";
import * as Types from "../../constants";

export const updateUserDataRedux = (data) => {
  return {
    type: Types.LOGIN,
    payload: data,
  };
};

// export const logout = () => {
//   return () => {
//     dispatch({
//       type: Types.LOGOUT,
//     });
//   };
// };

export const addToCart = (item) => {
  return {
    type: Types.ADD_TO_CART,
    payload: item,
  };
};
export const deleteItemInCart = (id) => {
  return {
    type: Types.DELETE_ITEM_CART,
    payload: id,
  };
};
export const updateCartById = (item) => {
  return {
    type: Types.UPDATE_ITEM_CART,
    payload: item,
  };
};
