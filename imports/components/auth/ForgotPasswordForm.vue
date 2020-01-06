<template>
  <form class="session-form" @submit.prevent="submitForm">

    <fieldset class="fieldset-class">
      <!-- <label>email</label>
      <input type="email" required v-model="formData.email" placeholder="email@example.com" /> -->
      <b-form-input 
        class="form-input"
        id="forgot-field-email"
        type="email" 
        required 
        v-model="formData.username" 
        placeholder="E-mail"/>

      <footer class="form-text text-danger" v-show="lastSessionError">{{lastSessionError && lastSessionError.reason}}</footer>
    </fieldset>

    <button class="signin-button">Send password reset</button>
    
  </form>
</template>

<style lang="scss" scoped>

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
  margin-top: 1em;
  text-transform: none;
  background: #41254F;
  border-radius: 9px;
  border: none;
}


</style>

<script>
import router from '../../router';
import { forgotPassword } from '../../vuex/auth';

export default {
  mounted() {
    this.$store.commit('auth/setLastSessionError', null);
    // this.formData.email = this.$store.state.auth.userEmail;
    
  },
  computed: {
    lastSessionError() {
      return this.$store.state.auth.lastSessionError;
    }
  },
  data() {
    return {
      formData: {
        email: this.$store.state.auth.userEmail
      }
    }
  },
  methods: {
    submitForm() {
      this.$store.commit('auth/setLastSessionError', null);
      return forgotPassword(this.formData)
        .then(() => { this.$emit('success'); })
        .catch((error) => { this.$store.commit('auth/setLastSessionError', error); });
    }
  }
}
</script>
