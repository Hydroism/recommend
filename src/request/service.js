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
    }

};

export default service