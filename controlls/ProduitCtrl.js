let Produits = require("../models/ProduitsModel");
let users = require("../models/UserModel");

let wallets = require("../models/walletModel");
let ProduitsCtrl = {
  AjouterProduits: async (req, res) => {
    try {
      let { nom, description, prix, image, min, max } = req.body;
      let expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 24);

      let user = await users.findById(req.user.id);
      let url_imga = "http://localhost:5000/uploads/" + image;
      let intervalle_Tolerance = {
        min: min,
        max: max,
      };

      let newProduit = new Produits({
        UserID: user._id,
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

  getAllProduits:async(req,res)=>{
    try {
      let user = await users.findById(req.user.id);
      let AllProduits= await Produits.find().populate("UserID", "nom prenom")
      let filterArray=AllProduits.filter((item)=>item.UserID._id.toString()!==user._id.toString())
      res.json({result:filterArray})
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getAllMesProduits:async(req,res)=>{
    try {
      let user = await users.findById(req.user.id);
      let AllProduits= await Produits.find().populate({
        path: "mombre_enchere.idUser",
        select:
          "nom prenom"
      })
      
      let Arrayfilter=AllProduits.filter((item)=>item.UserID.toString()==user._id.toString())
      res.json({result:Arrayfilter})
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getProduitById: async (req, res) => {
    try {
      const findProduit = await Produits.findById({
        _id: req.params.id,
      }).populate("UserID", "nom prenom");
      res.json({ result: findProduit });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  encherProduit: async (req, res) => {
    try {
      const { prix } = req.body;
      const user = await users.findById(req.user.id);
      const userConnecte = await users.findById({
        _id: user._id,
      });
      const findWallet = await wallets.findOne({
        idUser: userConnecte._id,
      });
      const findProduit = await Produits.findById({ _id: req.params.id });

      const requiredIndex = findProduit.mombre_enchere.findIndex((el) => {
        return (
          el.idUser.toString() === userConnecte._id.toString()
        );
      });
      if (requiredIndex === -1) {
        if (findWallet.montant < prix)
          return res.status(400).json({ msg: "Votre montant est insuffisant" });

        findProduit.mombre_enchere.push({
          idUser: userConnecte._id,
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
      const user = await users.findById(req.user.id);
      const userConnecte = await users.findById({
        _id: user._id,
      });
      const findWallet = await wallets.findOne({
        idUser: userConnecte._id,
      });
      const findProduit = await Produits.findById({ _id: req.params.id });
      const requiredIndex = findProduit.mombre_enchere.findIndex((el) => {
        return (
          el.idUser.toString() === userConnecte._id.toString()
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
