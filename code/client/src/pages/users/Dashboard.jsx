import React, { useEffect } from "react";
import { get as getTask } from "../../features/taskSlice.js";
import { get as getUser } from "../../features/userSlice.js";
import { useDispatch, useSelector } from "react-redux";

function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const user = useSelector((state) => state.users.user?.message?.user);
  const tasks = useSelector((state) => state.tasks.tasks?.message);

  useEffect(() => {
    dispatch(getTask(user?._id));
  }, []);

  const displayTasks = () => {
    return tasks?.map((ele) => {
      return (
        <div key={ele._id}>
          {<img src={ele.image} className="w-36 h-36 rounded-full" /> ??
            "No Image"}
          <h1>{ele.title}</h1>
          <p>{ele.description}</p>
        </div>
      );
    });
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">{displayTasks()}</div>
    </>
  );
}

export default Dashboard;
