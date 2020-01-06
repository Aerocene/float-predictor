<template>
    <div class="main-content">
      <article role="article" class="article" ref="content">
        <changePasswordForm v-on:success="redirectToProfile" />
        <router-link 
          class="link-button"
          to="/profile-settings"
        >
          Back
        </router-link>
      </article>
    </div>
</template>

<style lang="scss" scoped>
.main-content {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 20;
  background: #000000bb;
  text-align: center;
  padding-left: 3em;
  padding-right: 3em;
  overflow-y: scroll;

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
    margin-top: 1em;
    background: none;
    border: none;
    text-transform: none;
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
import changePasswordForm from '../auth/ChangePasswordForm'
import router from '../../router';

export default {
  name: 'ChangePassword',
  components: {
    changePasswordForm,
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
    // this.$store.commit('flightSimulator/setVisualizationState', 6);
  },
  mounted() {
    this.upperHeight = `${this.$refs.content.clientHeight}px`;
  },
  methods: {
    redirectToProfile() {
      // router.push('/profile-settings');
      router.back();
    }
  },
};
</script>
