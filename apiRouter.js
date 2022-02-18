const express = require ('express');
var router = express.Router();
const app = express();
const AWS = require('aws-sdk');
const uuid = require('node-uuid');
const serverless = require('serverless-http');
//import Router from 'express/lib/router'
// create a new DynamoDB client
// which provides connectivity b/w the app
// and the db instance
AWS.config.update({ region: 'us-east-2' });
const client = new AWS.DynamoDB.DocumentClient();
const tableName = 'users';
//var AccountModel = require('./models/account');
const { route } = require('./server');

router.get('/', (req, res, next) => {
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



router.post('/todos', (req, res) => {
    const { title, done = false} = req.body;
   
    const id = uuid.v4();
    var username = req.body.username
    const params = {
      TableName: tableName,
      Item: {
        id,
        username,
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

router.post('/register', (req, res,next) => {
    var username = req.body.username
    var password = req.body.password
    AccountModel.findOne({
        username:username
    })
    .then(data=>{
        if(data){
            return res.json('account da ton tai');
        
        }
        else{
            AccountModel.create(
                {
                    username:username,
                    password:password
                })
                .then(data=>{
                    return res.json('tao thanh cong')
                })
                .catch(err=>{
                    return  res.status(500).json('tao that bai')
                })

        }
    })
  
  })
  router.put('/:id', (req, res,next) => {
   var id= req.params.id
    var newpassword = req.body.newpassword
    AccountModel.findByIdAndUpdate(id,{
        password :newpassword
    })
    .then(data=>{
        res.json('update thanh cong')

    })
    .catch(err=>{
        return  res.status(500).json('update that bai')
    })
    
  })
  router.delete('/', (req, res,next) => {
    res.json('router delete'+ req.body.username)
  })


  module.exports = router
