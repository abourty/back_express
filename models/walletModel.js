const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  idUser: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  montant: {
    type: Number,
    default: 0,
  },
  date_creation: {
    type: String,
  },
});

module.exports = mongoose.model("wallet", walletSchema);
