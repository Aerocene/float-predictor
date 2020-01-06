<template>
    <div class="main-content">
      <article class="article" ref="content">
        <signUpForm v-on:success="redirectToQueryLinkOrFlightSimulator" />
        <router-link v-bind:to="`/sign-in?redirect=${$route.query.redirect || '/flight-simulator'}`" class="link-button">I have an account already</router-link>
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
    margin-top: 25vh;
    padding-top: 0px;
    padding-bottom: 0px;
    width: 100%;
    max-width: 100%;
    min-height: 0%;
    padding-bottom: 0%;
  }

  /* .article * {
    width: 100%;
  } */
  
  .link-button {
    margin-top: 1em;
    background: none;
    border: none;
    text-transform: none;
  }
}
.form-container {
  width: 100%;
}
</style>

<script>
/**
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
*/
import { Accounts } from 'meteor/accounts-base';
import signUpForm from '../auth/SignUpForm';
import router from '../../router';

export default {
  name: 'SignUp',
  components: {
    signUpForm,
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    }
  },
  data() {
    return {
      upperHeight: 0,
    };
  },
  created() {
    this.$store.commit('flightSimulator/setVisualizationState', 6);
  },
  mounted() {
    this.upperHeight = `${this.$refs.content.clientHeight}px`;
  },
  methods: {
    redirectToQueryLinkOrFlightSimulator() {
      router.replace(this.$route.query.redirect || '/flight-simulator');
    }
  },
};
</script>
