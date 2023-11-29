const router = require("express").Router();
const EncherisseurCtrl = require("../controlls/EncherisseurCtlr");

router.post("/inscrit_encherisseur", EncherisseurCtrl.Sinscrire);
router.post("/login_encherisseur", EncherisseurCtrl.Login);

module.exports = router;
