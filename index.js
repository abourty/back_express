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
    let db = mongoose.connection;
    if (error) {
      db.on("error", console.error.bind(console, "MongoDB connection error:"));
    } else {
      console.log("Connect to Mongo DB ");
    }
  }
);

//import routes

let UserRouter=require('./routes/User.Routes')
let ProduitRouter = require("./routes/Produit.Routes");

let walletRouter = require("./routes/Wallet.Routes");
let imageRouter = require("./routes/imagesproduits");

let app = express();

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

app.use("/api",UserRouter)
app.use("/api", ProduitRouter);
app.use("/api", imageRouter);

app.use("/api", walletRouter);
let PORt = process.env.port;


app.listen(PORt, async () => {
  console.log("Server is running on port ", PORt);
});
