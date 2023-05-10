const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
  {
    icon: {
      type: String,
      default: "company",
    },
    img: {
      type: String,
      default: "assets/img/categories/1.jpg",
    },
    name: { type: String, require: true },
    description: { type: String },
    created: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("categories", CategorySchema);

module.exports = Category;
