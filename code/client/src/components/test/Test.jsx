/* ---------------------------------------------------------------------------
Test.jsx
This is a temporary test component to test the api req/res between the client and the server
------------------------------------------------------------------------------ */

import { useEffect, useState } from "react";
import axios from "axios";

function Test() {
  const [data, setData] = useState([]);
  useEffect(() => {
    // Api request via axios

    axios.get("/api/v1/test").then((data) => {
      setData(data.data);
    });

    // Api request via fetch

    // fetch("/api/v1/test")
    //   .then((data) => data.json())
    //   .then((data) => {
    //     setData(data);
    //   });
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

export default Test;
