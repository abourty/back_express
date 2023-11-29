const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//connection to data base

const URI = process.env.mongo_db;
mongoose.set("strictQuery", true);
mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUniFiedTopology: true,
  },

  (error) => {
    var db = mongoose.connection;
    if (error) {
      db.on("error", console.error.bind(console, "MongoDB connection error:"));
    } else {
      console.log("Connect to Mongo DB ");
    }
  }
);

//import routes

const VendeurRouter = require("./routes/Vendeur.Routes");
const ProduitRouter = require("./routes/Produit.Routes");
const EncherisseurRouter = require("./routes/Encherisseur.Routes");
const walletRouter = require("./routes/Wallet.Routes");
const imageRouter = require("./routes/imagesproduits");

const app = express();

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.static("/uploads"));

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.get("/", (req, res) => {
  res.send("welcom to my app");
});

app.use("/api", VendeurRouter);
app.use("/api", ProduitRouter);
app.use("/api", imageRouter);
app.use("/api", EncherisseurRouter);
app.use("/api", walletRouter);
const PORt = process.env.port;


app.listen(PORt, async () => {
  console.log("Server is running on port ", PORt);
});
