import { useSelector } from "react-redux";

export const useDataAuthRedux = () => useSelector((state) => state.AuthReducer);
