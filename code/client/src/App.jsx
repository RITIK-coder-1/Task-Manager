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
  TaskDetails,
} from "./pages/index.pages";
import { CreateTaskModal } from "./components/index.components.js";

function App() {
  return (
    <>
      <Login />
      <hr />
      <TaskDetails />
    </>
  );
}

export default App;
