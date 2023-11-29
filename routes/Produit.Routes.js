const router = require("express").Router();
const ProduitsCtrl = require("../controlls/ProduitCtrl");
const auth = require("../middleware/auth");
router.post("/produit", auth.auth_vendeur, ProduitsCtrl.AjouterProduits);
router.get("/produit/:id", ProduitsCtrl.getProduitById);
router.put(
  "/encher_produit/:id",
  auth.auth_encherisseur,
  ProduitsCtrl.encherProduit
);
router.put(
  "/update_encher/:id",
  auth.auth_encherisseur,
  ProduitsCtrl.updateencherProduit
);
module.exports = router;
