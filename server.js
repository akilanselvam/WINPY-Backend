const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const mongoose = require("mongoose");

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`your app is running under ${port}🍷🍷🍷.....!!`);
});

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Top 120 Things to do in Pondicherry"]
  },
  description: {
    type: String,
    required: [true, "Top 120 Things to do in Pondicherry"]
  },
  location: {
    type: String,
    required: [true, "Top 120 Things to do in Pondicherry"]
  }
});
const Content = new mongoose.model("Content", contentSchema);

const testContent = new Content({
  title: "Top 130 Things to do in Pondicherry",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  location: "Pondicherry, Indian"
});

testContent
  .save()
  .then(doc => {
    console.log(doc);
  })
  .catch(err => {
    console.log(err);
  });
