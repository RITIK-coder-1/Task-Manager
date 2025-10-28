/* ---------------------------------------------------------------------------
App.jsx
This is the root application that hosts all the app pages 
------------------------------------------------------------------------------ */

import { useEffect, useState } from "react";
import "./styles/App.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "./features/testSlice";

function App() {
  const test = useSelector((state) => state.test.data);
  console.log(test);

  const dispatch = useDispatch();
  return (
    <>
      <button
        onClick={() => {
          dispatch(fetchData());
          console.log("a");
          console.log(test);
        }}
      >
        click
      </button>
      {test.map((ele) => {
        return <h1 key={ele.id}>{ele.name}</h1>;
      })}
    </>
  );
}

export default App;
