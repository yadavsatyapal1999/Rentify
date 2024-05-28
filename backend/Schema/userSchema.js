const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  contact: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password :{type:String,required:true},
  type: { type: String, required: true },

});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
