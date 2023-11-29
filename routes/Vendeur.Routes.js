const router = require("express").Router();
const VendeurCtrl = require("../controlls/VendeurCtrl");
const auth_vendeur = require("../middleware/auth");

router.post("/login", VendeurCtrl.Login);
router.post("/sinscrire", VendeurCtrl.Sinscrire);

module.exports = router;
