<template>
  <form @submit.prevent="submitForm">
    <!-- <h3>Get started!</h3> -->
    <fieldset>
      <label>email</label>
      <input type="email" required v-model="formData.email"/>
      <footer class="form-text text-danger" v-show="lastSessionError">{{lastSessionError && lastSessionError.reason}}</footer>
    </fieldset>
    <fieldset>
      <label>password</label>
      <input type="password" required minlength="8" v-model="formData.password" />
    </fieldset>
    <button>Register</button>
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
        email: '',
        password: ''
      }
    }
  },
  methods: {
    submitForm() {
      this.$store.dispatch('auth/submitRegisterForm', this.formData);
    }
  }
}
</script>
