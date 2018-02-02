import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// 首页
const Home = () => import('pages/home/home');
// 登录
const Login = () => import('pages/login/login');
// 设置
const Setting = () => import('pages/setting/setting');
// 意向代理
const Yixiangdaili = () => import('pages/yixiangdaili/yixiangdaili');
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
    }, {
      path: '/setting',
      component: Setting
    }, {
      path: '/yixiangdaili',
      component: Yixiangdaili
    }
  ]
});
