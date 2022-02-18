"use strict";
const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = 'mongodb+srv://anvx:a123456@cluster0.yrt0c.mongodb.net/account?retryWrites=true&w=majority';
let dbInstance = null;
module.exports.get = async function () {
  if (dbInstance) {
    return Promise.resolve(dbInstance);
  }
  const db = await MongoClient.connect(MONGODB_URI);
  dbInstance = db.db("account");
  return dbInstance;
}