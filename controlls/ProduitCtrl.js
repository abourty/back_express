const Produits = require("../models/ProduitsModel");
const Vendeurs = require("../models/vendeurModel");
const Encherisseurs = require("../models/encheriseeurModel");
const wallets = require("../models/walletModel");
const ProduitsCtrl = {
  AjouterProduits: async (req, res) => {
    try {
      const { nom, description, prix, image, min, max } = req.body;
      var expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 24);

      const vendeur = await Vendeurs.findById(req.vendeur.id);
      const url_imga = "http://localhost:5000/uploads/" + image;
      const intervalle_Tolerance = {
        min: min,
        max: max,
      };

      const newProduit = new Produits({
        vendeur: vendeur._id,
        nom,
        description,
        prix,
        dateLimite: expiryDate,
        image: url_imga,
        intervalle_Tolerance: intervalle_Tolerance,
      });
      await newProduit.save();

      res.json({ result: newProduit });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getProduitById: async (req, res) => {
    try {
      const findProduit = await Produits.findById({
        _id: req.params.id,
      }).populate("vendeur", "nom prenom");
      res.json({ result: findProduit });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  encherProduit: async (req, res) => {
    try {
      const { prix } = req.body;
      const encherisseur = await Encherisseurs.findById(req.encherisseur.id);
      const encherisseurconnect = await Encherisseurs.findById({
        _id: encherisseur._id,
      });
      const findWallet = await wallets.findOne({
        idencherisseur: encherisseurconnect._id,
      });
      const findProduit = await Produits.findById({ _id: req.params.id });

      const requiredIndex = findProduit.mombre_enchere.findIndex((el) => {
        return (
          el.idencherisseur.toString() === encherisseurconnect._id.toString()
        );
      });
      if (requiredIndex === -1) {
        if (findWallet.montant < prix)
          return res.status(400).json({ msg: "Votre montant est insuffisant" });

        findProduit.mombre_enchere.push({
          idencherisseur: encherisseur._id,
          prix: prix,
        });
        const updateProduit = await Produits.findByIdAndUpdate(
          { _id: findProduit._id },
          {
            mombre_enchere: findProduit.mombre_enchere,
          }
        );

        res.json({ result: updateProduit });
      } else {
        return res
          .status(401)
          .json({ msg: "Vous avez déja echrér  à ces produit" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  updateencherProduit: async (req, res) => {
    try {
      const { prix } = req.body;
      const encherisseur = await Encherisseurs.findById(req.encherisseur.id);
      const encherisseurconnect = await Encherisseurs.findById({
        _id: encherisseur._id,
      });
      const findWallet = await wallets.findOne({
        idencherisseur: encherisseurconnect._id,
      });
      const findProduit = await Produits.findById({ _id: req.params.id });
      const requiredIndex = findProduit.mombre_enchere.findIndex((el) => {
        return (
          el.idencherisseur.toString() === encherisseurconnect._id.toString()
        );
      });
      if (requiredIndex === -1) {
        return false;
      } else {
        if (findWallet.montant < prix)
          return res.status(400).json({ msg: "Votre montant est insuffisant" });
        findProduit.mombre_enchere[requiredIndex].prix = prix;
        const updateencher = await Produits.findOneAndUpdate(
          { _id: findProduit._id },
          {
            mombre_enchere: findProduit.mombre_enchere,
          }
        );
        res.json({ reslt: updateencher });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = ProduitsCtrl;
