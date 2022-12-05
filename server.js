const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`your app is running under ${port}🍷🍷🍷.....!!`);
});

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  // .connect(process.env.DATABASE_LOCAL, {
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(con => {
    console.log("The Connections is Successfull");
  });

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A Content Must Always Have a Name"]
  },
  description: {
    type: String,
    required: [true, "A Content Must Always Have a Name"]
  },
  location: {
    type: String,
    required: [true, "A Content Must Always Have a Name"]
  }
});
const Content = new mongoose.model("Content", contentSchema);

const testContent = new Content({
  title: "The Real Forest Hiker Akilan Selvam",
  description: "lorem50",
  location: "Pondicherry, India"
});

testContent
  .save()
  .then(doc => {
    console.log(doc);
  })
  .catch(err => {
    console.log(err);
  });
