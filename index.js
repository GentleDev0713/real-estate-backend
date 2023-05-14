const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const router = require("./routes");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");

const app = express();

mongoose.set("strictQuery", false);

const PORT = process.env.PORT || 3003;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1/buyhomeforless";

// middleware
const corsOptions = {
  origin: "https://real-estate-frontend-uevy.onrender.com", // frontend URI (ReactJS)
  // origin: "http://localhot:3000",
};
app.use(express.json());
app.use(cors(corsOptions));

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(
  cookieSession({
    name: "session",
    keys: ["buyhomeforless"],
  })
);

app.use(express.static(__dirname));

app.use("/", router);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://real-estate-frontend-uevy.onrender.com",
  },
});

io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);

    socket.on("new message", (newMessageRecieved) => {
      var chat = newMessageRecieved.chat;
      if (!chat.users) return console.log("chat.users is not define");

      chat.users.forEach((user) => {
        if (user._id == newMessageRecieved.sender._id) return;

        socket.in(user._id).emit("message recieved", newMessageRecieved);
      });
    });
  });
});
