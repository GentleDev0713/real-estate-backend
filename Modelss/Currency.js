const mongoose = require("mongoose");

const CurrencySchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    symbol: {
      type: String,
      require: "true",
    },
    code: { type: String, require: true },
    created: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Currency = mongoose.model("currencies", CurrencySchema);

module.exports = Currency;
