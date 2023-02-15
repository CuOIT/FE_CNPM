import React from "react";
import { useDataAuthRedux } from "../../redux/selector";

const ProfilePage = () => {
  const dataUserRedux = useDataAuthRedux();
  return <>{JSON.stringify(dataUserRedux)}</>;
};
export default ProfilePage;
