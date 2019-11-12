const Koa = require('koa');
const app = new Koa();
const {connect, initSchemas} = require('./database/init.js');
const mongoose = require('mongoose')
    , bodyParser = require('koa-bodyparser');

;(async () => {
    await connect();
    initSchemas();
})();

app.use(async (ctx, next) => {
    await ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method === 'OPTIONS') {
        ctx.body = 200;
    } else {
        await next();
    }
});

app.use(bodyParser());

const controller = require('./controller');
app.use(controller());

app.listen(3000, () => {
    console.log("app started at port 3000...");
});