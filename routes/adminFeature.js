const express = require("express");
const Feature = require("../Modelss/Feature");
const router = express.Router();

router.get("/get-features", (req, res) => {
  try {
    Feature.find({}).then((response) => {
      res.status(200).json({
        success: true,
        result: response,
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/feature/create", async (req, res) => {
  const feature = await new Feature(req.body);
  try {
    feature.save().then((response) => {
      res.json({
        Msg: `Feature Saved Sucessfully`,
        success: true,
        result: response,
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/feature/:id", (req, res) => {
  try {
    Feature.findById(req.params.id).then((response) => {
      res.status(200).json({
        success: true,
        result: response,
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/feature/:id/update", (req, res) => {
  try {
    Feature.findByIdAndUpdate(req.params.id, req.body).then((response) => {
      res.status(200).json({
        success: true,
        result: response,
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/delete/feature/:id", (req, res) => {
  Feature.findByIdAndDelete(req.params.id, (err) => {
    if (!err) {
      Feature.find({}).then((response) => {
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
