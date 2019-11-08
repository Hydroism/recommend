const fs = require('fs');
const mongoose = require('mongoose');
const {success, warn, fail, query} = require('../util/request');

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

    try {
        const Goods = mongoose.model('Goods');
        let res = await Goods.findOne({ID: GoodsIdBo.goodsId}).exec();
        if (res) {
            ctx.body = success(res)
        } else {
            ctx.body = warn('未查找到该商品')
        }
    } catch (error) {
        ctx.body = fail(error)
    }
};
// goods 商品详情get方式
var getDetailGoodsInfo2 = async (ctx, next) => {
    const query = ctx.request.query;
    const {goodsId} = query;  //解构赋值
    const GoodsIdBo = {
        goodsId: goodsId
    };

    try {
        const Goods = mongoose.model('Goods');
        let res = await Goods.findOne({ID: GoodsIdBo.goodsId}).exec();
        ctx.body = res ? success(res) : warn('未查找到该商品');
    } catch (error) {
        ctx.body = fail(error)
    }
};

//获取商品分类的大类
var getCategory = async (ctx, next) => {
    try {
        const Category = mongoose.model('Category');
        let res = await Category.find().exec();
        ctx.body = res.length ? success(res) : warn('该分类暂无下级分类');
    } catch (error) {
        ctx.body = fail(error)
    }
};

//获取商品分类的中类
var getCategorySub = async (ctx, next) => {
    const query = ctx.request.query;
    const {categoryId} = query;  //解构赋值
    const CategoryIdBo = {
        categoryId: categoryId
    };

    try {
        const CategorySub = mongoose.model('CategorySub');
        let res = await CategorySub.find({MALL_CATEGORY_ID: CategoryIdBo.categoryId}).exec();
        ctx.body = res.length ? success(res) : warn('暂无商品分类');
    } catch (error) {
        ctx.body = fail(error)
    }
};

var queryGoodsListByCategorySub = async (ctx, next) => {
    const body = ctx.request.body;
    const CategorySubIdBo = {categorySubId: body.categorySubId};
    let pageQuery = body.pageQuery;
    const start = (pageQuery.page - 1) * pageQuery.size;

    try {
        const Goods = mongoose.model('Goods');
        let res = await Goods.find({SUB_ID: CategorySubIdBo.categorySubId}).skip(start).limit(pageQuery.size).exec();
        ctx.body = res.length ? query(pageQuery, success(res)) : query(pageQuery, warn('该分类暂无商品'));
    } catch (error) {
        ctx.body = query(pageQuery, fail(error))
    }
};

module.exports = {
    'routerName': '/goods',
    'GET /insertAllGoodsInfo': insertAllGoodsInfo,
    'GET /insertAllCategory': insertAllCategory,
    'GET /insertCategorySub': insertCategorySub,

    'POST /getDetailGoodsInfo': getDetailGoodsInfo,
    'GET /getDetailGoodsInfo2': getDetailGoodsInfo2,
    'GET /getCategory': getCategory,
    'GET /getCategorySub': getCategorySub,
    'POST /queryGoodsListByCategorySub': queryGoodsListByCategorySub,
};