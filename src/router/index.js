import Vue from 'vue';
import Router from 'vue-router';
// 导入组件
import Login from '@/views/Login';
import Home from '@/views/Home';
import Users from '@/views/Users/Users.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {name: 'login', path: '/login', component: Login},
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        // 用户列表
        {name: 'users', path: '/users', component: Users}
      ]
    }
  ]
});
