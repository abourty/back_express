const Encherisseurs = require("../models/encheriseeurModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const wallets = require("../models/walletModel");
const EncherisseurCtrl = {
  Sinscrire: async (req, res) => {
    try {
      const { nom, prenom, numero_tel, email, cin, password } = req.body;
      const encherisseur = await Encherisseurs.findOne({ email });
      if (encherisseur)
        return res.status(400).json({ msg: "Encherisseur déja existe" });

      const date = new Date();

      let currentDay = String(date.getDate()).padStart(2, "0");

      let currentMonth = String(date.getMonth() + 1).padStart(2, "0");

      let currentYear = date.getFullYear();

      let currentDate = `${currentDay}/${currentMonth}/${currentYear}`;
      const passwordHash = await bcrypt.hash(password, 10);
      const newEncherisseur = new Encherisseurs({
        nom,
        email,
        prenom,
        numero_tel,
        cin,
        password: passwordHash,
      });
      await newEncherisseur.save();
      const newWallet = new wallets({
        idencherisseur: newEncherisseur._id,
        date_creation: currentDate,
      });
      await newWallet.save();
      res.json({ result: newEncherisseur });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  Login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const encherisseur = await Encherisseurs.findOne({ email });
      if (!encherisseur)
        return res.status(400).json({ msg: "encherisseur n'existe pas" });
      const isMatch = await bcrypt.compare(password, encherisseur.password);
      if (!isMatch)
        return res.status(400).json({ msg: "mot de passe incorrect" });

      const accesstoken = createAccessToken({ id: encherisseur._id });
      const refreshtoken = createRefreshToken({ id: encherisseur._id });
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/vendeur/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      });

      res.json({ ...encherisseur._doc, accesstoken });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
const createAccessToken = (encherisseur) => {
  return jwt.sign(encherisseur, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const createRefreshToken = (encherisseur) => {
  return jwt.sign(encherisseur, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = EncherisseurCtrl;
