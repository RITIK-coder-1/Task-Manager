import React, { useEffect, useState } from "react";
import { AuthCard, Input, Button } from "../../components/index.components";
import { useDispatch, useSelector } from "react-redux";
import { userUpdate } from "../../features/userSlice.js";

function UpdateDetails() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users.user);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    if (user && user.fullName) {
      setFirstName(user.fullName.firstName || "");
      setLastName(user.fullName.lastName || "");
      setEmail(user.email || "");
      setUsername(user.username || "");
    }
  }, [user, status, dispatch]);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      fullName: {
        firstName: firstName ?? user?.fullName?.firstName,
        lastName: lastName ?? user?.fullName?.lastName,
      },
      email: email ?? user?.email,
      username: username ?? user?.username,
    };

    dispatch(userUpdate(updatedData));
  };

  if (!user && status === "pending") {
    return <AuthCard>Loading user data...</AuthCard>;
  }

  const conditionalMessage = () => {
    if (status === "pending") {
      return <span>Checking...</span>;
    } else if (status === "succeeded") {
      return <span>Your details have been updated!</span>;
    } else if (status === "failed") {
      return <span>{error}</span>;
    }
  };

  return (
    <>
      <AuthCard onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <label>Update Your Full Name: </label>
          <Input
            placeholder={"first name"}
            name={"firstName"}
            value={firstName ?? ""}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <Input
            placeholder={"last name"}
            name={"lastName"}
            value={lastName ?? ""}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>
        <div className="flex gap-2">
          <label>Update your username: </label>
          <Input
            placeholder={"Minimum 3 characters"}
            name={"username"}
            value={username ?? ""}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="flex gap-2">
          <label>Update Your Email: </label>
          <Input
            placeholder={"example@gmail.com"}
            name={"email"}
            value={email ?? ""}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <Button
          content={"Update"}
          type={"submit"}
          disabled={status === "pending"}
        />
      </AuthCard>
      {conditionalMessage()}
    </>
  );
}

export default UpdateDetails;
