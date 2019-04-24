/**
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
*/
import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index';
import HomePage from '../components/pages/HomePage.vue';
import GUI from '../components/pages/GUI.vue';
import TestInterface from '../components/visualization/TestInterface.vue';

import Gallery from '../components/pages/Gallery.vue';
import FlightSimulator from '../components/pages/FlightSimulator.vue';
import About from '../components/pages/About.vue';
import AeroceneExplorer from '../components/pages/AeroceneExplorer.vue';
import Resources from '../components/pages/Resources.vue';
import Profile from '../components/pages/Profile.vue';
import ChangePassword from '../components/pages/ChangePassword.vue';
import ForgotPassword from '../components/pages/ForgotPassword.vue';
import ResetPassword from '../components/pages/ResetPassword.vue';
import SignIn from '../components/pages/SignIn.vue';
import SignUp from '../components/pages/SignUp.vue';
import DeleteAccount from '../components/pages/DeleteAccount.vue';
import { Meteor } from 'meteor/meteor';


Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: HomePage,
      meta: {
        bodyClass: 'home no-scroll',
        position: 'middle',
      },
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: SignUp,
      meta: {
        bodyClass: 'sign-up upper-content',
        position: 'top',
        requiresLoggedOutState: true,
      },
    },
    {
      path: '/sign-in',
      name: 'signIn',
      component: SignIn,
      meta: {
        bodyClass: 'sign-in upper-content',
        position: 'top',
        requiresLoggedOutState: true,
      },
    },
    {
      path: '/delete-account',
      name: 'deleteAccount',
      component: DeleteAccount,
      meta: {
        bodyClass: 'delete-account upper-content',
        position: 'top',
        requiresAuth: true,
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        bodyClass: 'profile upper-content',
        position: 'top',
        requiresAuth: true,
      },
    },
    {
      path: '/change-password',
      name: 'changePassword',
      component: ChangePassword,
      meta: {
        bodyClass: 'change-password upper-content',
        position: 'top',
        requiresAuth: true,
      },
    },
    {
      path: '/reset-password',
      name: 'resetPassword',
      component: ResetPassword,
      meta: {
        bodyClass: 'reset-password upper-content',
        position: 'top',
        requiresLoggedOutState: true,
      },
    },
    {
      path: '/forgot-password',
      name: 'forgotPassword',
      component: ForgotPassword,
      meta: {
        bodyClass: 'forgot-password upper-content',
        position: 'top',
        requiresLoggedOutState: true,
      },
    },
    {
      path: '/gui',
      name: 'gui',
      component: GUI,
      meta: {
        bodyClass: 'home no-scroll',
        position: 'middle',
      },
    },
    {
      path: '/flight-simulator',
      name: 'flight-simulator',
      component: FlightSimulator,
      meta: {
        bodyClass: 'flight-simulator no-scroll',
        position: 'middle',
        requiresAuth: true,
      },
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        bodyClass: 'about upper-content',
        position: 'top',
      },
    },
    {
      path: '/aerocene-explorer',
      name: 'aerocene-explorer',
      component: AeroceneExplorer,
      meta: {
        bodyClass: 'aerocene-explorer upper-content',
        position: 'top',
        requiresAuth: true,
      },
    },
    {
      path: '/aeroglyphs-archive',
      name: 'gallery',
      component: Gallery,
      meta: {
        bodyClass: 'gallery',
        position: 'bottom',
        requiresAuth: true,
      },
    },
    {
      path: '/resources-and-api',
      name: 'resources-and-api',
      component: Resources,
      meta: {
        bodyClass: 'resources-and-api upper-content',
        position: 'top',
        requiresAuth: true,
      },
    },
    {
      path: '/test',
      name: 'TestInterface',
      component: TestInterface,
    },
  ],
});


// Ensure user is logged in before they can access routes that need authorization
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!Meteor.userId()) {
      next({
        path: '/sign-up',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresLoggedOutState)) {
    if (Meteor.userId()) {
      next({
        path: to.query.redirect || '/',
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

router.beforeEach((to, from, next) => {
  const fromTop = from.matched.some(m => m.meta.position === 'top');
  const fromBottom = from.matched.some(m => m.meta.position === 'bottom');
  const toTop = to.matched.some(m => m.meta.position === 'top');
  const toBottom = to.matched.some(m => m.meta.position === 'bottom');
  const toMiddle = to.matched.some(m => m.meta.position === 'middle');
  const fromMiddle = from.matched.some(m => m.meta.position === 'middle');

  let transitionName = 'fade';
  let transitionMode = '';

  if (fromMiddle) { // From Middle
    if (toBottom) {
      store.commit('flightSimulator/setVisualizationState', 7); // start to move the earth
      transitionName = 'middle-to-bottom';
      transitionMode = 'out-in';
    } else if (toTop) {
      transitionName = 'fade-middle-to-top';
    }
    store.commit('flightSimulator/setFocusedExplorer', 0);
  } else if (fromTop) { // From Top
    if (toMiddle) {
      transitionName = 'top-to-middle';
    } else if (toBottom) {
      transitionName = 'top-to-bottom';
      transitionMode = 'out-in';
      store.commit('flightSimulator/setVisualizationState', 7);
    } else {
      transitionMode = 'in-out';
    }
  } else if (fromBottom) { // From Bottom
    if (toTop) {
      transitionName = 'bottom-to-top';
      transitionMode = 'out-in';
      store.commit('flightSimulator/setVisualizationState', 6);
    } else if (toMiddle) {
      transitionName = 'bottom-to-middle';
    }
  }
  // if to middle we need some logic to change the viz state
  if (toMiddle) {
    if (store.state.general.isChoosingDestination) {
      store.commit('flightSimulator/setVisualizationState', 5); // start to move the earth
    } else {
      store.commit('flightSimulator/setVisualizationState', 2);
      store.commit('flightSimulator/setPlaying', true);
    }
  }
  // some overwrites for particular cases
  if (from.name === 'home-page'
    && (to.name === 'flight-simulator' && store.state.general.isChoosingDestination)) {
    transitionName = 'fade-form-from-top';
    transitionMode = '';
  }

  store.commit('general/setTransition', transitionName);
  store.commit('general/setTransitionMode', transitionMode);

  next();
});

export default router;
