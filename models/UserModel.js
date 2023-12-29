let mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true,
  },
  prenom: {
    type: String,
    required: true,
    trim: true,
  },
  numero_tel: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  cin: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
