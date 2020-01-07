<template>
    <div class="main-content">
      <article role="article" class="article" ref="content">
        <!-- <forgotPasswordForm v-on:success="redirectToSignIn" /> -->

        <form class="session-form" @submit.prevent="submitForm">

          <fieldset class="fieldset-class">
            <!-- <label>email</label>
            <input type="email" required v-model="formData.email" placeholder="email@example.com" /> -->
            <b-form-input 
              ref="forgotEmailField"
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

        <button 
          class="link-button"
          @click="gotoSignIn"
        >
          Back to sign in
        </button>

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
    margin-top: 1em;
    background: none;
    border: none;
  }



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
  background: rgba(74, 144, 226, 0.3928);
  border-radius: 9px;
  border: none;
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
// import forgotPasswordForm from '../auth/ForgotPasswordForm'
import router from '../../router';

export default {
  name: 'ForgotPassword',
  // components: {
  //   forgotPasswordForm,
  // },
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
      upperHeight: 0,
    };
  },
  created() {
    // this.$store.commit('flightSimulator/setVisualizationState', 6);
  },
  mounted() {
    this.upperHeight = `${this.$refs.content.clientHeight}px`;
  },
  data() {
    return {
      formData: {
        email: this.$store.state.auth.userEmail
      }
    }
  },
  methods: {
    redirectToSignIn() {
      router.replace('/sign-in');
    },
    submitForm() {
      this.$store.commit('auth/setLastSessionError', null);
      return forgotPassword(this.formData)
        .then(() => { 
          this.redirectToSignIn();
        })
        .catch((error) => { this.$store.commit('auth/setLastSessionError', error); });
    },
    gotoSignIn() {
      // store email
      // this.$store.commit('auth/setUserEmail', this.$refs.forgotEmailField.value);
      router.push(`/sign-in?redirect=${this.$route.query.redirect || '/flight-simulator'}`);
    }
  },
};
</script>
