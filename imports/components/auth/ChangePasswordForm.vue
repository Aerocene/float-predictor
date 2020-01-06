<template>
  <form class="session-form" @submit.prevent="submitForm">

    <fieldset class="fieldset-class">
      <!-- <label>old password</label>
      <input type="password" required v-model="formData.oldPassword" /> -->
      <b-form-input 
        class="form-input"
        id="sign-in-field-pwd"
        type="password" 
        required 
        minlength="8" 
        v-model="formData.oldPassword" 
        placeholder="Old password" />
      <footer class="form-text text-danger" v-show="lastSessionError">{{lastSessionError && lastSessionError.reason}}</footer>
    </fieldset>
    
    <fieldset class="fieldset-class">
      <!-- <label>new password</label>
      <input type="password" required minlength="8" v-model="formData.newPassword" placeholder="min. 8 characters" />
       -->
       <b-form-input 
        class="form-input"
        id="sign-in-field-pwd"
        type="password" 
        required 
        minlength="8" 
        v-model="formData.newPassword" 
        placeholder="New password" />
    </fieldset>

    <button class="form-submit-button">Change password</button>

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

.form-submit-button {
  margin-top: 1em;
  text-transform: none;
  background: #41254F;
  border-radius: 9px;
  border: none;
}

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
