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
  static async addToCart(userId, productId) {
    const user = await User.findUserbyID(userId);
    const userCart = user.cart || null;
    let updatedCart;
    let cartItems;
    if (userCart) {
      cartItems = user.cart.items;
      const productIdx = cartItems.findIndex((item) => {
        if (item.productId == productId) {
          return true;
        }
      });
      // console.log(productIdx);
      if (productIdx > -1) {
        cartItems[productIdx].quantity = cartItems[productIdx].quantity + 1;
        updatedCart = {
          items: [...cartItems],
        };
      } else {
        updatedCart = {
          items: [
            ...cartItems,
            { productId: new ObjectId(productId), quantity: 1 },
          ],
        };
      }
    } else {
      updatedCart = {
        items: [{ productId: new ObjectId(productId), quantity: 1 }],
      };
    }

    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(userId) },
        {
          $set: {
            cart: updatedCart,
          },
        }
      )
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => console.log(err));
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
