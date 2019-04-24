<template>
    <div class="main-content" :style="{ height: upperHeight }">
        <article role="article" class="article" ref="content">
            <section class="entry-body">
                <header>
                  You are signed in as <strong>{{user && user.emails[0].address}}</strong>.
                </header>
                <div class="metric">
                    <header>12,345,678</header>
                    <footer>miles collected</footer>
                </div>
            </section>
            <footer class="actions">
                <button @click="changePassword">Change password</button>
                <button @click="logout">Log out</button>
                <button @click="deleteAccount" class="negative">Delete account</button>
            </footer>
            <!-- <back-to-viz /> -->
        </article>
    </div>
</template>

<style lang="scss" scoped>
  .main-content {
    text-align: center;
  }

  .entry-body .metric {
    text-align: center;

    header {
      font-size: 40px;
    }
    footer {
      font-size: 14px;
      text-transform: uppercase;
    }

  }

  footer.actions {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  button {
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    margin: 8px;
    background-color: rgba(0, 0, 0, 0.6);
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
import backToViz from '../parts/BackToViz';
import router from '../../router';

export default {
  name: 'Profile',
  components: {
    backToViz,
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
    logout() {
      this.$store.dispatch('logout');
      router.push('/');
    },
    changePassword() {
      router.push('/change-password');
    },
    deleteAccount() {
      router.push('/delete-account');
    },
  }
};
</script>
