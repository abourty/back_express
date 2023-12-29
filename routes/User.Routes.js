let router = require("express").Router();
let UserCtrl= require('../controlls/UserCtrl')
router.post("/inscrit", UserCtrl.Sinscrire);
router.post("/login", UserCtrl.Login);

module.exports = router;


