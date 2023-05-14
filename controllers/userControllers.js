const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const Auth = require("../Modelss/userModel");
var CryptoJS = require("crypto-js");
// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: "./uploads/users",
//   filename: (req, file, callBack) => {
//     const fileName = Date.now() + file.originalname;
//     req.body.pic = "./uploads/users/" + fileName;

//     callBack(null, fileName);
//   },
// });

// const upload = multer({ storage: storage });

const registerUser = asyncHandler(
  // upload.fields({ name: "profile" }),
  async (req, res) => {
    console.log(req.body, req.file);
    const { name, email, password, pic, user } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        Msg: "Please Fil Out All Fields",
      });
    }

    const userExists = await Auth.findOne({ email });

    if (userExists) {
      res.status(400).json({
        Msg: "This User Is Already Exits",
      });
    }

    const newAuth = await Auth.create({
      name,
      email,
      // password: password,
      password: CryptoJS.AES.encrypt(password, "secret key 123").toString(),
      pic,
      user,
    });
    if (newAuth) {
      res.status(201).json({
        _id: newAuth._id,
        name: newAuth.name,
        password: newAuth.password,
        email: newAuth.email,
        pic: newAuth.pic,
        user: newAuth.user,
        isAdmin: newAuth.isAdmin,
        token: generateToken(newAuth._id),
        Msg: "register",
      });
    } else {
      res.status(400);
      throw new Error("Failed to Create User");
    }
  }
);

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Auth.findOne({ email });
  if (user) {
    const bytes = CryptoJS.AES.decrypt(user.password, "secret key 123");
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    if (originalPassword == password) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        user: user.user,
        Msg: "login",
      });
    } else {
      res.status(400).json({
        Msg: "Wrong Password",
      });
    }
  } else {
    res.status(401).json({
      Msg: "Email not found",
    });
  }
});

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await await Auth.find(keyword).find({
    _id: { $ne: req.user._id },
  });
  res.send(users);
});
module.exports = { registerUser, authUser, allUsers };

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const asyncHandler = require("express-async-handler");
// const generateToken = require("../config/generateToken");
// const User = require("../Modelss/userModel");

// const registerUser = asyncHandler(async (req, res) => {
//   const { name, email, password, pic } = req.body;

//   if (!name || !email || !password) {
//     res.status(400);
//     throw new Error("Please Enter All The Fields");
//   }

//   const userExists = await User.findOne({ email });

//   if (userExists) {
//     res.status(400);
//     throw new Error("User Alredy Exists");
//   }

//   const user = await User.create({
//     name,
//     email,
//     password,
//     pic,
//   });
//   if (user) {
//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       pic: user.pic,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(400);
//     throw new Error("Failed to Create User");
//   }
// });

// const authUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });

//   if (user && (await user.matchPassword(password))) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       pic: user.pic,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(400);
//     throw new Error("Failed to Login");
//   }
// });

// const allUsers = asyncHandler(async (req, res) => {
//   const keyword = req.query.search
//     ? {
//         $or: [
//           { name: { $regex: req.query.search, $options: "i" } },
//           { email: { $regex: req.query.search, $options: "i" } },
//         ],
//       }
//     : {};

//   const users = await await User.find(keyword).find({
//     _id: { $ne: req.user._id },
//   });
//   res.send(users);
// });
// module.exports = { registerUser, authUser, allUsers };
