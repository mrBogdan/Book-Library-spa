import Vue from 'vue'
import Router from 'vue-router'
import Main from '../views/Main'
import Register from '../views/Register'
import Login from '../views/Login'
import Account from '../views/User'

Vue.use(Router);

const routes = [
  {
    path: '/',
    component: Main,
    meta: {
      title: 'Home page - Book library'
    }
  },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/account', component: Account }
];

export default new Router({
  routes,
  mode: 'history'
});