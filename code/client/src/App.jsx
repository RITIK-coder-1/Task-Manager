/* ---------------------------------------------------------------------------
App.jsx
This is the root application that hosts all the app pages 
------------------------------------------------------------------------------ */

import { useEffect, useState } from "react";
import "./styles/App.css";
import { useSelector, useDispatch } from "react-redux";
import Register from "./pages/auth/Register";

function App() {
  return <Register />;
}

export default App;
