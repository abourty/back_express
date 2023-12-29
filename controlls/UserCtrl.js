let users= require('../models/UserModel')
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let wallets = require("../models/walletModel");
let UserCtrls={

    Sinscrire: async (req, res) => {
        try {
          let { nom, prenom, numero_tel, email, cin, password } = req.body;
          let user = await users.findOne({ email });
          if (user)
            return res.status(400).json({ msg: "user déja existe" });
    
          const date = new Date();
    
          let currentDay = String(date.getDate()).padStart(2, "0");
    
          let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
    
          let currentYear = date.getFullYear();
    
          let currentDate = `${currentDay}/${currentMonth}/${currentYear}`;
          let passwordHash = await bcrypt.hash(password, 10);
          let newUser = new users({
            nom,
            email,
            prenom,
            numero_tel,
            cin,
            password: passwordHash,
          });
          await newUser.save();
          const newWallet = new wallets({
            idUser: newUser._id,
            date_creation: currentDate,
          });
          await newWallet.save();
          res.json({ result: newUser });
        } catch (error) {
          return res.status(500).json({ msg: error.message });
        }
      },

      Login: async (req, res) => {
        try {
          let { email, password } = req.body;
          let user = await users.findOne({ email });
          if (!user)
            return res.status(400).json({ msg: "user n'existe pas" });
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch)
            return res.status(400).json({ msg: "mot de passe incorrect" });
    
          const accesstoken = createAccessToken({ id: user._id });
          const refreshtoken = createRefreshToken({ id: user._id });
          res.cookie("refreshtoken", refreshtoken, {
            httpOnly: true,
            path: "/vendeur/refresh_token",
            maxAge: 1 * 24 * 60 * 60 * 1000, // 7d
          });
    
          res.json({ ...user._doc, accesstoken });
        } catch (error) {
          return res.status(500).json({ msg: error.message });
        }
      },

};
const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });
  };
  
  const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });
  };

module.exports=UserCtrls
