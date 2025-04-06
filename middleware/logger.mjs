const logger = (req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    console.log(`${req.method} ${req.path} ${req.ip}`);
  } else {
    console.log(`${req.method} ${req.path}`);
  }
  next();
};

export default logger;
