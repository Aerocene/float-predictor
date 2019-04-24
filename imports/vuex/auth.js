import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import wrapInPromise from './wrapInPromise';

export const createUser = wrapInPromise(Accounts.createUser.bind(Accounts));
export const loginWithPassword = wrapInPromise(Meteor.loginWithPassword.bind(Meteor));
export const forgotPassword = wrapInPromise(Accounts.forgotPassword.bind(Accounts));
export const changePassword = wrapInPromise(Accounts.changePassword.bind(Accounts));
export const resetPassword = wrapInPromise(Accounts.resetPassword.bind(Accounts));
export const logout = wrapInPromise(Accounts.logout.bind(Accounts));

const authModule = {
  namespaced: true,
  state: {
    user: null,
    lastSessionError: null,
  },
  mutations: {
    updateUser(state, value) {
      state.user = value;
    },
    isUsernameValid(state, value) {
      state.isUsernameValid = value;
    },
    setLastSessionError(state, value) {
      state.lastSessionError = value;
    },
  },
  actions: {
  },
};

export default authModule;
