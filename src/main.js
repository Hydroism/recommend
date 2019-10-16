import Vue from 'vue'
import App from './App.vue'
import router from './router'
import api from './request'
import './config/rem'
import './style/common.scss'
import './style/mixin.scss'
import './assets/theme.scss'
import {Button, Lazyload, Toast} from 'vant'

Vue.use(Button, Toast);

Vue.use(Lazyload,{
    preload: 1.3,
    loading:require('./assets/images/loading-icon.gif'),
    error:require('./assets/images/error-img.png'),
    attempt: 3
});

Vue.config.productionTip = false;
Vue.prototype.$api = api;


new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
