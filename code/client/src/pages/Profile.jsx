import React, { useEffect, useState } from "react";
import { get } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user?.message);
  useEffect(() => {
    dispatch(get());
  }, []);

  const conditionalMessage = () => {
    if (user) {
      return (
        <div className="flex flex-col items-start justify-center gap-2">
          <img src={user?.profilePic} className="w-36 h-36 rounded-full" />
          <span>
            Your Name:{" "}
            {`${user?.fullName?.firstName} ${user?.fullName?.lastName}`}
          </span>
          <span>Your Username: {user?.username}</span>
          <span>Your Email: {user?.email}</span>
        </div>
      );
    } else {
      return <span>You're unauthorized!</span>;
    }
  };

  return <>{conditionalMessage()}</>;
}

export default Profile;
