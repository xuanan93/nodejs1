'use strict';
const express = require ('express');
//var router = express.Router();
const AWS = require('aws-sdk');
const uuid = require('node-uuid');
// create a new DynamoDB client
// which provides connectivity b/w the app
// and the db instance
AWS.config.update({ region: 'us-east-2' });
const client = new AWS.DynamoDB.DocumentClient();
const tableName = 'users';
//var AccountModel = require('./models/account');
const serverless = require('serverless-http');
const app = express()
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
const port = 3000
//app.get('/', function (req, res) {
  //  res.send('hello world')
  //})
  app.get('/', (req, res, next) => {
    var params = {
     TableName: tableName
 };
 client.scan(params, (err, data) => {
     if (err) {
         console.log(err);
     } else {
         var items = [];
         for (var i in data.Items)
             items.push(data.Items[i]);
         res.contentType = 'application/json';
         res.send(items);
     }
 })
 });
 
 
 
 app.post('/', (req, res) => {
     const { title, done = false} = req.body;
    
     const id = uuid.v4();
     var username = req.body.username
     var email = req.body.email
     var birthdate = req.body.birthdate
     const params = {
       TableName: tableName,
       Item: {
         id,
         username,
         email,
         birthdate
       },
     };
    
     client.put(params, (error) => {
       if (error) {
         console.log('Error creating Todo: ', error);
         res.status(400).json({ error: 'Could not create Todo' });
       }
    
       res.json({ id,username });
     });
   });
 
//var router = require('./apiRouter')
//app.use('/a/', router);
module.exports = app
app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})