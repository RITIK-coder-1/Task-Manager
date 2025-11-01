import React, { useEffect, useState } from "react";
import { AuthCard, Button, Input } from "../index.components";
import { useDispatch, useSelector } from "react-redux";
import { create } from "../../features/taskSlice.js";
import { get } from "../../features/userSlice.js";

function CreateTaskModal() {
  const dispath = useDispatch();

  useEffect(() => {
    dispath(get());
  }, []);

  const user = useSelector((state) => state.users.user?.message?.user);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [isCompleted, setIsCompleted] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [category, setCategory] = useState("unspecified");
  const status = useSelector((state) => state.tasks.status);
  const error = useSelector((state) => state.tasks.error);

  const handleSubmit = (e) => {
    e.preventDefault(); // for preventing page reload
    const payload = new FormData();
    payload.append("title", title);
    payload.append("description", description);
    payload.append("priority", priority);

    payload.append("isCompleted", isCompleted);

    payload.append("category", category);

    if (imagePath && imagePath instanceof File) {
      payload.append("image", imagePath);
    }

    const dataObject = {
      userId: user._id,
      taskData: payload,
    };

    dispath(create(dataObject));
  };

  const conditionalMessage = () => {
    if (status === "pending") {
      return <span>Checking...</span>;
    } else if (status === "succeeded") {
      return <span>Your task has been created!</span>;
    } else if (status === "failed") {
      return <span>{error}</span>;
    }
  };

  return (
    <>
      <AuthCard onSubmit={handleSubmit}>
        <label htmlFor="title">Enter the title of the task: (Required)</label>
        <Input
          name={"title"}
          id={"title"}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label htmlFor="description">Add any notes (optional): </label>
        <Input
          name={"description"}
          id={"description"}
          width="w-full"
          height="h-56"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <label htmlFor="priority">Select priority: (optional)</label>
        <select
          className="outline-1"
          id="priority"
          onChange={(e) => {
            setPriority(e.target.value);
          }}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Urgent</option>
        </select>
        <label htmlFor="category">Any category: (optional)</label>
        <Input
          name={"category"}
          id={"category"}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />
        <label htmlFor="isCompleted">Completion: (optional)</label>
        <input
          type="checkbox"
          name="isCompleted"
          id="isCompleted"
          onClick={() => {
            // these values will be converted to boolean in the create task controller in the server
            if (isCompleted === "") {
              setIsCompleted("true");
            } else if (isCompleted === "true") {
              setIsCompleted("");
            }
          }}
        />
        <label htmlFor="imagePath">You can add an image (optional)</label>
        <input
          type="file"
          name="imagePath"
          id="imagePath"
          className="outline"
          onChange={(e) => {
            setImagePath(e.target.files[0]);
          }}
        />
        <Button content={"Create"} />
      </AuthCard>
      {conditionalMessage()}
    </>
  );
}

export default CreateTaskModal;
