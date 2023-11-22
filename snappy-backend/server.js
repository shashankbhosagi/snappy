require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const Image = require("./models/Image");
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");

app.use(cors());

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

mongoose
  .connect(
    "mongodb+srv://shashankbhosagi:" +
      process.env.PASSWORD +
      "@cluster0.nsdaksw.mongodb.net/?retryWrites=true&w=majority",
    {}
  )
  .then((x) => {
    app.listen(PORT, () => {
      console.log("App is up and running on port -> " + PORT);
    });
    console.log("Connected to mongoDB");
  })
  .catch((err) => {
    console.log("Error while connecting to database");
    console.log(err);
  });

app.post("/upload", upload.single("image"), async (req, res) => {
  console.log(req);
  try {
    const newImage = new Image({
      filename: req.file.filename,
      contentType: req.file.mimetype,
      destination: req.file.path,
    });

    await newImage.save();
    res.send("Image uploaded successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/", async (req, res) => {
  const images = await Image.find();
  res.json(images);
});
