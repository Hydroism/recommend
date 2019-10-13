import {post, get} from "./http";

const home = {
    getHomeData() {
        return get('/index', null, {isFailPage: true, isShowLoading: true});
    }
};

export default home