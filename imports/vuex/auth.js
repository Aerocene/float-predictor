import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import wrapInPromise from './wrapInPromise';

const createUser = wrapInPromise(Accounts.createUser.bind(Accounts));
const loginWithPassword = wrapInPromise(Meteor.loginWithPassword.bind(Meteor));
const forgotPassword = wrapInPromise(Accounts.forgotPassword.bind(Accounts));
const changePassword = wrapInPromise(Accounts.changePassword.bind(Accounts));
const resetPassword = wrapInPromise(Accounts.resetPassword.bind(Accounts));
const logout = wrapInPromise(Accounts.logout.bind(Accounts));

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
    submitRegisterForm(options, formData) {
      return createUser(formData)
        .catch((error) => { this.commit('auth/setLastSessionError', error); });
    },
    submitLoginForm(options, formData) {
      return loginWithPassword(formData.username, formData.password)
        .catch((error) => { this.commit('auth/setLastSessionError', error); });
    },
    submitForgotPasswordForm(options, formData) {
      return forgotPassword(formData)
        .catch((error) => { this.commit('auth/setLastSessionError', error); });
    },
    submitResetPasswordForm(options, formData) {
      return resetPassword(formData.token, formData.newPassword)
        .catch((error) => { this.commit('auth/setLastSessionError', error); });
    },
    submitChangePasswordForm(options, formData) {
      return changePassword(formData.oldPassword, formData.newPassword)
        .catch((error) => { this.commit('auth/setLastSessionError', error); });
    },
    logout() {
      return logout()
        .catch((error) => { this.commit('auth/setLastSessionError', error); });
    },
  },
};

export default authModule;
