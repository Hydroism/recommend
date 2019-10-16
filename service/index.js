const Koa = require('koa');
const app = new Koa();
const {connect, initSchemas} = require('./database/init.js');
const mongoose = require('mongoose')
    , bodyParser = require('koa-bodyparser');

;(async () => {
    await connect();
    initSchemas();
})();


app.use(bodyParser());

const controller = require('./controller');
app.use(controller());

app.listen(3000, () => {
    console.log("app started at port 3000...");
});