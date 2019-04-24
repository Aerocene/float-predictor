<template>
    <div class="main-content" :style="{ height: upperHeight }">
      <article role="article" class="article" ref="content">
        <p>Are you sure that you want to delete your account?</p>
        <p>You can’t undo this.</p>
        <p><button class="negative" @click="confirmAccountDeletion">Yes, really delete</button></p>
        <p><button @click="cancelAccountDeletion">Back to profile</button></p>
      </article>
    </div>
</template>

<style lang="scss" scoped>
  button {
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    margin: 8px;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    &.negative {
      border-color: var(--red);
      color: var(--red);
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
  name: 'About',
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
    confirmAccountDeletion() {
      Meteor.call('cancelAccount', (error) => {
        router.replace('/');
      })
    },
    cancelAccountDeletion() {
      router.replace('/profile');
    },
  }
};
</script>
