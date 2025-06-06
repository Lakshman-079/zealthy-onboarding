require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model("User", new mongoose.Schema({
  email: String,
  password: String,
  about: String,
  birthdate: String,
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  step: Number,
}));


let adminConfig = {
  page2: ["about", "birthdate"],
  page3: ["address"],
};

app.get("/admin/config", (_, res) => {
  res.json(adminConfig);
});

app.post("/admin/config", (req, res) => {
  adminConfig = req.body;
  res.sendStatus(200);
});

app.post("/users", async (req, res) => {
  try {
    const newUser = await User.create({ ...req.body, step: 1 });
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to create user", details: err });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to update user", details: err });
  }
});

app.get("/users", async (_, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users", details: err });
  }
});

app.get("/data", async (_, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users", details: err });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
