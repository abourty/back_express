const wallets = require("../models/walletModel");
const users = require("../models/UserModel");

const WalletCtrl = {
  getMonWalet: async (req, res) => {
    try {
      const user = await users.findById(req.user.id);
      const findWallet = await wallets.findOne({
        idUser: user._id,
      });
      res.json({ result: findWallet });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  updateMontantWalet: async (req, res) => {
    try {
      const { montant } = req.body;
      const user = await users.findById(req.user.id);
      const findWallet = await wallets.findOne({
        idUser: user._id,
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
