/* ---------------------------------------------------------------------------
App.jsx
This is the root application that hosts all the app pages 
------------------------------------------------------------------------------ */

import { useEffect, useState } from "react";
import "./styles/App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("/api/v1/test").then((data) => {
      setData(data.data);
    });
  }, []);

  return (
    <div>
      {data.map((ele) => {
        return (
          <>
            <h1>{ele.name}</h1>
            <p>{ele.description}</p>
            <span>Created By: {ele.createdBy}</span>
          </>
        );
      })}
    </div>
  );
}

export default App;
