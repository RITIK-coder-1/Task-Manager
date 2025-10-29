import React from "react";
import { Input, AuthCard, Button } from "../../components/index.components.js";
function Register() {
  return (
    <AuthCard>
      <div className="flex gap-2">
        <label>Enter Your Full Name: </label>
        <Input placeholder={"Enter first name"} />
        <Input placeholder={"Enter last name"} />
      </div>
      <div className="flex gap-2">
        <label>Enter Your Email: </label>
        <Input placeholder={"example@gmail.com"} />
      </div>
      <div className="flex gap-2">
        <label>Enter Your password: </label>
        <Input placeholder={"it should be at least of 10 characters."} />
      </div>
      <div className="flex gap-2">
        <label>Choose an image for your profile (optional): </label>
        <input type="file" className="outline-1 cursor-pointer"></input>
      </div>
      <Button content={"Register"} />
    </AuthCard>
  );
}

export default Register;
