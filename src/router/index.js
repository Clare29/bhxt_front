import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// 首页
const Home = () => import('pages/home/home');
// 登录
const Login = () => import('pages/login/login');
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    }, {
      path: '/home',
      component: Home,
      children: []
    }, {
      path: '/login',
      component: Login
    }
  ]
});
