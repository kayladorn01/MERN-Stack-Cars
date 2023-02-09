let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let favicon = require("serve-favicon");
let cors = require("cors");
const PORT = 8080;
let bodyParser = require("body-parser");

const mongoose = require("mongoose");

let app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(favicon(path.join(__dirname, "public", "favicon.ico.webp")));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// app.use("/", Router);

let cars = require("./controllers/cars.controller.js");
app.get("/show", cars.findAll);
app.post("/add", cars.create);
app.delete("/remove", cars.deleteCarsByOwner);
app.get("/update", cars.updateByOwner);

require("./routes/new.js")(app);
require("./routes/delete.js")(app);
require("./routes/index.js")(app);
require("./routes/update.js")(app);

const uri =
    "mongodb+srv://admin:admin@my-first-cluster.0kmflhp.mongodb.net/?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
    res.status(err.status || 500);
    res.render("error");
});

mongoose.connection.on("error", function () {
    console.log("Connection to Mongo established.");
    console.log("Could not connect to the database. Exiting now...");
    process.exit();
});
mongoose.connection.once("open", function () {
    console.log("Successfully connected to the database");
});

app.listen(PORT, () => {
    console.log(`Listening on port http://localhost/${PORT}`);
});

module.exports = app;