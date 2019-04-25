<template>
    <div class="main-content" :style="{ height: upperHeight }">
        <article role="article" class="article" ref="content">
            <header>
              You are signed in as <strong>{{user && user.emails[0].address}}</strong>.
            </header>
            <section class="metrics">
              <div class="metric">
                  <header><span class="value">{{earnedAerosString}}</span> <span class="unit">ÆR</span></header>
                  <footer>earned</footer>
              </div>
              <div class="metric">
                  <header><span class="value">{{savedCO2InKilogramsString}}</span> <span class="unit">tons</span></header>
                  <footer>CO₂ saved</footer>
              </div>
              <div class="metric">
                  <header><span class="value">{{totalNauticalMilesString}}</span> <span class="unit">miles</span></header>
                  <footer>travelled</footer>
              </div>
            </section>
            <footer class="actions">
                <button @click="changePassword">Change password</button>
                <button @click="logout">Log out</button>
                <button @click="deleteAccount" class="negative">Delete account</button>
            </footer>
        </article>
    </div>
</template>

<style lang="scss" scoped>
  .main-content {
    text-align: center;
  }

  section.metrics {
    margin-top: 16px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;

    .metric {
      text-align: center;

      header {
        .value {
          font-size: 40px;
        }
        .unit {
          font-size: 20px;
        }
      }
      footer {
        font-size: 14px;
        text-transform: uppercase;
      }
    }
  }

  footer.actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 32px;
  }

  button {
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    margin: 8px;
    min-height: 44px;
    border-radius: 4px;
    padding: 8px;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    cursor: pointer;
    border: 1px solid white;
    border-radius: 4px;
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
import { logout } from '../../vuex/auth';

export default {
  name: 'Profile',
  components: {
  },
  meteor: {
    subscribe: {
      'currentUser': [],
    },
    usersHelper() {
      return this.$store.commit('updateUsers', Meteor.users.find({}).fetch())
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    earnedAerosString() {
      const user = this.$store.state.auth.user;
      return user && user.earnedAeros && Math.floor(user.earnedAeros).toLocaleString('en') || 0;
    },
    savedCO2InKilogramsString() {
      const user = this.$store.state.auth.user;
      return user && user.savedCO2InKilograms && Math.floor(user.savedCO2InKilograms / 1000).toFixed(1).toLocaleString('en') || 0;
    },
    totalNauticalMilesString() {
      const user = this.$store.state.auth.user;
      return user && user.totalNauticalMiles && Math.floor(user.totalNauticalMiles).toLocaleString('en') || 0;
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
      return logout()
        .then(() => {
          router.push('/');
        })
        .catch((error) => { this.commit('auth/setLastSessionError', error); });
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
