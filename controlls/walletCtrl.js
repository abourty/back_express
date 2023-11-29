const wallets = require("../models/walletModel");
const Encheriseurs = require("../models/encheriseeurModel");

const WalletCtrl = {
  getMonWalet: async (req, res) => {
    try {
      const encherisseur = await Encheriseurs.findById(req.encherisseur.id);
      const findWallet = await wallets.findOne({
        idencherisseur: encherisseur._id,
      });
      res.json({ result: findWallet });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  updateMontantWalet: async (req, res) => {
    try {
      const { montant } = req.body;
      const encherisseur = await Encheriseurs.findById(req.encherisseur.id);
      const findWallet = await wallets.findOne({
        idencherisseur: encherisseur._id,
      });
      const updatewalet = await wallets.findByIdAndUpdate(
        { _id: findWallet._id },
        {
          montant: montant,
        }
      );
      res.json({ updatewalet });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = WalletCtrl;
