import Vue from 'vue'
import Router from 'vue-router'
import Main from '../views/Main'
import Register from '../views/Register'
import Login from '../views/Login'
import Account from '../views/User'
import NotFound from '../views/NotFound'
import TokenService from "../services/TokenService";
import AddBook from "../views/AddBook";
import Book from "../views/Book";

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'Home page - Book library',
      public: true
    },
    component: Main
  },
  {
    path: '/book/:id',
    name: 'book',
    component: Book,
    meta: {
      public: false
    }
  },
  {
    path: '/add-book',
    name: 'addBook',
    component: AddBook,
    meta: {
      public: false
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      public: true,
      onlyWhenLoggedOut: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      public: true,
      onlyWhenLoggedOut: true
    }
  },
  {
    path: '/account',
    name: 'account',
    component: Account
  },
  {
    path: "*",
    component: NotFound,
    meta: {
      public: true
    }
  }
];

const router = new Router({
  routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public);
  const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut);
  const loggedIn = !!TokenService.getToken();

  if (!isPublic && !loggedIn) {
    return next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  }

  if (loggedIn && onlyWhenLoggedOut) {
    return next('/');
  }

  next();
});

export default router;