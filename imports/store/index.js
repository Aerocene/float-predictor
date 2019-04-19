/**
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
*/

import Vuex from 'vuex';
import Vue from 'vue';
import general from './modules/general';
import flightSimulator from './modules/flightSimulator';
import authModule from '../vuex/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    general,
    flightSimulator,
    auth: authModule,
    users: [],
  },
  // plugins: [createPersistedState({paths: ['filters', 'visualization']})]
  mutations: {
    updateUsers(state, value) {
      console.log('users state mutated');
      state.users = value;
    },
  },
});

