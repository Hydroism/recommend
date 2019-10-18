const fs = require('fs');
const mongoose = require('mongoose');

// filter_goods 数据导入
var insertAllGoodsInfo = async (ctx, next) => {
    fs.readFile('./data_tools/filter_data/filter_goods.json', 'utf-8', (err, data) => {
        if (err) console.log(err);
        let goodsObj = JSON.parse(data);
        let saveCount = 0;
        const Goods = mongoose.model('Goods');
        goodsObj.forEach((e, i) => {
            let newGoods = new Goods(e);
            newGoods.save().then(() => {
                saveCount++;
                console.log('插入成功' + saveCount);
            }).catch(error => {
                console.log('插入失败' + error);
            })
        })
    });
    ctx.body = 'insertAllGoodsInfo开始导入数据...'
};

// category 数据导入
var insertAllCategory = async (ctx, next) => {
    fs.readFile('./data_tools/filter_data/category.json', 'utf-8', (err, data) => {
        if (err) console.log(err);
        let categoryObj = JSON.parse(data);
        let saveCount = 0;
        const Category = mongoose.model('Category');
        categoryObj.RECORDS.forEach((e, i) => {
            let newCategory = new Category(e);
            newCategory.save().then(() => {
                saveCount++;
                console.log('插入成功' + saveCount);
            }).catch(error => {
                console.log('插入失败' + error);
            })
        })
    });
    ctx.body = 'category开始导入数据...'
};

// category_sub 数据导入
var insertCategorySub = async (ctx, next) => {
    fs.readFile('./data_tools/filter_data/category_sub.json', 'utf-8', (err, data) => {
        if (err) console.log(err);
        let categorySubObj = JSON.parse(data);
        let saveCount = 0;
        const CategorySub = mongoose.model('CategorySub');
        categorySubObj.RECORDS.forEach((e, i) => {
            let newCategorySub = new CategorySub(e);
            newCategorySub.save().then(() => {
                saveCount++;
                console.log('插入成功' + saveCount);
            }).catch(error => {
                console.log('插入失败' + error);
            })
        })
    });
    ctx.body = 'insertCategorySub开始导入数据...'
};

// goods 商品详情
var getDetailGoodsInfo = async (ctx, next) => {
    const body = ctx.request.body;
    const GoodsIdBo = {
        goodsId: body.goodsId
    };
    const Goods = mongoose.model('Goods');

    try {
        let res = await Goods.findOne({ID: GoodsIdBo.goodsId}).exec();
        if (res) {
            ctx.body = {
                code: 200,
                success: true,
                data: res,
                message: null
            }
        } else {
            ctx.body = {
                code: 400,
                success: false,
                data: null,
                message: '未查找到该商品'
            }
        }
    } catch (error) {
        ctx.body = {
            code: 500,
            success: false,
            message: error
        }
    }
};

module.exports = {
    'routerName': '/goods',
    'GET /insertAllGoodsInfo': insertAllGoodsInfo,
    'GET /insertAllCategory': insertAllCategory,
    'GET /insertCategorySub': insertCategorySub,
    'POST /getDetailGoodsInfo': getDetailGoodsInfo,
};