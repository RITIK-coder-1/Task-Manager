function asyncHandler(func) {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      res.status(error.code || 500).json({
        sucess: false,
        message: error.message,
      });
    }
  };
}

export default asyncHandler;
