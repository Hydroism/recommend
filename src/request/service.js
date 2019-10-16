import {post, get} from "./http";

const service = {
    getHomeData() {
        return get('/index', null);
    },
    login(params) {
        return post('/user/login', params)
    }
};

export default service