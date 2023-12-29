const router = require("express").Router();
const auth = require("../middleware/auth");
const WalletCtrl = require("../controlls/walletCtrl");

router.get("/wallet", auth.authUser, WalletCtrl.getMonWalet);

router.put("/wallet", auth.authUser, WalletCtrl.updateMontantWalet);

module.exports = router;
