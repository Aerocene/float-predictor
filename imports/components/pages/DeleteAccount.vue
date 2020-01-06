<template>
    <div class="main-content">
      <article class="article_none" ref="content">
        <p>Are you sure that you want to delete your account?</p>
        <p>You can’t undo this.</p>
        <p style="margin-top: 4em;"><button class="negative" @click="confirmAccountDeletion">Yes, really delete</button></p>

        <button class="form-submit-button mybtn" @click="cancelAccountDeletion">Back to profile</button>
      </article>
    </div>
</template>

<style lang="scss" scoped>
.main-content {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 20;
  padding-top: 75px;
  background: #000000bb;
  text-align: center;

  article {
    padding-top: 40%;
    margin: 0 auto;
    width: 100%;
    padding-left: 5%;
    padding-right: 5%;
  }
}

.mybtn {
  min-height: 44px;
}

.form-submit-button {
  margin-top: 2em;
  text-transform: none;
  background: #41254F;
  border-radius: 9px;
  border: none;
}

button {
  font-size: 16px;
  font-weight: 600;
  /* text-transform: uppercase; */
  margin: 8px;
  border: none;
  background-color: rgba(0, 0, 0, 0);
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
import router from '../../router';

export default {
  name: 'DeleteAccount',
  components: {
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
