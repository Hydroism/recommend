const mongoose = require('mongoose')


var login = async (ctx, next) => {
    const User = mongoose.model('User');
    let newUser = new User(ctx.request.body);

    await newUser.save().then(() => {
        ctx.body = {
            code: 200,
            success: true,
            message: '注册成功'
        }
    }).catch(error => {
        ctx.body = {
            code: 500,
            success: false,
            message: error
        }
    });
};

module.exports = {
    'routerName': '/user',
    'POST /login': login,
};