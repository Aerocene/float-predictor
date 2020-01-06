<template>
    <div class="main-content">
      <article role="article" class="article" ref="content">
        <div style="width: 100%;">
          <signInForm v-on:success="redirectToQueryLinkOrFlightSimulator">            
          </signInForm>
          <button
            class="link-button forgot-button" 
            @click="showForgotPwd"
          >
            Forgot
          </button>

        </div>

        <button 
          class="link-button" 
          @click="doCreateAccount"
        >
          Create an account
        </button>

        <!-- <router-link v-bind:to="`/sign-up?redirect=${$route.query.redirect || '/flight-simulator'}`" class="link-button">Create an account</router-link> -->
        
      </article>
    </div>
</template>

<style lang="scss" scoped>
.main-content {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 20;
  padding-left: 3em;
  padding-right: 3em;
  overflow-y: scroll;

  /* background: #000000bb; */
  text-align: left;
  display: flex;
  flex-direction: column;
  /* justify-content: end; */


  .article {
    padding-top: 0px;
    margin-top: 40vh;
    width: 100%;
    max-width: 100%;
    min-height: 0%;
    padding-bottom: 0%;
  }

  /* .article * {
    width: 100%;
  } */

  .link-button {
    text-transform: none;
    margin-top: 0.0em;
    background: none;
    border: none;
  }
  .forgot-button {
    position: absolute;
    top: 4.7em;
    right: 0px;
    color: #9A1818;
    padding-right: 0px;
    margin-right: 0px;
    font-size: 12px;
  }
}
</style>

<script>
/**
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
*/
import { Accounts } from 'meteor/accounts-base';
import signInForm from '../auth/SignInForm';
import router from '../../router';
import Util from '../visualization/Util'

export default {
  name: 'SignIn',
  components: {
    signInForm,
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
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
    };
  },
  created() {
    this.$store.commit('flightSimulator/setVisualizationState', 6);

    // console.log("INSTALL KEYBOARD LISTENER");  
    // window.addEventListener('native.hidekeyboard', this.keyboardHideHandler);
  },
  mounted() {
    this.upperHeight = `${this.$refs.content.clientHeight}px`;
    this.$store.commit('auth/setLastSessionError', null);
  },
  methods: {
    keyboardHideHandler() {
      console.log("keyboardHideHandler");
      
    },
    redirectToQueryLinkOrFlightSimulator() {
      router.replace(this.$route.query.redirect || '/flight-simulator');
    },
    showForgotPwd() {
      this.$store.commit('auth/setUserEmail', document.getElementById("sign-in-field-email").value);
      router.push(`/forgot-password?redirect=${this.$route.query.redirect || '/flight-simulator'}`);
    },
    doCreateAccount() {
      this.$store.commit('auth/setUserEmail', document.getElementById("sign-in-field-email").value);
      router.push(`/sign-up?redirect=${this.$route.query.redirect || '/flight-simulator'}`);
    },
    submitForm() {
      this.$store.commit('auth/setLastSessionError', null);
      loginWithPassword(this.formData.username, this.formData.password)
        .then(() => { 
          // this.$emit('success');
          this.redirectToQueryLinkOrFlightSimulator();
        })
        .catch((error) => { this.$store.commit('auth/setLastSessionError', error); });
    },    
  },
};
</script>
