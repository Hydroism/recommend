import {post, get} from "./http";

const service = {
    getHomeData() {
        return get('/index', null);
    },
    login(params) {
        return post('/user/login', params)
    },
    getGoodsDetail(params) {
        return post('/goods/getDetailGoodsInfo', params)
    }
};

export default service