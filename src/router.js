import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      // lazy-loaded
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/absensi',
      name: 'absensi',
      // lazy-loaded
      component: () => import('./views/ListAbsen.vue')
    },
    {
      path: '/datasiswa',
      name: 'datasiswa',
      // lazy-loaded
      component: () => import('./views/ListSiswa.vue')
    },
    {
      path: '/addsiswa',
      name: 'addsiswa',
      // lazy-loaded
      component: () => import('./views/AddSiswa.vue')
    },
    {
      path: "/edit",
      name: "edit",
      component: () => import("./views/Edit.vue")
    },
    {
      path: "/absen",
      name: "absen",
      component: () => import("./views/Absen.vue")
    },
    {
      path: '/mod',
      name: 'moderator',
      // lazy-loaded
      component: () => import('./views/BoardModerator.vue')
    },
    {
      path: '/user',
      name: 'user',
      // lazy-loaded
      component: () => import('./views/BoardUser.vue')
    },
    {
      path: '/map',
      name: 'map',
      // lazy-loaded
      component: () => import('./views/Map.vue')
    },
    {
      path: '/jabal',
      name: 'jabal',
      // lazy-loaded
      component: () => import('./views/Profilku.vue')
    },
    {
      path: '/rizal',
      name: 'rizal',
      // lazy-loaded
      component: () => import('./views/Profil.vue')
    },
    {
      path: '/coba',
      name: 'coba',
      // lazy-loaded
      component: () => import('./views/Coba.vue')
    }
  ]
});

