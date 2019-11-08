import Vue from 'vue'
import Router from 'vue-router'

import App from '../App'
import ShoppingMall from '../page/ShoppingMall'
import FailPage from '../page/FailPage'
import Login from '../page/Login'
import Goods from '../page/Goods'
import Category from '../page/Category'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/main', component: App,
            children: [
                {path: '', redirect: '/home'},
                {path: 'home', name: 'home', component: ShoppingMall},
            ]
        },
        {path: '/failPage', name: 'FailPage', component: FailPage},
        {path: '/goods', name: 'Goods', component: Goods},
        {path: '/login', name: 'Login', component: Login},
        {path: '/categoryList', name: 'CategoryList', component: Category},
        {path: '*', redirect: '/main/home'}
    ]
})