import axios from 'axios'
import router from '../router'
import {Toast} from "vant";

var instance = axios.create({timeout: 1000 * 10});

instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
instance.defaults.baseURL = process.env.VUE_APP_BASE_URL;
// instance.defaults.baseURL = 'https://www.easy-mock.com/mock/5d89a179b214ef7c640bb7e4/recommend';

instance.interceptors.request.use(config => {
    Toast.loading({
        duration: 0,       // 持续展示 toast
        mask: true,
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '加载中...',
    });
    return config
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(response => {
    Toast.clear();
    if (response.status === 200) {
        return Promise.resolve(response);
    }
    return Promise.reject(response);
}, function (error) {
    Toast.clear();
    router.push({path: 'failPage', query: {redirect: router.currentRoute.fullPath}});  //fullPath,path会把原本链接参数重置
    return Promise.reject(error);
});

export function get(url, params) {
    return new Promise((resolve, reject) => {
        instance.get(url, {params: params}).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err)
        });
    })
}

export function post(url, params) {
    return new Promise((resolve, reject) => {
        instance.post(url, params).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err)
        })
    })
}

export default instance;
