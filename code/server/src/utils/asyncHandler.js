// ----------------------------------------------
// asyncHandler.js
// This is a function that handles the error of all the asynchronous functions in the codebase.
// ----------------------------------------------

function asyncHandler(func) {
  return async (req, res, next) => {
    // we can't input asynchrounous functions as arguments, so we have to create one here
    try {
      await func(req, res, next);
    } catch (error) {
      next(error); // we parse the error to the global error handler
    }
  };
}

export default asyncHandler;
