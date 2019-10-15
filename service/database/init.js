const mongoose = require('mongoose');
const db = "mongodb://localhost/recommend-db";
const glob = require('glob');
const {resolve} = require('path');

exports.initSchemas = () => {
    glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
};

exports.connect = () => {
    //连接数据库
    mongoose.set('useCreateIndex', true);
    mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true});
    let currentConnetTime = 0;
    let maxConnectTime = 3;

    return new Promise((resolve, reject) => {
        //增加数据库监听事件
        mongoose.connection.on('disconnected', (err) => {
            console.log(`************数据库断开`);
            if (currentConnetTime <= maxConnectTime) {
                currentConnetTime++;
                mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true});
            } else {
                reject(err);
                throw new Error('服务器出错，请呼叫广利员')
            }
        });
        mongoose.connection.on('error', (err) => {
            console.log(`************数据库错误`);
            if (currentConnetTime <= maxConnectTime) {
                currentConnetTime++;
                mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true});
            } else {
                reject(err);
                throw new Error('服务器出错，请呼叫管理员')
            }
        });
        mongoose.connection.on('open', () => {
            console.log(`MongoDB connected successful`);
            currentConnetTime = 0;
            resolve()
        })
    });


};