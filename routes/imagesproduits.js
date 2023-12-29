let router = require("express").Router();
let multer = require("multer");
let mongoose = require("mongoose");


let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

let upload = multer({
  storage: storage,
});

router.post("/img_produit", upload.single("file"), async (req, res) => {
  let file = req.file;

  res.json({ message: "Successfully uploaded files", result: file });
});

module.exports = router;
