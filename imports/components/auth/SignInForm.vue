<template>
  <form class="session-form" @submit.prevent="submitForm">

    <fieldset class="fieldset-class">
      <b-form-input 
        class="form-input"
        id="sign-in-field-email"
        type="email" 
        required 
        v-model="formData.username" 
        placeholder="E-mail"/>
      <footer class="form-text text-danger" v-show="lastSessionError">{{lastSessionError && lastSessionError.reason}}</footer>
    </fieldset>

    <fieldset class="fieldset-class">
      <b-form-input 
        class="form-input"
        id="sign-in-field-pwd"
        type="password" 
        required 
        minlength="8" 
        v-model="formData.password" 
        placeholder="Password" />
    </fieldset>

    <button class="signin-button">Sign in</button>
    
  </form>
</template>

<style scoped>
.session-form {
  width: 100%;
}

.form-input {
  text-align: left;
  color: white;
  font-size: 18px;
  border-bottom-color: white;
}
.form-input:focus {
  border-bottom-color: white;
  color: white;
}

.fieldset-class {
  width: 100%
}

.signin-button {
  margin-top: 0em;
  text-transform: none;
  background: rgba(74, 144, 226, 0.3928);
  border-radius: 9px;
  border: none;
  min-height: 37px;
}

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
        username: this.$store.state.auth.userEmail,
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
