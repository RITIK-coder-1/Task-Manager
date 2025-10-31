/* ---------------------------------------------------------------------------
App.jsx
This is the root application that hosts all the app pages 
------------------------------------------------------------------------------ */

import "./styles/App.css";
import { Register, Login, Logout, Profile } from "./pages/index.pages";

function App() {
  return (
    <>
      <Profile />;
      <Login />
      <Logout />
    </>
  );
}

export default App;
