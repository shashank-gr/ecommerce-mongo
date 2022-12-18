const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  saveUser() {
    const db = getDb();
    db.collection("users")
      .insertOne(this)
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static findUserbyID(id) {
    const db = getDb();
    return db.collection("users").findOne({ _id: new ObjectId(id) });
  }
}
// const User = sequelize.define('user', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   name: Sequelize.STRING,
//   email: Sequelize.STRING
// });

module.exports = User;
