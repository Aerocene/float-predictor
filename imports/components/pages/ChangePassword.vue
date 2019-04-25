<template>
    <div class="main-content" :style="{ height: upperHeight }">
      <article role="article" class="article" ref="content">
        <changePasswordForm v-on:success="redirectToProfile" />
        <router-link to="/profile" class="link-button">Back to profile</router-link>
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
    this.$store.commit('flightSimulator/setVisualizationState', 6);
  },
  mounted() {
    this.upperHeight = `${this.$refs.content.clientHeight}px`;
  },
  methods: {
    redirectToProfile() {
      router.push('/profile');
    }
  },
};
</script>
