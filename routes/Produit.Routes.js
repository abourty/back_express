let router = require("express").Router();
const ProduitsCtrl = require("../controlls/ProduitCtrl");
const auth = require("../middleware/auth");
router.post("/produit", auth.authUser, ProduitsCtrl.AjouterProduits);
router.get('/produit',auth.authUser,ProduitsCtrl.getAllProduits)
router.get('/mes_produit',auth.authUser,ProduitsCtrl.getAllMesProduits)
router.get("/produit/:id", ProduitsCtrl.getProduitById);
router.put(
  "/encher_produit/:id",
  auth.authUser,
  ProduitsCtrl.encherProduit
);
router.put(
  "/update_encher/:id",
  auth.authUser,
  ProduitsCtrl.updateencherProduit
);
module.exports = router;
