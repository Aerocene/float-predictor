<template>
  <form class="session-form" @submit.prevent="submitForm">
    
    <fieldset class="fieldset-class">
      <b-form-input 
        ref="signUpEmailInput"
        class="form-input"
        id="sign-up-field-email"
        type="email" 
        required 
        v-model="formData.email" 
        placeholder="E-mail *" />
      <footer class="form-text text-danger" v-show="lastSessionError">{{lastSessionError && lastSessionError.reason}}</footer>
    </fieldset>

    <fieldset class="fieldset-class">
      <b-form-input 
        ref="signUpPwdInput"
        class="form-input"
        type="password" 
        required 
        minlength="8" 
        v-model="formData.password" 
        placeholder="Password *" />
    </fieldset>

    <fieldset class="fieldset-class">
      <b-form-input 
        ref="signUpNameInput"
        class="form-input"
        v-model="formData.profile.name" 
        placeholder="Name" />
    </fieldset>

    <fieldset class="fieldset-class">
      <div style="display: table;">

        <b-form-checkbox
          class="form-input"
          name="terms-validation"
          required
          style="display: table-cell;"
        >
        </b-form-checkbox>


        <!-- <router-link v-bind:to="`/sign-up-terms?redirect=${$route.query.redirect || '/flight-simulator'}`" class="link-button">I have an account already</router-link> -->
        <span class="terms-link" @click="showTerms">I agree to the terms *</span>

      </div>
    </fieldset>

    <button type="submit" class="signup-button">Sign up</button>

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

.terms-link {
  display: table-cell; 
  vertical-align: middle;
  text-decoration: underline;
}

.signup-button {
  margin-top: 1em;
  text-transform: none;
  background: rgba(74, 144, 226, 0.3928);
  border-radius: 9px;
  border: none;
  min-height: 37px;
}
</style>

<script>
import router from '../../router';
import { createUser } from '../../vuex/auth';

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
        email: this.$store.state.auth.userEmail,
        password: this.$store.state.auth.signupPassword,
        profile: {
          name: this.$store.state.auth.signupName,
          location: '',
          description: '',
          permissions: {
            show_profile: false,
            show_location: false,
            show_flights: false,
            show_description: false
          }
        }
      }
    }
  },
  methods: {
    submitForm() {
      this.$store.commit('auth/setLastSessionError', null);
      createUser(this.formData)
        .then(() => { this.$emit('success'); })
        .catch((error) => { this.$store.commit('auth/setLastSessionError', error); })
    },
    showTerms() {      
      this.$store.commit('auth/setUserEmail', this.$refs.signUpEmailInput.value);
      this.$store.commit('auth/setSignupPassword', this.$refs.signUpPwdInput.value);
      this.$store.commit('auth/setSignupName', this.$refs.signUpNameInput.value);
      router.push(`/sign-up-terms?redirect=${this.$route.query.redirect || '/flight-simulator'}`);    
    }
  }
}
</script>
