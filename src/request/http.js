import axios from 'axios'
import router from '../router'
import {Toast} from "vant";

var instance = axios.create({timeout: 1000 * 10});

instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
instance.defaults.baseURL = process.env.VUE_APP_BASE_URL;
// instance.defaults.baseURL = 'https://www.easy-mock.com/mock/5d89a179b214ef7c640bb7e4/recommend';

instance.interceptors.request.use(config => {
    return config
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(response => {
    if (response.status === 200) {
        return Promise.resolve(response);
    }
    return Promise.reject(response);
}, function (error) {
    Toast.clear();
    router.push({name: 'FailPage', query: {redirect: router.currentRoute.fullPath}});  //fullPath,path会把原本链接参数重置
    return Promise.reject(error);
});

export function get(url, params, isLoading = true, isShowToast = true) {
    return new Promise((resolve, reject) => {
        if (isLoading) {
            Toast.loading({
                duration: 0,       // 持续展示 toast
                mask: true,
                forbidClick: true, // 禁用背景点击
                loadingType: 'spinner',
                message: '加载中...',
            });
        }
        instance.get(url, {params: params}).then(res => {
            if (res.data.success) {
                resolve(res.data);
            } else {
                isShowToast ? Toast(res.data.message) : reject(res.data);
            }
        }).catch(err => {
            Toast(err);
        }).finally(() => {
            if (Toast && isLoading) {
                Toast.clear();
            }
        });
    })
}

export function post(url, params, isLoading = true, isShowToast = true) {
    if (isLoading) {
        Toast.loading({
            duration: 0,       // 持续展示 toast
            mask: true,
            forbidClick: true, // 禁用背景点击
            loadingType: 'spinner',
            message: '加载中...',
        });
    }
    return new Promise((resolve, reject) => {
        instance.post(url, params).then(res => {
            if (res.data.success) {
                resolve(res.data);
            } else {
                isShowToast ? Toast(res.data.message) : reject(res.data);
            }
        }).catch(err => {
            Toast(err);
        }).finally(() => {
            if (Toast && isLoading) {
                Toast.clear();
            }
        })
    })
}

export default instance;
