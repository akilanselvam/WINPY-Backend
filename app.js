const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const app = express();
const userRouters = express.Router();
const contentRouters = express.Router();
app.use(express.json());

app.use(morgan("dev"));
const port = 3000;
app.listen(port, () => {
  console.log(`your app is running under ${port}🍷🍷🍷.....!!`);
});
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Your server request is working fine",
    status: "success"
  });
});

const Content = JSON.parse(
  fs.readFileSync(`${__dirname}/Dev-Data/Content.json`)
);

const getallContent = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAT: req.requesttime,
    results: Content.length,
    data: {
      Content
    }
  });
};

const createContent = (req, res) => {
  console.log(Content.length);
  //   console.log(req.body);
  const newId = Content[Content.length - 1].id + 1;
  const newContent = Object.assign({ id: newId }, req.body);
  Content.push(newContent);
  fs.writeFile(
    `${__dirname}/Dev-Data/Content.json`,
    JSON.stringify(Content),
    err => {
      res.status(201).json({
        status: "success",
        data: {
          Content: newContent
        }
      });
    }
  );
};
const getSingleContent = (req, res) => {
  const id = req.params.id * 1;
  console.log(req.params);
  if (id > Content.length) {
    res.status(404).json({
      status: "failure",
      message: "Invalid Response"
    });
  }
  const Contents = Content.find(el => el.id == id);
  res.status(200).json({
    status: "success",
    data: {
      Contents
    }
  });
};
const updateContent = (req, res) => {
  const id = req.params.id * 1;
  if (id > Content.length) {
    return res.status(404).json({
      status: "failed to load",
      message: "Failed to load the requested ID"
    });
  }
  res.status(200).json({
    status: "Success",
    data: {
      tour: "<updated text will be here>"
    }
  });
};
const deleteContent = (req, res) => {
  const id = req.params.id * 1;
  if (id > Content.length) {
    return res.status(404).json({
      status: "failed to load",
      message: "Failed to load the requested ID"
    });
  }
  res.status(204).json({
    status: "Success",
    data: null
  });
};

const getAllUser = (req, res) => {
  res.status(500).json({
    status: "Error",
    message: "This Function is not implemented yet!😒"
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: "Error",
    message: "This Function is not implemented yet!😒"
  });
};

const getSingleUser = (req, res) => {
  res.status(500).json({
    status: "Error",
    message: "This Function is not implemented yet!😒"
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: "Error",
    message: "This Function is not implemented yet!😒"
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: "Error",
    message: "This Function is not implemented yet!😒"
  });
};

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

contentRouters.route("/").get(getallContent).post(createContent);
contentRouters
  .route("/:id")
  .get(getSingleContent)
  .patch(updateContent)
  .delete(deleteContent);

userRouters.route("/").get(getAllUser).post(createUser);
userRouters
  .route("/:id")
  .get(getSingleUser)
  .patch(updateUser)
  .delete(deleteUser);
