import React, { useEffect, useState } from "react";
import { Button } from "../../components/index.components";
import { useDispatch, useSelector } from "react-redux";
import { get, profileUpdate } from "../../features/userSlice.js";

function UpdatePic() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get());
  }, []);

  const user = useSelector((state) => state.users.user?.message);

  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);
  const [profile, setProfile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    const payload = new FormData();
    payload.append("profilePic", profile);
    console.log(profile);

    dispatch(profileUpdate(payload));
  };
  const conditionalMessage = () => {
    if (status === "pending") {
      return <span>Checking...</span>;
    } else if (status === "succeeded") {
      return <span>Your profile pic has been updated!</span>;
    } else if (status === "failed") {
      return <span>{error}</span>;
    }
  };
  return (
    <>
      <span>Your current profile pic: </span>
      <img src={user?.profilePic} className="w-36 h-36 rounded-full" />
      <label>Choose a new pic: </label>
      <input
        type="file"
        className="border border-solid border-black cursor-pointer block"
        name="profilePic"
        onChange={(e) => {
          setProfile(e.target.files[0]);
        }}
      />
      <Button content={"Update"} onClick={handleSubmit} />
      {conditionalMessage()}
    </>
  );
}

export default UpdatePic;
