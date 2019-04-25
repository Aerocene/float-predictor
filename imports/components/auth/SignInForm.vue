<template>
  <form @submit.prevent="submitForm">
    <!-- <h3>Login</h3> -->
    <fieldset>
      <label>email</label>
      <input type="email" required v-model="formData.username" placeholder="email@example.com" />
      <footer class="form-text text-danger" v-show="lastSessionError">{{lastSessionError && lastSessionError.reason}}</footer>
    </fieldset>
    <fieldset>
      <label>password</label>
      <input type="password" required minlength="8" v-model="formData.password" placeholder="min. 8 characters" />
    </fieldset>
    <button>Login</button>
  </form>
</template>

<style lang="scss" scoped>
  @import './Form.scss';
</style>

<script>
import router from '../../router';
import { loginWithPassword } from '../../vuex/auth';

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
        username: '',
        password: ''
      }
    }
  },
  methods: {
    submitForm() {
      this.$store.commit('auth/setLastSessionError', null);
      loginWithPassword(this.formData.username, this.formData.password)
        .then(() => { this.$emit('success'); })
        .catch((error) => { this.$store.commit('auth/setLastSessionError', error); });
    }
  }
}
</script>
