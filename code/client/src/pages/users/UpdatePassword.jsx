import React, { useState } from "react";
import { AuthCard, Input, Button } from "../../components/index.components";
import { passwordUpdate } from "../../features/userSlice.js";
import { useDispatch, useSelector } from "react-redux";

function UpdatePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    const payload = {
      newPassword: newPassword,
      oldPassword: oldPassword,
    };
    dispatch(passwordUpdate(payload));
  };
  const conditionalMessage = () => {
    if (status === "pending") {
      return <span>Checking...</span>;
    } else if (status === "succeeded") {
      return <span>Your password have been updated!</span>;
    } else if (status === "failed") {
      return <span>{error}</span>;
    }
  };
  return (
    <>
      <AuthCard onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <label>Enter your old password: </label>
          <Input
            placeholder={"old password"}
            name={"oldPassword"}
            onChange={(e) => {
              setOldPassword(e.target.value);
            }}
          />
        </div>
        <div className="flex gap-2">
          <label>Enter your new password: </label>
          <Input
            placeholder={"Minimum 10 characters"}
            name={"newPassword"}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
        </div>
        <Button content={"Update"} type={"submit"} />
      </AuthCard>
      {conditionalMessage()}
    </>
  );
}

export default UpdatePassword;
