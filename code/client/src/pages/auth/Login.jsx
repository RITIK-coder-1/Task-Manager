import React from "react";
import { AuthCard, Input, Button } from "../../components/index.components.js";

function Login() {
  return (
    <AuthCard>
      <div className="flex gap-2">
        <label>Enter Your Username: </label>
        <Input placeholder={"Enter username"} name={"username"} />
      </div>
      <div className="flex gap-2">
        <label>Enter Your Email: </label>
        <Input placeholder={"example@gmail.com"} name={"email"} />
      </div>
      <div className="flex gap-2">
        <label>Enter Your password: </label>
        <Input
          placeholder={"it should be at least of 10 characters."}
          name={"password"}
        />
      </div>
      <Button content={"Log in"} type={"submit"} />
    </AuthCard>
  );
}

export default Login;
