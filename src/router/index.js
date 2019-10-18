import Vue from 'vue'
import Router from 'vue-router'

import App from '../App'
import ShoppingMall from '../page/ShoppingMall'
import FailPage from '../page/FailPage'
import Login from '../page/Login'
import Goods from '../page/goods'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/main', component: App,
            children: [
                {path: '', redirect: '/home'},
                {path: 'home', component: ShoppingMall},
                {path: 'failPage', component: FailPage},
                {path: 'login', component: Login},
                {path: 'goods', component: Goods},
            ]
        }, {
            path: '*',
            redirect: '/main/home'
        }
    ]
})