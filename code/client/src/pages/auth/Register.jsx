import React, { useState } from "react";
import { Input, AuthCard, Button } from "../../components/index.components.js";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../features/userSlice.js";

// UI IN DEVELOPMENT

function Register() {
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);

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

    if (profile && profile instanceof File) {
      payload.append("profilePic", profile);
    }

    dispatch(register(payload));
  };

  const renderStatusMessage = () => {
    if (status === "pending") {
      return <span>Checking...</span>;
    } else if (status === "succeeded") {
      return <span>User is successfully registered!</span>;
    } else if (status === "failed") {
      return <span>{error}</span>;
    }
    // Handle the default/idle state
    return null;
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
      <div className="flex gap-2">
        <label>Choose an image for your profile (optional): </label>
        <input
          type="file"
          className="outline-1 cursor-pointer"
          name="profilePic"
          onChange={(e) => {
            setProfile(e.target.files[0]);
          }}
        />
      </div>
      <Button content={"Register"} type={"submit"} />
      {renderStatusMessage()}
    </AuthCard>
  );
}

export default Register;
