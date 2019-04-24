<template>
  <form @submit.prevent="submitForm">
    <!-- <h3>Login</h3> -->
    <fieldset>
      <label>email</label>
      <input type="email" required v-model="formData.username" />
      <footer class="form-text text-danger" v-show="lastSessionError">{{lastSessionError && lastSessionError.reason}}</footer>
    </fieldset>
    <fieldset>
      <label>password</label>
      <input type="password" required minlength="8" v-model="formData.password" />
    </fieldset>
    <button>Login</button>
  </form>
</template>

<style lang="scss" scoped>
  @import './SessionForm.scss';
</style>

<script>
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
      this.$store.dispatch('auth/submitLoginForm', this.formData)
    }
  }
}
</script>
