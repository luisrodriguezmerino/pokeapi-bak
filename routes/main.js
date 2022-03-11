const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const client = new MongoClient("mongodb+srv://TeemoPatriarca:soyleyenda666@cluster0.ub68j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

router.get('/main', function (req, res, next) {

  async function run() {
    try {
      await client.connect();
      const database = client.db('Tests_Kike');
      const collection = database.collection('pokeapi');
      const query = {"key" : "pokeapi" };
      const response = collection.find(query);

      let responseArray = []
      await response.forEach((data) => {
        responseArray = [data, ...responseArray]
      })
      res.send(responseArray)
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);


})

//conection_mysql.end();

module.exports = router;
