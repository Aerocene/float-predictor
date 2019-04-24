<template>
  <form @submit.prevent="submitForm">
    <fieldset>
      <label>new password</label>
      <input type="password" required minlength="8" v-model="formData.newPassword" placeholder="min. 8 characters" />
      <footer class="form-text text-danger" v-show="lastSessionError">{{lastSessionError && lastSessionError.reason}}</footer>
    </fieldset>
    <button>Reset password</button>
  </form>
</template>

<style lang="scss" scoped>
  @import './SessionForm.scss';
</style>

<script>
import router from '../../router';
import { Accounts } from 'meteor/accounts-base';
import { resetPassword } from '../../vuex/auth';

let lastToken;
Accounts.onResetPasswordLink((token, done) => {
  lastToken = token;
})

export default {
  mounted() {
    this.$store.commit('auth/setLastSessionError', null);
  },
  computed: {
    lastSessionError() {
      return this.$store.state.auth.lastSessionError;
    }
  },
  data() {
    return {
      formData: {
        token: lastToken,
        newPassword: '',
      }
    }
  },
  methods: {
    submitForm() {
      this.$store.commit('auth/setLastSessionError', null);
      return resetPassword(this.formData.token, this.formData.newPassword)
        .then(() => { this.$emit('success'); })
        .catch((error) => { this.$store.commit('auth/setLastSessionError', error); });
    }
  }
}
</script>
