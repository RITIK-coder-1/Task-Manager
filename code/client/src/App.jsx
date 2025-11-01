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
} from "./pages/index.pages";

function App() {
  return (
    <>
      <Login />
      <hr />
      <UpdatePic />
    </>
  );
}

export default App;
