// const predictRoute = require("./main/predict.route");
// const newsRoute = require("./main/news.route");
// const historyRoute = require("./main/history.route");
const profileRoute = require("./main/profile.route");
const uploadRoute = require("./main/upload.route");
const homeRoute = require("./main/home.route");
const authRoute = require("./auth/auth.route");
const connect = require("../config/db/index");
const isAuthenticated = require("../app/middlewares/checkUser");

const router = (app) => {
  //connect Mongo
  connect.connect();

  app.use("/auth", authRoute);
  app.use(/^\/(home)?$/, homeRoute);


  //predict page
  // app.use("/predict",isAuthenticated, predictRoute);

  //upload page
  app.use("/upload",isAuthenticated, uploadRoute);

  // // news page
  // app.use("/news", newsRoute);

  // // history page
  // app.use("/history", historyRoute);

  // profile page
  app.use("/profile",isAuthenticated, profileRoute);
};

module.exports = router;
