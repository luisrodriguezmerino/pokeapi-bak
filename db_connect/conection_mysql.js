const { MongoClient } = require('mongodb');
//let connection
const uri = "mongodb+srv://TeemoPatriarca:soyleyenda666@cluster0.ub68j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

console.log("Entro a mongoDB ")
connection = MongoClient.connect(uri, function (err, db) {
  if (err) {
    throw err;
  }
  return db
});

module.exports = connection;