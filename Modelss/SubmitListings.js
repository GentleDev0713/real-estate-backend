const mongoose = require("mongoose");

const SubmitSchema = new mongoose.Schema(
  {
    BasicInformation: {
      description: { type: String },
      name: { type: String },
      status: { type: String },
      type: { type: String },
      price: { type: String },
      period: { type: String },
      space: { type: String },
      currency: { type: String },
      video: { type: String },
    },
    Gallery: {
      file: { type: String },
      picture: { type: Array },
    },
    Location: {
      latitude: { type: String },
      longitude: { type: String },
      address: { type: String },
      region: { type: String },
    },
    Features: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "features",
      },
    ],
    Details: {
      id: { type: String },
      beds: { type: Number },
      bathrooms: { type: Number },
      condition: { type: String },
      built: { type: String },
      neighbor: { type: String },
      living: { type: Boolean },
      dining: { type: Boolean },
      story: { type: Number },
      parking: { type: String },
    },
    category: { type: String },
    // buy: { type: Boolean },
    Author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.SubmitListing ||
  mongoose.model("SubmitListing", SubmitSchema);
