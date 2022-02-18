const mongodb = require('mongoose');
mongodb.connect('mongodb+srv://anvx:a123456@cluster0.yrt0c.mongodb.net/account?retryWrites=true&w=majority');
const  Schema  =  mongodb.Schema; 

const accountSchema = new Schema({
username: String,
password: String,
},
{
    collection:'account'
}
);
const AccountModel = mongodb.model('account', accountSchema)
module.exports = AccountModel