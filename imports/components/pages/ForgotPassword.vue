<template>
    <div class="main-content" :style="{ height: upperHeight }">
      <article role="article" class="article" ref="content">
        <forgotPasswordForm v-on:success="redirectToSignIn" />
        <router-link to="/sign-in" class="link-button">Back to sign in</router-link>
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
import forgotPasswordForm from '../auth/ForgotPasswordForm'
import backToViz from '../parts/BackToViz';
import router from '../../router';

export default {
  name: 'ForgotPassword',
  components: {
    backToViz,
    forgotPasswordForm,
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
    redirectToSignIn() {
      router.replace('/sign-in');
    }
  },
};
</script>
