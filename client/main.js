/**
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
*/

import { Meteor } from 'meteor/meteor';
import { Vue } from 'meteor/akryum:vue';
import VueMatomo from 'vue-matomo';

// import Vue from 'vue';
// import VueNativeSock from 'vue-native-websocket';
import BootstrapVue from 'bootstrap-vue';
import BootstrapCSS from 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapVueCSS from 'bootstrap-vue/dist/bootstrap-vue.min.css';
import InfiniteScroll from 'vue-infinite-scroll';
import vbclass from 'vue-body-class';
import SocialSharing from 'vue-social-sharing';
import VuejsDialog from 'vuejs-dialog';
import router from '../imports/router';
import App from '../imports/App.vue';
import store from '../imports/store';

// Vue.use(VueNativeSock, 'ws://localhost:1337', { reconnection: true, format: 'json' });


Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(BootstrapCSS);
Vue.use(BootstrapVueCSS)
Vue.use(InfiniteScroll);
Vue.use(VuejsDialog);
Vue.use(vbclass, router);
Vue.use(SocialSharing);

Vue.use(VueMatomo, {
  host: Meteor.settings.matomo.host,
  siteId: Meteor.settings.matomo.siteId,
  trackerFileName: 'matomo',
  router: router,
  enableLinkTracking: true,
  requireConsent: false,
  trackInitialView: true,
  disableCookies: true,
  enableHeartBeatTimer: true,
  heartBeatTimerInterval: 15,
  debug: false,
  userId: undefined,
  cookieDomain: undefined,
  domains: undefined,
  preInitActions: []
});

Meteor.startup(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    // components: { App },
    // template: '<App/>',
    render: h => h(App),
  });
});
