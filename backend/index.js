const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

mongoose
  .connect("mongodb://127.0.0.1:27017/Note")
  .then(() => {
    console.log("Mongodb Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const uid = 0;
app.use(cors());

const userSchema = new Schema({
  username: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);
app.use(bodyParser.json());

//signup
app.post("/signup", async (req, res) => {
  let success = false;
  const { username, email, phone, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const user = new User({ username, phone, password, email });
    await user.save();
    success = true;
    const token = jwt.sign({ userId: user._id }, "token");
    res.json({ success });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
});

//login
app.post("/login", async (req, res) => {
  let success = false;
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      success = false;
      return res
        .status(400)
        .json({ error: "Please try to login with correct credentials" });
    }

    const passwordCompare = password === user.password;
    if (!passwordCompare) {
      success = false;
      return res.status(400).json({
        success,
        error: "Please try to login with correct credentials",
      });
    }

    // const data = {
    //   user: user.id,
    // };
    const data=user.id;
    const authtoken = jwt.sign(data, "secret");
    // console.log(data);
    success = true;
    res.json({ success, data });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//todo
const todoSchema = new Schema({
  title: { type: String, required: true },
  userID: { type: String, required: true },
});
const Todo = mongoose.model("Todo", todoSchema);

app.get("/showtodo", async (req, res) => {
  const userID = req.query.userID;
  try {
    const allBlogs = await Todo.find({ userID });
    res.send(allBlogs);
  } catch (error) {
    res.send({ msg: "Error1" });
  }
});

app.post("/create", async (req, res) => {
  const { title, userID } = req.body;
  try {
    const todo = new Todo({ title, userID });
    await todo.save();
    res.send({ msg: "Success" });
  } catch (error) {
    // console.log(title);
    console.error(error.message);
    res.send({ msg: "Error2" });
  }
});

app.delete("/delete", async (req, res) => {
  const todoID = req.query.id; // Extract the todoID from the URL parameter

  try {
    const deletedTodo = await Todo.findByIdAndDelete(todoID);
    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting todo" });
  }
});

//notes

const notesSchema = new Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  date: { type: String, required: true },
  userID: { type: String, required: true },
});
const Note = mongoose.model("notepad", notesSchema);

app.post("/createnote", async (req, res) => {
  const { title, desc, date, userID } = req.body;
  try {
    const note = new Note({ title, desc, date, userID });
    await note.save();
    res.send({ msg: "Success" });
  } catch (error) {
    console.error(error);
    res.send({ msg: "Error1" });
  }
});

// app.put("/update/:id", async (req, res) => {
//   const Id = req.params.id;
//   const payload = req.body;
//   console.log(Id);
//   // console.log(Id);
//   // console.log(Id);
//   // const userID = payload.userID;
//   // console.log(userID);
//   try {
//     let findnote = 0;
//     findnote = await Note.find({ _id: Id });
//     console.log(findnote);
//     if (findnote !== 0) {
//       await Note.findByIdAndUpdate({ _id:Id,payload})
//       console.log(payload);
//       res.send({ msg: "update" });
//     } else {
//       res.send({ msg: "You are not authorized" });
//     }
//   } catch (error) {
//     res.send({ msg: error });
//   }
// });

app.get("/shownote", async (req, res) => {
  const userID = req.query.userID;
  try {
    const allnote = await Note.find({ userID });
    res.send(allnote);
  } catch (error) {
    res.send({ msg: "Error1" });
  }
});

app.delete("/deletenote", async (req, res) => {
  const nid = req.query.id;
  try {
    const deletedTodo = await Note.findByIdAndDelete(nid);
    if (!deletedTodo) {
      console.log(nid);
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting todo" });
  }
});

app.listen(8090, () => {
  console.log("Server started at 8090");
});
