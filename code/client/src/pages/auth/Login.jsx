import React, { useEffect, useState } from "react";
import { AuthCard, Input, Button } from "../../components/index.components.js";
import { login } from "../../features/userSlice.js";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const success = useSelector((state) => state.users?.user?.data);
  const status = useSelector((state) => state.users?.status);
  const error = useSelector((state) => state.users?.error);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reloads
    const userData = {
      credential: credential,
      password: password,
    };

    dispatch(login(userData));
  };

  const conditionalMessage = () => {
    if (status === "pending") {
      return <span>Checking...</span>;
    } else if (status === "succeeded") {
      return <span>{success}</span>;
    } else if (status === "failed") {
      return <span>{error}</span>;
    }
  };
  return (
    <AuthCard onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <label>Enter Your Username or Email: </label>
        <Input
          placeholder={"username/email"}
          name={"credential"}
          onChange={(e) => {
            setCredential(e.target.value);
          }}
        />
      </div>
      <div className="flex gap-2">
        <label>Enter Your password: </label>
        <Input
          placeholder={"it should be at least of 10 characters."}
          name={"password"}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <Button content={"Log in"} type={"submit"} />
      {conditionalMessage()}
    </AuthCard>
  );
}

export default Login;
