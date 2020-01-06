<template>
    <div class="main-content">
        <article role="article" class="article" ref="content">

            <header>Profile</header>

            <div class="profile-info">
              <!-- <div class="img-border">
                <b-img 
                    ref="profileImageRef"
                    v-bind:src="userProfile.image"
                    rounded="circle"
                    blank-color='#777'
                    width=42
                    height=42
                    alt="profile-img"
                  >
                  </b-img>
              </div> -->

              <div class="nameinfo">
                <span>{{userProfile.name}}</span>
                <hr>
                <span class="email-lower">{{user && user.emails[0].address}}</span>
              </div>
            </div>


            <!-- general info -->
            <!-- <section class="metrics">
              <div class="metric">
                  <header>earned:</header>
                  <footer><span class="value">{{earnedAerosString}}</span> <span class="unit">ÆR</span></footer>
              </div>
              <div class="metric">
                  <header>CO₂ saved:</header>
                  <footer><span class="value">{{savedCO2InKilogramsString}}</span> <span class="unit">tons</span></footer>
              </div>
              <div class="metric">
                  <header>travelled:</header>
                  <footer><span class="value">{{totalNauticalMilesString}}</span> <span class="unit">miles</span></footer>
              </div>
            </section> -->

            <!-- <section class="metrics">
              <span><label>earned:</label> {{earnedAerosString}} ÆR</span><br>
              <span><label>CO₂ saved</label>: {{savedCO2InKilogramsString}} tons</span><br>
              <span><label>travelled</label>: {{totalNauticalMilesString}} miles</span><br>          
            </section> -->



            <!-- list of flights -->
            <!-- <section class="flights">
              <div style="margin-top: 6px;" v-for="(value, name) in myFlights" v-bind:key="name">
                <label>flight from:</label> {{value.created.toLocaleDateString("en-US", { year: 'numeric', month: 'numeric', day: 'numeric' })}}
                <b-img v-bind:src="value.svgB64" width=60 height=60></b-img>
                <button @click="loadPath(value._id)">Load</button>
              </div>
            </section> -->

            <!-- footer -->
            <footer class="actions">
                <!-- <button @click="showUserArchive">My Archive</button> -->
                <!-- <button @click="openSettings">Settings</button> -->
                <button @click="logout">Log out</button>
                <button @click="deleteAccount" class="negative">Delete account</button>
            </footer>
        </article>
    </div>
</template>

<style lang="scss" scoped>
.main-content {
  text-align: left;
  position: absolute;
  z-index: 20;
  padding-top: 75px;
  background: #000000bb;
  height: 100%;
  width: 100%;

  header {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 33px;
  }

  article {
    width: 100%;
    height: 100%;
    min-width: 100%;
    overflow-y: scroll;
    padding-left: 5%;
    padding-right: 5%;
    padding-top: 0%;
  }
}

.profile-info {
  display: flex; 
  flex-direction: row; 
  width: 100%; 
  margin-top: 1em;

  .img-border {
    margin-left: 0px;
    margin-top: 0px;
    border-radius: 50% !important;
    max-width: 58px;
    max-height: 58px;
    background: white;

    img {
      margin: auto;
    }
  }
  /* img {
    border: 8px solid red;
    border-spacing: 2px;
    outline: 4px solid red;
    outline-offset: 15px;
    -moz-outline-radius: 20px;
  } */
  .nameinfo {
    margin-top: 20px;

  }
  div {
    margin-left: 16px;
    margin-top: 10px;
    width: 100%;
    display: flex; 
    flex-direction: column;

    span {
      line-height: 23px;
      font-size: 18px;
    }
    hr {
      margin: 0px;
      background: white;
      min-width: 100%;
    }
    .email-lower {
      font-size: 12px;
    }
  }
}

  section.flights {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }

  section.metrics {
    margin-top: 26px;
    width: 100%;
  
    text-align: left;
    line-height: 2.5em;
    font-size: 18px;
    color: gray;

    label {
      color: gray;
      text-transform: uppercase;
    }

    .metric {
      display: flex;
      flex-direction: row;
      /* justify-content: space-evenly;
      flex-wrap: wrap; */

      header {
        .value {
          font-size: 18px;
        }
        .unit {
          font-size: 18px;
        }
        text-transform: uppercase;
      }
      footer {
        font-size: 18px;
        margin-left: 10px;
      }
    }
  }

  footer.actions {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: left;
    margin-top: 4em;
    width: 100%;
    height: 100%;
    max-height: 2em;
  }

  button {
    text-align: left;
    font-size: 18px;
    font-weight: 500;
    /* text-transform: uppercase; */
    /* margin: 10px 0 10px 0; */
    /* min-height: 44px; */
    /* border-radius: 4px; */
    padding: 8px 0 8px 0;
    /* background-color: green; */
    background: none;
    color: white;
    cursor: pointer;
    border: none;
    /* border-radius: 4px; */
    &.negative {
      font-weight: 800;
      border-color: var(--red);
      color: var(--red);
    }
  }
</style>

<script>
/**
 * @author Sebastian Felix Zappe
*/
import { Accounts } from 'meteor/accounts-base';
import router from '../../router';
import { logout } from '../../vuex/auth';
import AsyncComputed from 'vue-async-computed'

import loadUserFlights from '../../api/flights/client/loadUserFlights';
import loadFlightPath from '../../api/flights/client/loadFlightPath';

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
    userProfile() {
      const user = this.$store.state.auth.user;
      if (user === undefined) return {};
      
      if (user.profile === undefined) {
        user.profile = {};
      };

      if (user.profile.name === undefined) {
        user.profile.name = "No Name";
      }

      if (user.profile.description === undefined) {
        user.profile.description = "";
      }

      if (user.profile.image === undefined) {
        // create a placeholder
        // console.log("create dummy");
        
        // var canvas = document.createElement('canvas');
        // var ctx = canvas.getContext('2d');
        // canvas.width = 100;
        // canvas.height = 100;
        // ctx.fillStyle = 'rgba(' + [255,255,255,0.3].join() + ')';
        // ctx.fillRect(0, 0, canvas.width, canvas.height);          
        // ctx.font = "bold 16px Arial";
        // ctx.textAlign = "center"; 
        // ctx.textBaseline = 'middle';
        // ctx.fillText("image", (canvas.width / 2), (canvas.height / 2));
        // // set data
        // user.profile.image = canvas.toDataURL('image/png','');

        user.profile.image = "/img/user-dummy.png";
      }

      return user.profile;
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
  asyncComputed: {
    myResolvedValue() {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve('*Fancy* Resolved Value!'), 1000)
      })
    },
    myFlights() {
      return loadUserFlights(1);
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
    logout() {
      return logout()
        .then(() => {
          router.push('/');
        })
        .catch((error) => { this.commit('auth/setLastSessionError', error); });
    },
    showUserArchive() {
      console.log("show archive");
      
    },
    changePassword() {
      router.push('/change-password');
    },
    deleteAccount() {
      router.push('/delete-account');
    },
    openSettings() {
      router.push('/profile-settings');      
    },
    loadFlights() {
    },
    loadPath(id) {
      console.log("id: " + id);
      loadFligthPath(id).then(data => {
        console.log(data);
      });      
    },
  }
};
</script>
