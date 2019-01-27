import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/Main'
import Register from '../components/Register'
import Login from '../components/Login'
import Account from '../components/User'

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