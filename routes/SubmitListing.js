// const router = require("express").Router();
// const SubmitListing = require("../models/SubmitListings");

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
      space,
      video,
      thumbnail,
      picture,
      pet,
      furnished,
      cooling,
      parking,
      mail,
      city,
      id,
      beds,
      bathrooms,
      condition,
      built,
      neighbor,
      lat,
      long,
      address,
      region,
      authorname,
      email,
      authorId,
    } = req.body;

    const newListing = new SubmitListing({
      BasicInformation: {
        description: description,
        name: name,
        status: status,
        price: price,
        period: period,
        type: type,
        space: space,
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
      Features: {
        pet: pet,
        furnished: furnished,
        cooling: cooling,
        parking: parking,
        mail: mail,
        city: city,
      },
      Details: {
        id: id,
        beds: beds,
        bathrooms: bathrooms,
        condition: condition,
        built: built,
        neighbor: neighbor,
      },
      Author: {
        authorname: authorname,
        email: email,
        authorId: authorId,
      },
    });
    try {
      newListing.save().then((response) => {
        res.status(200).json({
          Msg: `Data Uploaded Sucessfully`,
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
    SubmitListing.find({}).then((response) => {
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

module.exports = router;
