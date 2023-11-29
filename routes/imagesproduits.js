const router = require("express").Router();
const multer = require("multer");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({
  storage: storage,
});

router.post("/img_produit", upload.single("file"), async (req, res) => {
  let file = req.file;

  res.json({ message: "Successfully uploaded files", result: file });
});

module.exports = router;
