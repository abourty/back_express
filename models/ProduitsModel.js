const mongoose = require("mongoose");

const ProduitsSchema = new mongoose.Schema({
  vendeur: {
    type: mongoose.Types.ObjectId,
    ref: "vendeur",
  },
  nom: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  prix: {
    type: mongoose.Types.Decimal128,
  },
  image: {
    type: Object,
    required: true,
  },
  dateLimite: {
    type: String,
  },
  etat: {
    type: Boolean,
    default: true,
  },
  intervalle_Tolerance: {
    min: {
      type: mongoose.Types.Decimal128,
    },
    max: {
      type: mongoose.Types.Decimal128,
    },
  },

  mombre_enchere: [
    {
      idencherisseur: {
        type: mongoose.Types.ObjectId,
        ref: "encherisseur",
      },
      prix: {
        type: mongoose.Types.Decimal128,
      },
    },
  ],
});

module.exports = mongoose.model("produit", ProduitsSchema);
