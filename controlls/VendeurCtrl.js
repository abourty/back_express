const vendeurs = require("../models/vendeurModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const VendeurCtrl = {
  Sinscrire: async (req, res) => {
    try {
      const { nom, prenom, numero_tel, email, cin, password } = req.body;
      const findVendeur = await vendeurs.findOne({ email });
      if (findVendeur)
        return res.status(400).json({ msg: "vendeur déja existe" });

      const passwordHash = await bcrypt.hash(password, 10);
      const newVendeur = new vendeurs({
        nom,
        email,
        prenom,
        numero_tel,
        cin,
        password: passwordHash,
      });
      await newVendeur.save();
      res.json({ result: newVendeur });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  Login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const findVendeur = await vendeurs.findOne({ email });
      if (!findVendeur)
        return res.status(400).json({ msg: "Vendeur n'existe pas" });
      const isMatch = await bcrypt.compare(password, findVendeur.password);
      if (!isMatch)
        return res.status(400).json({ msg: "mot de passe incorrect" });

      const accesstoken = createAccessToken({ id: findVendeur._id });
      const refreshtoken = createRefreshToken({ id: findVendeur._id });
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/vendeur/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      });

      res.json({ ...findVendeur._doc, accesstoken });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

const createAccessToken = (vendeur) => {
  return jwt.sign(vendeur, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const createRefreshToken = (vendeur) => {
  return jwt.sign(vendeur, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = VendeurCtrl;
