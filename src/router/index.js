import Vue from 'vue'
import Router from 'vue-router'

import App from '../App'
import ShoppingMall from '../page/ShoppingMall'
import FailPage from '../page/FailPage'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/main', name: 'Main', component: App,
            children: [
                {path: '', redirect: '/home'},
                {path: 'home', component: ShoppingMall},
                {path: 'failPage', component: FailPage},
            ]
        }, {
            path: '*',
            redirect: '/main/home'
        }
    ]
})