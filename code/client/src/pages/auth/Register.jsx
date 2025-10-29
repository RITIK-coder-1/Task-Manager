import React, { useEffect, useState } from "react";
import { Input, AuthCard, Button } from "../../components/index.components.js";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../features/userSlice.js";
function Register() {
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault(); // prevent page re-load
    const payload = new FormData();
    const fullNameString = JSON.stringify({
      firstName: firstName,
      lastName: lastName,
    });
    payload.append("fullNameString", fullNameString);
    payload.append("email", email);
    payload.append("password", password);
    payload.append("username", username);

    dispatch(register(payload));
  };

  return (
    <AuthCard onSubmit={handleOnSubmit}>
      <div className="flex gap-2">
        <label>Enter Your Full Name: </label>
        <Input
          placeholder={"Enter first name"}
          name={"firstName"}
          onChange={(e) => {
            const value = e.target.value;
            setFirstName(value);
          }}
        />
        <Input
          placeholder={"Enter last name"}
          name={"lastName"}
          onChange={(e) => {
            const value = e.target.value;
            setLastName(value);
          }}
        />
      </div>
      <div className="flex gap-2">
        <label>Enter a username: </label>
        <Input
          placeholder={"Minimum 3 characters"}
          name={"username"}
          onChange={(e) => {
            const value = e.target.value;
            setUsername(value);
          }}
        />
      </div>
      <div className="flex gap-2">
        <label>Enter Your Email: </label>
        <Input
          placeholder={"example@gmail.com"}
          name={"email"}
          onChange={(e) => {
            const value = e.target.value;
            setEmail(value);
          }}
        />
      </div>
      <div className="flex gap-2">
        <label>Enter Your password: </label>
        <Input
          placeholder={"it should be at least of 10 characters."}
          name={"password"}
          onChange={(e) => {
            const value = e.target.value;
            setPassword(value);
          }}
        />
      </div>
      {/* <div className="flex gap-2">
        <label>Choose an image for your profile (optional): </label>
        <input
          type="file"
          className="outline-1 cursor-pointer"
          name={"profilePicturePath"}
          // onChange={(e) => {
          //   const value = e.target.value;
          //   setFirstName(value);
          // }}
        ></input>
      </div> */}
      <Button content={"Register"} type={"submit"} />
    </AuthCard>
  );
}

export default Register;
