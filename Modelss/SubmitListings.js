const mongoose = require("mongoose");

const SubmitSchema = new mongoose.Schema({
  BasicInformation: {
    description: { type: String },
    name: { type: String },
    status: { type: String },
    type: { type: String },
    price: { type: String },
    period: { type: String },
    space: { type: String },
    // land: { type: String },
    // building: { type: String },
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
  Features: {
    pet: { type: Boolean },
    furnished: { type: Boolean },
    cooling: { type: Boolean },
    parking: { type: Boolean },
    mail: { type: Boolean },
    city: { type: Boolean },
  },
  Details: {
    id: { type: String },
    beds: { type: String },
    bathrooms: { type: String },
    condition: { type: String },
    built: { type: String },
    neighbor: { type: String },
  },
  Author: {
    authorname: { type: String },
    email: { type: String },
    authorId: { type: String },
  },
});

module.exports =
  mongoose.models.SubmitListing ||
  mongoose.model("SubmitListing", SubmitSchema);
