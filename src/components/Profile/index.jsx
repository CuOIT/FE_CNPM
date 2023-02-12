import React from "react";
import { useDataAuthRedux } from "../../redux/selector";

const ProfilePage = () => {
  const dataUserLocal = JSON.parse(localStorage.getItem("user"));

  return <>{JSON.stringify(dataUserLocal)}</>;
};
export default ProfilePage;
