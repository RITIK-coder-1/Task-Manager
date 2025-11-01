/* ---------------------------------------------------------------------------
App.jsx
This is the root application that hosts all the app pages 
------------------------------------------------------------------------------ */

import "./styles/App.css";
import {
  Register,
  Login,
  Logout,
  Profile,
  UpdateDetails,
  UpdatePassword,
  UpdatePic,
  Dashboard,
} from "./pages/index.pages";
import { CreateTaskModal } from "./components/index.components.js";

function App() {
  return (
    <>
      <Login />
      <hr />
    </>
  );
}

export default App;
