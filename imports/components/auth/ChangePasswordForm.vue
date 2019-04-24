<template>
  <form @submit.prevent="submitForm">
    <fieldset>
      <label>old password</label>
      <input type="password" required v-model="formData.oldPassword" />
      <footer class="form-text text-danger" v-show="lastSessionError">{{lastSessionError && lastSessionError.reason}}</footer>
    </fieldset>
    <fieldset>
      <label>new password</label>
      <input type="password" required minlength="8" v-model="formData.newPassword" placeholder="min. 8 characters" />
    </fieldset>
    <button>Change password</button>
  </form>
</template>

<style lang="scss" scoped>
  @import './SessionForm.scss';
</style>


<script>
import router from '../../router';
import { Accounts } from 'meteor/accounts-base';
import { changePassword } from '../../vuex/auth';

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
      this.$store.commit('auth/setLastSessionError', null);
      return changePassword(this.formData.oldPassword, this.formData.newPassword)
        .then(() => { this.$emit('success'); })
        .catch((error) => { this.$store.commit('auth/setLastSessionError', error); });
  }
  }
}
</script>
