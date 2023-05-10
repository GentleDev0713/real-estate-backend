const express = require("express");
const Category = require("../Modelss/Category");
const router = express.Router();

router.get("/get-categories", (req, res) => {
  try {
    Category.find({}).then((response) => {
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

router.post("/category/create", async (req, res) => {
  const category = await new Category(req.body);
  try {
    category.save().then((response) => {
      res.json({
        Msg: `Category Saved Sucessfully`,
        success: true,
        result: response,
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/category/:id", (req, res) => {
  try {
    Category.findById(req.params.id).then((response) => {
      res.status(200).json({
        success: true,
        result: response,
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/category/:id/update", (req, res) => {
  try {
    Category.findByIdAndUpdate(req.params.id, req.body).then((response) => {
      res.status(200).json({
        success: true,
        result: response,
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/delete/category/:id", (req, res) => {
  Category.findByIdAndDelete(req.params.id, (err) => {
    if (!err) {
      Category.find({}).then((response) => {
        res.status(200).json({
          Msg: `${req.params.id} deleted Sucessfully`,
          success: true,
          result: response,
        });
      });
    } else {
      res.status(500).json(err);
    }
  });
});

module.exports = router;
