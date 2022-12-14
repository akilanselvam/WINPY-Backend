const express = require("express");
const morgan = require("morgan");
const app = express();
const userRouters = require("./Routes/UserRouter");
const contentRouters = require("./Routes/ContentRouter");

app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.static(`${__dirname}/public`));
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Your server request is working fine",
    status: "success"
  });
});

app.use((req, res, next) => {
  console.log("Hello from the Middleware😎");
  next();
});

app.use((req, res, next) => {
  req.requesttime = new Date().toISOString();
  next();
});

app.use("/api/v1/user", userRouters);
app.use("/api/v1/content", contentRouters);

module.exports = app;
