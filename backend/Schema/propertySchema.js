const mongoose = require("mongoose");
const User = require("./userSchema");

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    images: [{ type: String, required: true }],
    amenities: [String],
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    size: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,ref: User,required: true,
    },
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
