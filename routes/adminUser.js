const express = require("express");
const User = require("../Modelss/userModel");
var CryptoJS = require("crypto-js");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/get-users", (req, res) => {
  try {
    User.find({}).then((response) => {
      res.status(200).json({
        success: true,
        result: response,
      });
    });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

router.get("/user/:id", (req, res) => {
  try {
    User.findById(req.params.id).then((response) => {
      res.status(200).json({
        success: true,
        result: response,
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/user/:id/update", (req, res) => {
  req.body.password = CryptoJS.AES.encrypt(
    req.body.password,
    "secret key 123"
  ).toString();
  try {
    User.findByIdAndUpdate(req.params.id, req.body).then((response) => {
      res.status(200).json({
        success: true,
        result: response,
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/search=(:search)", async (req, res) => {
  const name = req.params.search;
  try {
    const user = await User.find({ name });
    res.json({
      user,
    });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});
router.delete("/delete/user/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id, (err) => {
    if (!err) {
      User.find({}).then((response) => {
        res.status(200).json({
          Msg: `${req.params.id} deleted Sucessfully`,
          success: true,
          result: response,
        });
      });
    } else {
      console.log("Failed to Delete user Details: " + err);
    }
  });
});

module.exports = router;
