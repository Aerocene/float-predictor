<template>
  <form class="session-form" @submit.prevent="submitForm">
    <fieldset>
      <label>new password</label>
      <input type="password" required minlength="8" v-model="formData.newPassword" placeholder="min. 8 characters" />
      <footer class="form-text text-danger" v-show="lastSessionError">{{lastSessionError && lastSessionError.reason}}</footer>
    </fieldset>
    <button>Reset password</button>
  </form>
</template>

<style lang="scss">
  @import './Form.scss';
</style>

<script>
import router from '../../router';
import { Accounts } from 'meteor/accounts-base';
import { resetPassword } from '../../vuex/auth';

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
        token: this.$store.state.auth.resetPasswordToken,
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
