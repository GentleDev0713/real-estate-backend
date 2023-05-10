const mongoose = require("mongoose");

const FeatureSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    icon: {
      type: String,
      require: "true",
    },
    created: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Feature = mongoose.model("features", FeatureSchema);

module.exports = Feature;
