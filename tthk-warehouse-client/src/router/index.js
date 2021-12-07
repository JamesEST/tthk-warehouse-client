import Vue from 'vue'
import Router from 'vue-router'
import vMainPage from '../components/MainPage'
import vLogin from '../components/Login'

Vue.use(Router);

let router = new Router ({
    routes: [
    {
        path: '/',
        component: vMainPage
    },
    {
        path: '/login',
        component: vLogin
    }
    ]
})

export default router;