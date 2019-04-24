<template>
  <form @submit.prevent="submitForm">
    <fieldset>
      <label>old password</label>
      <input type="password" required v-model="formData.oldPassword" />
      <footer class="form-text text-danger" v-show="lastSessionError">{{lastSessionError && lastSessionError.reason}}</footer>
    </fieldset>
    <fieldset>
      <label>new password</label>
      <input type="password" required minlength="8" v-model="formData.newPassword" />
    </fieldset>
    <button>Change password</button>
  </form>
</template>

<style lang="scss" scoped>
  @import './SessionForm.scss';
</style>


<script>
import { Accounts } from 'meteor/accounts-base';

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
        oldPassword: '',
        newPassword: '',
      }
    }
  },
  methods: {
    submitForm() {
      this.$store.dispatch('auth/submitChangePasswordForm', this.formData)
    }
  }
}
</script>
