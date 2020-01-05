/**
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
*/

import { Meteor } from 'meteor/meteor';
import { Vue } from 'meteor/akryum:vue';

// import Vue from 'vue';
// import VueNativeSock from 'vue-native-websocket';
import BootstrapVue from 'bootstrap-vue';
import BootstrapCSS from 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapVueCSS from 'bootstrap-vue/dist/bootstrap-vue.min.css';
import InfiniteScroll from 'vue-infinite-scroll';
import vbclass from 'vue-body-class';
import VueAnalytics from 'vue-analytics';
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
Vue.use(VueAnalytics, {
  id: 'UA-25554902-10',
});
Vue.use(SocialSharing);


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
