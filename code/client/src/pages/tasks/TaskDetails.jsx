import React, { useEffect } from "react";
import useConditionalRendering from "../../hooks/useConditionalRendering";
import { useDispatch, useSelector } from "react-redux";
import { get as getTask } from "../../features/taskSlice";
import { get as getUser } from "../../features/userSlice";

// SCRIPT NOT FINISHED!!!!!

function TaskDetails() {
  const { success, status, error, user } = useConditionalRendering();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const userData = user?.message?.user;

  useEffect(() => {
    dispatch(getTask());
  }, []);

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
    <>
      <h1>hey</h1>
      {conditionalMessage()}
    </>
  );
}

export default TaskDetails;
