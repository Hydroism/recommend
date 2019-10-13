const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

//创建UserShema
const userSchema = new Schema({
    UserId: {type: ObjectId},
    userName: {unique: true, type: String},
    password: {type: String},
    createTime: {type: Date, default: Date.now()},
    lastLoginTime: {type: Date, default: Date.now()}
});

mongoose.model('User', userSchema);




