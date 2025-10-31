import React from "react";
import { Button } from "../../components/index.components";
import { logout } from "../../features/userSlice.js";
import { useDispatch } from "react-redux";

function Logout() {
  const dispatch = useDispatch();
  return (
    <Button
      content={"Log out"}
      onClick={() => {
        dispatch(logout());
      }}
    />
  );
}

export default Logout;
