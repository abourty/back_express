const jwt = require("jsonwebtoken");
const Authentication = {
  auth_vendeur: async (req, res, next) => {
    try {
      const token = req.header("Authorization");
      if (!token)
        return res.status(400).json({ msg: "Invalid Authentication" });

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, vendeur) => {
        if (err) return res.status(400).json({ msg: "Invalid Authentication" });

        req.vendeur = vendeur;
        next();
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  auth_encherisseur: async (req, res, next) => {
    try {
      const token = req.header("Authorization");
      if (!token)
        return res.status(400).json({ msg: "Invalid Authentication" });

      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, encherisseur) => {
          if (err)
            return res.status(400).json({ msg: "Invalid Authentication" });

          req.encherisseur = encherisseur;
          next();
        }
      );
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = Authentication;
