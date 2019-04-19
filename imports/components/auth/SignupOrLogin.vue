<template>
  <div class="session-dialog">
    <div v-if="user">
      <p>You are logged in as {{user && user.emails && user.emails[0] && user.emails[0].address}}.</p>
      <logout v-if="user"></logout>
    </div>
    <div class="auth" v-if="!user">
      <login></login>
      <register></register>
    </div>
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

<style lang="scss" scoped>
  .session-dialog {
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .auth > div {
    display: inline-flex;
  }
  .auth > div:first-child {
    padding-right: 1rem;
  }
  input, label {
    display: block;
  }
</style>