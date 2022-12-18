const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://shashanka:0WwYtFm7R2hlKMVC@cluster0.wleinqz.mongodb.net/shop?retryWrites=true&w=majority";
let _db; //local variable

const client = new MongoClient(url, { useUnifiedTopology: true });

const mongoConnect = async (callback) => {
  try {
    await client.connect(); //client.connect('db_name');//like shop
    _db = client.db(); //this gives an open db connection
    // console.log(_db);
    callback(); //just the app.listen(3000) in app.js
  } catch (error) {
    console.log(err);
    throw err;
  }
};

//function to get the db
const getDb = () => {
  if (_db) return _db;
  throw "no database found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;

// const mongoConnect = callback => {
//   MongoClient.connect(
//     'mongodb+srv://username:password@cluster0-ntrwp.mongodb.net/test?retryWrites=true'
//   )
//     .then(client => {
//       console.log('Connected!');
//       callback(client);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

// module.exports = mongoConnect;
