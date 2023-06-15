const express = require("express");
const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const { engine } = require("express-handlebars");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");

const app = express();
const port = 8080;

// set view engine
app.engine(".hbs", engine({ extname: ".hbs", helpers: {} }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// parser data (cookie, body, etc...)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
//cors
app.use(
  cors({
    origin: "*",
  })
);
// Register middleware session and passport
app.use(
  session({
    secret: "phamduykhoa-52100901",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes Init
const route = require("./routes/index.js");
route(app);

// Lỗi 404
app.use(function (req, res, next) {
  next(createError(404, "Page not found"));
});

// 500 server
app.use(function (err, req, res, next) {
  // res.locals.message = err.message;
  // res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("500");
});

app.listen(port, () =>
  console.log(
    `\nExample app listening at http://localhost:${port} !\n`
  )
);
