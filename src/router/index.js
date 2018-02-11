import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/components/pages/HomePage';
import TestInterface from '@/components/visualization/TestInterface';
import Gallery from '@/components/pages/Gallery';
import FlightSimulator from '@/components/pages/FlightSimulator';
import About from '@/components/pages/About';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
    },
    {
      path: '/flight-simulator',
      name: 'FlightSimulator',
      component: FlightSimulator,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/gallery',
      name: 'Gallery',
      component: Gallery,
    },
    {
      path: '/test',
      name: 'TestInterface',
      component: TestInterface,
    },
  ],
//   mode: 'history',
});


router.afterEach(() => { // ( to, from, next ) are the optional arguments
});

export default router;