import Vue from 'vue';
import Router from 'vue-router';
// 导入组件
import Login from '@/views/Login';
import Home from '@/views/Home';
import Users from '@/views/Users/Users.vue';
import Rights from '@/views/roles/Rights';
import Roles from '@/views/roles/Roles.vue';
import { Message } from 'element-ui';
import Category from '@/views/goods/category.vue';
import goodsList from '@/views/goods/goods.vue';
import addGoodsList from '@/views/goods/addGoodsList.vue';
import Orders from '@/views/orders/orders.vue';
import Reports from '@/views/reports/reports.vue';

import NProgress from 'nprogress';

Vue.use(Router);

const router = new Router({
  routes: [
    {name: 'login', path: '/login', component: Login},
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        // 用户列表
        {name: 'users', path: '/users', component: Users},
        {name: 'rights', path: '/rights', component: Rights},
        {name: 'roles', path: '/roles', component: Roles},
        {name: 'categories', path: '/categories', component: Category},
        {name: 'goods', path: '/goods', component: goodsList},
        {name: 'addgoods', path: '/goods/add', component: addGoodsList},
        {name: 'orders', path: '/orders', component: Orders},
        {name: 'reports', path: '/reports', component: Reports}
      ]
    }
  ]
});

// 设置路由的前置守卫
router.beforeEach((to, from, next) => {
  // 进度条
  NProgress.start();

  // console.log(to, from);
  // 判断当前方位的路由是否为login
  if (to.name === 'login') {
    next();
  } else {
    // 判断是否存在token
    const token = sessionStorage.getItem('token');
    if (!token) {
      // 跳转到登录页
      router.push({name: 'login'});
      // 提示
      Message.warning('请先登录');
      return;
    }
  }
  next();
});

router.afterEach((to, from) => {
  NProgress.done();
});

export default router;
