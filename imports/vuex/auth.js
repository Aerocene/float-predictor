import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

const authModule = {
  state: {
    user: null,
  },
  mutations: {
    updateUser(state, value) {
      state.user = value;
    },
    isUsernameValid(state, value) {
      state.isUsernameValid = value;
    },
  },
  actions: {
    submitRegisterForm(options, formData) {
      Accounts.createUser(formData, (error) => {
        if (error) {
          console.log(error.reason);
        } else {
          console.log('user registered');
        }
      });
    },
    submitLoginForm(options, formData) {
      Meteor.loginWithPassword(formData.username, formData.password, (error) => {
        if (error) {
          console.log(error.reason);
        } else {
          console.log('user logged in');
        }
      });
    },
    logout() {
      Meteor.logout(() => {
        console.log('user logged out');
      });
    },
  },
};

export default authModule;
