const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const client = new MongoClient(
  "mongodb+srv://TeemoPatriarca:soyleyenda666@cluster0.ub68j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

router.post("/all_paths", async function (req, res, next) {
  
  if (req.method === 'POST') {
    console.log("Entro a post")
    const dataFront = {
        url_path : req.body.name ,
    }
    console.log(dataFront)
    try {
      await client.connect();
      const database = client.db("Tests_Kike");
      const collection = database.collection("pokeapi");
      const query = {"key" : "pokeapi"};
      var newvalues = { $push : { "pokemonsCapturados" : dataFront.url_path }}

      const res = await collection.updateOne(query , newvalues)
      let responseArray = []
      await res.forEach((data) => {
        responseArray = [data, ...responseArray]
      })
      res.send(responseArray)
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate=119");
    } catch (error) {
      res.status(500).json({ message: error.message });
    } finally {
      await client.close();
    }
  }
});

module.exports = router;
