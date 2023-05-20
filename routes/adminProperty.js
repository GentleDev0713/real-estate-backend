const express = require("express");
const Property = require("../Modelss/SubmitListings");
const router = express.Router();

router.get("/get-properties", (req, res) => {
  try {
    Property.find({}).then((response) => {
      res.status(200).json({
        success: true,
        result: response,
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// router.post("/category/create", async (req, res) => {
//   const category = await new Category(req.body);
//   try {
//     category.save().then((response) => {
//       res.json({
//         Msg: `Category Saved Sucessfully`,
//         success: true,
//         result: response,
//       });
//     });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

router.get("/property/:id", (req, res) => {
  try {
    Property.findById(req.params.id)
      .populate(["Author", "Features", "Details.near"])
      .then((response) => {
        res.status(200).json({
          success: true,
          result: response,
        });
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/property/:id/update", (req, res) => {
  const {
    description,
    name,
    status,
    price,
    period,
    type,
    currency,
    space,
    land,
    video,
    thumbnail,
    picture,
    lat,
    long,
    address,
    country,
    city,
    provice,
    zipcode,
    features,
    id,
    beds,
    bathrooms,
    condition,
    built,
    neighbor,
    living,
    dining,
    story,
    parking,
    lotsize,
    view,
    near,
    category,
    author,
  } = req.body;
  const listing = {
    BasicInformation: {
      description: description,
      name: name,
      status: status,
      price: price,
      currency: currency,
      period: period,
      type: type,
      space: space,
      land: land,
      video: video,
    },
    Location: {
      latitude: lat,
      longitude: long,
      address: address,
      county: country,
      city: city,
      provice: provice,
      zipcode: zipcode,
    },
    // Features: features,
    Details: {
      id: id,
      beds: beds,
      bathrooms: bathrooms,
      condition: condition,
      built: built,
      neighbor: neighbor,
      living: living,
      dining: dining,
      story: story,
      parking: parking,
      lotsize: lotsize,
      view: view,
      near: near ? near : [],
    },
    category: category,
    Author: author,
  };
  try {
    Property.findByIdAndUpdate(req.params.id, listing).then((response) => {
      res.status(200).json({
        success: true,
        result: response,
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/delete/property/:id", (req, res) => {
  Property.findByIdAndDelete(req.params.id, (err) => {
    if (!err) {
      Property.find({}).then((response) => {
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
