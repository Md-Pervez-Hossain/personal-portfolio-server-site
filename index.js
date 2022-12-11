const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.BD_PASSWORD}@cluster0.zr5yxev.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const portfolioCollection = client
      .db("personal-portfolio")
      .collection("portfolio");

    app.post("/addportdolio", async (req, res) => {
      const portfolio = req.body;
      const result = await portfolioCollection.insertOne(portfolio);
      res.send(result);
    });
    app.get("/portfolio", async (req, res) => {
      const query = {};
      const portfolio = await portfolioCollection.find(query).toArray();
      res.send(portfolio);
    });
    app.get("/portfolio/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const portfolio = await portfolioCollection.findOne(query);
      res.send(portfolio);
    });
    console.log("database connected");
  } finally {
  }
}
run().catch((error) => {
  console.log(error);
});

app.get("/", (req, res) => {
  res.send("server running");
});
app.listen(port, (req, res) => {
  console.log("server runinng");
});
