/**
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
*/
import Vue from 'vue';
import Router from 'vue-router';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

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
import SignUpTerms from '../components/pages/SignUpTerms.vue';

import DeleteAccount from '../components/pages/DeleteAccount.vue';
import ProfileSettings from '../components/pages/ProfileSettings.vue';

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
        bodyClass: 'sign-up no-scroll',
        position: 'middle',
        requiresLoggedOutState: true,
      },
    },
    {
      path: '/sign-up-terms',
      name: 'signUpTerms',
      component: SignUpTerms,
      meta: {
        bodyClass: 'sign-up no-scroll',
        position: 'middle',
        requiresLoggedOutState: true,
      },
    },
    {
      path: '/sign-in',
      name: 'signIn',
      component: SignIn,
      meta: {
        bodyClass: 'sign-in no-scroll',
        position: 'middle',
        requiresLoggedOutState: true,
      },
    },
    {
      path: '/delete-account',
      name: 'deleteAccount',
      component: DeleteAccount,
      meta: {
        bodyClass: 'delete-account no-scroll',
        position: 'middle',
        requiresAuth: true,
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        bodyClass: 'profile no-scroll',
        position: 'middle',
        requiresAuth: true,
      },
    },
    {
      path: '/profile-settings',
      name: 'profileSettings',
      component: ProfileSettings,
      meta: {
        bodyClass: 'profileSettings no-scroll',
        position: 'middle',
        requiresAuth: true,
      },
    },
    {
      path: '/change-password',
      name: 'changePassword',
      component: ChangePassword,
      meta: {
        bodyClass: 'change-password no-scroll',
        position: 'middle',
        requiresAuth: true,
      },
    },
    {
      path: '/reset-password',
      name: 'resetPassword',
      component: ResetPassword,
      meta: {
        bodyClass: 'reset-password no-scroll',
        position: 'middle',
        requiresLoggedOutState: true,
      },
    },
    {
      path: '/forgot-password',
      name: 'forgotPassword',
      component: ForgotPassword,
      meta: {
        bodyClass: 'forgot-password no-scroll',
        position: 'middle',
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
      path: '/globe-archive',
      name: 'globe-archive',
      meta: {
        bodyClass: 'no-scroll',
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
        path: '/sign-in',
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
  const fromMiddle = from.matched.some(m => m.meta.position === 'middle');

  const toTop = to.matched.some(m => m.meta.position === 'top');
  const toBottom = to.matched.some(m => m.meta.position === 'bottom');
  const toMiddle = to.matched.some(m => m.meta.position === 'middle');

  let transitionName = 'fade';
  let transitionMode = '';
  
  if (fromMiddle)
  { 
    // From Middle
    if (toBottom)
    {
      // STATE_UNFOCUSED_GALLERY = 7;
      store.commit('flightSimulator/setVisualizationState', 7);

      transitionName = 'middle-to-bottom';
      transitionMode = 'out-in';
    } 
    else if (toTop) 
    {
      // STATE_INITIAL = 8;
      store.commit('flightSimulator/setVisualizationState', 8);
      transitionName = 'fade-middle-to-top';
    }

    // STATE_ANIMATION_IDLE = 0;
    store.commit('flightSimulator/setFocusedExplorer', 0);
  } 
  else if (fromTop)
  { 
    // From Top
    if (toMiddle)
    {
      transitionName = 'top-to-middle';
    } 
    else if (toBottom)
    {
      transitionName = 'top-to-bottom';
      transitionMode = 'out-in';


      // STATE_UNFOCUSED_GALLERY = 7;
      store.commit('flightSimulator/setVisualizationState', 7);
    } else {
      transitionMode = 'out-in';
    }
  } 
  else if (fromBottom) 
  { 
    // From Bottom
    if (toTop) {
      transitionName = 'bottom-to-top';
      transitionMode = 'out-in';

      // STATE_UNFOCUSED_PAGES = 6;
      store.commit('flightSimulator/setVisualizationState', 6);
    } else if (toMiddle) {
      transitionName = 'bottom-to-middle';
    }
  }

  // if to middle we need some logic to change the viz state
  if (toMiddle)
  {
    if (store.state.general.isChoosingDestination)
    {
      // STATE_UNFOCUSED = 5;
      store.commit('flightSimulator/setVisualizationState', 5);
    } 
    else
    {
      // STATE_ANIMATION_ACTIVE = 2;
      store.commit('flightSimulator/setVisualizationState', 2);
      store.commit('flightSimulator/setPlaying', true);
    }
  }

  // some overwrites for particular cases
  if (from.name === 'home-page' && 
      to.name === 'flight-simulator' && 
      store.state.general.isChoosingDestination)
  {
    transitionName = 'fade-form-from-top';
    transitionMode = '';
  }

  if (to.path === '/flight-simulator')
  {
    // STATE_INITIAL = 8;
    store.commit('flightSimulator/setVisualizationState', 8);
  }
  if (to.path === '/globe-archive')
  {
    // to globe archive
    store.commit('flightSimulator/setVisualizationState', 10);
  }
  if (to.path === '/profile')
  {
    // to globe archive
    store.commit('flightSimulator/setVisualizationState', 11);
  }

  store.commit('general/setTransition', transitionName);
  store.commit('general/setTransitionMode', transitionMode);

  next();
});

Accounts.onResetPasswordLink((token, done) => {
  store.commit('auth/setResetPasswordToken', token);
  store.commit('auth/setResetPasswordDoneFunction', done);
  router.push('/reset-password');
});


export default router;
