const router = require("express").Router();
const SubmitListing = require("../Modelss/SubmitListings");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    if (file.fieldname === "thumbnail") {
      // if uploading thumbnail
      callBack(null, "./uploads/thumbnail");
    } else if (file.fieldname === "picture") {
      // else uploading picture
      callBack(null, "./uploads/picture");
    }
  },
  filename: (req, file, callBack) => {
    if (!req.body.picture) req.body.picture = [];
    const fileName = Date.now() + file.originalname;
    if (file.fieldname === "thumbnail") {
      req.body.thumbnail = "uploads/thumbnail/" + fileName;
    } else {
      req.body.picture.push("uploads/picture/" + fileName);
    }
    callBack(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/submit",
  upload.fields([{ name: "thumbnail" }, { name: "picture" }]),
  async (req, res) => {
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
      region,
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
      category,
      authorId,
    } = req.body;
    const newListing = new SubmitListing({
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
      Gallery: {
        file: thumbnail,
        picture: picture,
      },
      Location: {
        latitude: lat,
        longitude: long,
        address: address,
        region: region,
      },
      Features: features ? features.split(",") : [],
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
      },
      category: category,
      Author: authorId,
    });
    try {
      newListing.save().then((response) => {
        res.status(200).json({
          Msg: `Data Saved Sucessfully`,
          success: true,
          result: response,
        });
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.get("/submit", async (req, res) => {
  try {
    SubmitListing.find({})
      .populate(["Author", "Features"])
      .then((response) => {
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

router.get("/lastsubmit", async (req, res) => {
  try {
    SubmitListing.find({})
      .sort({ createdAt: -1 })
      .limit(4)
      .populate(["Author", "Features"])
      .then((response) => {
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

router.get("/get-properties", async (req, res) => {
  try {
    SubmitListing.find({})
      .populate(["Author"])
      .then((response) => {
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

router.delete("/submit/(:id)", (req, res) => {
  SubmitListing.findByIdAndRemove(req.params.id, (err) => {
    if (!err) {
      SubmitListing.find({}).then((response) => {
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

router.get("/submit/:id", (req, res) => {
  try {
    SubmitListing.findById(req.params.id)
      .populate(["Author"])
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

module.exports = router;
