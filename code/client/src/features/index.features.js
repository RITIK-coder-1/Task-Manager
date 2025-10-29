/* ---------------------------------------------------------------------------
index.features.js
This file exports all the redux slices from one single place
------------------------------------------------------------------------------ */

import taskReducer from "./taskSlice.js";
import userReducer from "./userSlice.js";

export { taskReducer, userReducer };
