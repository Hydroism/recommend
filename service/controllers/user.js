const mongoose = require('mongoose');
const {success, warn, fail} = require('./request');

var login = async (ctx, next) => {
    const body = ctx.request.body;
    const userBo = {
        userName: body.userName,
        password: body.password
    };
    const User = mongoose.model('User');

    await User.findOne({userName: userBo.userName}).exec().then(async (res) => {
        if (res) { //有账号，进行验证
            let newUser = new User();
            await newUser.comparePassword(userBo.password, res.password)
                .then(isMatch => {
                    // ctx.body = {code: 200, success: true, message: isMatch}
                    ctx.body = isMatch ? success() : warn('密码错误')
                }).catch(error => {
                    ctx.body = fail(error)
                })
        } else { //没有账号，进行注册
            let newUser = new User(userBo);
            await newUser.save().then(() => {
                ctx.body = success('注册成功')
            }).catch(error => {
                ctx.body = fail(error)
            });
        }
    }).catch(error => {
        ctx.body = fail(error)
    });
};

module.exports = {
    'routerName': '/user',
    'POST /login': login,
};