const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  saveToDb() {
    const db = getDb();
    return db
      .collection("products")
      .insertOne(this)
      .then((result) => {
        //console.log(result)
        return result.insertedId;
      })
      .catch((err) => console.log(err));
  }
  static async findOneProduct(prodId) {
    const db = getDb();
    const product = await db
      .collection("products")
      .findOne({ _id: new mongodb.ObjectId(prodId) });
    // .next(); //to find the first document; when we use just find as it gives a cursor find({ _id: new mongodb.ObjectId(prodId) })
    console.log(product);
    return product;
  }
  static async findAllProducts() {
    const db = getDb();
    const cursor = db.collection("products").find();
    return await cursor.toArray();
  }
  //update is done using replaceOne it can also be done using updateOne
  static async updateProduct(prodId, title, price, description, imageUrl) {
    const db = getDb();
    // const product = await this.findOneProduct(prodId);
    const newProduct = new Product(title, price, description, imageUrl);
    const updatedProduct = await db
      .collection("products")
      .replaceOne({ _id: new mongodb.ObjectId(prodId) }, newProduct);
    return true;
  }

  static async deleteProduct(prodId) {
    const db = getDb();
    const result = await db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(prodId) });
    return result;
  }
}

module.exports = Product;
