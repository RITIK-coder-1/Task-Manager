/* ---------------------------------------------------------------------------
App.jsx
This is the root application that hosts all the app pages 
------------------------------------------------------------------------------ */

import "./styles/App.css";
import { Register, Login, Logout } from "./pages/index.pages";

function App() {
  return (
    <>
      <Register />
      <hr />
      <Login />
      <hr />
      <Logout />
    </>
  );
}

export default App;
