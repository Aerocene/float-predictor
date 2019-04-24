<template>
    <div class="main-content" :style="{ height: upperHeight }">
      <article role="article" class="article" ref="content">
        <signUpForm v-on:success="redirectToQueryLinkOrFlightSimulator" />
        <router-link v-bind:to="`/sign-in?redirect=${$route.query.redirect || '/flight-simulator'}`" class="link-button">I have an account already</router-link>
      </article>
    </div>
</template>

<style lang="scss" scoped>
  .main-content {
    text-align: center;
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
