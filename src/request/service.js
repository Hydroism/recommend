import {post, get} from "./http";

const service = {
    getHomeData() {
        return get('/index');
    },
    login(params) {
        return post('/user/login', params)
    },
    getGoodsDetail(params) {
        return post('/goods/getDetailGoodsInfo', params)
    },
    getGoodsDetail2(goodsId) {
        let params = {goodsId: goodsId};
        return get('/goods/getDetailGoodsInfo2', params)
    },
    getCategoryList() {
        return get('/goods/getCategory', null, false)
    },
    getCategorySubList(categoryId) {
        let params = {categoryId: categoryId};
        return get('/goods/getCategorySub', params, false)
    },
    queryCategoryGoodsList(params) {
        return post('/goods/queryGoodsListByCategorySub', params, false, false)
    }

};

export default service