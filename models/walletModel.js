const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  idencherisseur: {
    type: mongoose.Types.ObjectId,
    ref: "encherisseur",
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
