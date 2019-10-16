const fs = require('fs');
const mongoose = require('mongoose');

// filter_goods 数据导入
var insertAllGoodsInfo = async (ctx, next) => {
    fs.readFile('./data_tools/filter_data/filter_goods.json', 'utf-8', (err, data) => {
        if (err) console.log(err);
        let goodsObj = JSON.parse(data);
        let saveCount = 0;
        const Goods = mongoose.model('Goods');
        goodsObj.forEach( (e, i) => {
            let newGoods = new Goods(e);
            newGoods.save().then(() => {
                saveCount ++;
                console.log('成功' + saveCount);
            }).catch( error => {
                console.log(error);
            })
        })
    });
};

module.exports = {
    'routerName': '/goods',
    'GET /insertAllGoodsInfo': insertAllGoodsInfo
};