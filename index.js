const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Chat = require("./models/chat.js")
const methodOverride = require('method-override');

// ------- Setting path for views dir -------
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "views")
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// ------ Establishing Connection ------
main()
.then(res => {console.log(res);})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsApp');
}

const port = 8080;
// -------- Listening on port ------
app.listen(port, (req, res) => {
    console.log(`Server is listening on port ${port}...`);
});

app.get("/", (req, res) => {
    res.send("Server is running...")
});

// -------- Index Route ---------
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  // console.log(chats);
  res.render("index.ejs", { chats });
});

app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

// -------- New Route -------
app.post("/chats", (req, res) => {
  let { from, message, to} = req.body;
  let newChat = new Chat ({
    from: from,
    message: message,
    to: to,
    created_at: new Date(),
  });

  newChat.save()
  .then((res) => {
    console.log("Data saved..."); })
  .catch((err) => {
    console.log(err); })

    res.redirect("/chats");
});

//Edit Route....
app.get("/chats/:id/edit", async (req, res) => {
  let {id} = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

//Update route
app.put(("/chats/:id"), async (req, res) => {
  let {id} = req.params;
  let { message: newMsg } = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    {message: newMsg},
    {new: true, runValidators: true},
  );
  console.log(updatedChat);
  res.redirect("/chats");
});

app.delete("/chats/:id", async (req, res) => {
  let {id} = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  res.redirect("/chats");
})

// Chat.findByIdAndDelete({_id: '660a9ccb3ca3baff39124338'})
// .then((res) => {console.log(res);})
// .catch((err) => {console.log(err);});

