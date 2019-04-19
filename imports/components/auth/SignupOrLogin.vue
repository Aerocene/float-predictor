<template>
  <div v-if="!user" class="session-dialog">
    <img class="logo" src="/img/float_predictor_logo.svg" alt="float predictor">
    <!-- <div v-if="user">
      <p>You are logged in as {{user && user.emails && user.emails[0] && user.emails[0].address}}.</p>
      <logout v-if="user"></logout>
    </div> -->
    <login></login>
    <register></register>
  </div>
</template>

<script>
import Login from './Login'
import Logout from './Logout'
import Register from './Register'

export default {
  components: {
    login: Login,
    logout: Logout,
    register: Register
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    }
  }
}
</script>

<style lang="scss">
  .session-dialog {
    background: rgba(0, 0, 0, 0.9);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    padding-top: 32px;

    z-index: 1000;

    font-size: 16px;

    .logo {
      width: 100px;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    text-align: center;
  }

  button {
    background-color: #111;
    color: white;
    padding: 8px 16px;
  }

  input, label {
    display: block;
  }

  input {
    font-size: 20px;
    line-height: 32px;
  }
</style>