import Vue from 'vue'
import Router from "vue-router";
import vMainPage from '../components/MainPage.vue'
import vLogin from '../components/Login.vue'
import vRegister from '../components/Register.vue'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: vMainPage,
        },
        {
            path: '/login',
            component: vLogin,
        },
        {
            path: '/register',
            component: vRegister,
        }
    ]
})