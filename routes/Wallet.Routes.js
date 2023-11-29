const router = require("express").Router();
const auth = require("../middleware/auth");
const WalletCtrl = require("../controlls/walletCtrl");

router.get("/wallet", auth.auth_encherisseur, WalletCtrl.getMonWalet);

router.put("/wallet", auth.auth_encherisseur, WalletCtrl.updateMontantWalet);

module.exports = router;
