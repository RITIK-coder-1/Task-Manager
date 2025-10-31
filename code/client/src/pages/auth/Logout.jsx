import React from "react";
import { Button } from "../../components/index.components";
import { logout } from "../../features/userSlice.js";
import { useDispatch, useSelector } from "react-redux";

function Logout() {
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);
  const dispatch = useDispatch();
  const conditionalMessage = () => {
    if (status === "pending") {
      return <span>Working...</span>;
    } else if (status === "succeeded") {
      return <span>Successfully logged out!</span>;
    } else if (status === "failed") {
      return <span>{error}</span>;
    }
  };
  return (
    <>
      <Button
        content={"Log out"}
        onClick={() => {
          dispatch(logout());
        }}
      />
      {conditionalMessage()}
    </>
  );
}

export default Logout;
