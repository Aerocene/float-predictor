<template>
  <div class="main-content" :style="{ height: upperHeight }">
    <article role="article" class="article" ref="content">
        <div>
            <header>
              Profile Settings
            </header>

            <div @click="loadProfileImage">
              <b-img 
                ref="profileImageRef"
                v-bind:src="userProfile.image"
                rounded="circle"
                blank-color='#777'
                width=100
                height=100
                alt="profile"
              >
              </b-img>

            </div>

            <div class="center-div" id="croppie-modal" style="visibility: hidden;">
              <div style="width:100%;height:300px;">
              <vue-croppie 
                ref="croppieRef"
                :enableExif="true"                
                :enableResize="false"
                :enableOrientation="true"
                :mouseWheelZoom="false"
                :boundary="{ width: 240, height: 240 }"
                :viewport="{ width: 240, height: 240, type: 'circle' }"
              >
              </vue-croppie>
              </div>
              <b-button class="mt-3" @click="cancelCrop">Cancel</b-button>
              <b-button class="mt-3" @click="okCrop">Ok</b-button>
            </div>

            <!-- hidden file-input -->
            <b-form-file @input="imageChanged" 
              style="display: none;" 
              id="thumbnail-input" 
              accept="image/jpeg, image/png, image/gif">
            </b-form-file>

            <section class="metrics">              
              <span>Email: </span>
              <b-form-input 
                v-model="userEmail.address" 
                placeholder="Enter your email">
              </b-form-input>

              <span>Name: </span>
              <b-form-input 
                v-model="userProfile.name" 
                placeholder="Enter your Name">
              </b-form-input>

              <span>Location: </span>
              <b-form-input 
                v-model="userProfile.location" 
                placeholder="Your Location">
              </b-form-input>

              <span>Description: </span>
              <b-form-textarea
                id="textarea"
                v-model="userProfile.description"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
              ></b-form-textarea>

            </section>
            <section class="permissions">
              <span>Permissions:</span>

              <b-form-checkbox class="my-check" v-model="userPermissions.show_profile">
                Show Profile
              </b-form-checkbox>

              <b-form-checkbox class="my-check" v-model="userPermissions.show_location">
                Show Location
              </b-form-checkbox>

              <b-form-checkbox class="my-check" v-model="userPermissions.show_flights">
                Show Flights
              </b-form-checkbox>

              <b-form-checkbox class="my-check" v-model="userPermissions.show_description">
                Show Description
              </b-form-checkbox>

              <!-- <b-form-checkbox
                class="my-check"
                v-for="(value, name) in userPermissions" 
                v-bind:key="name"
                v-model="userPermissions[name]"
                style="label {text-transform: none;}"
              >
              {{ name }}
              </b-form-checkbox> -->

            </section>

            <footer class="actions">
                <button @click="saveProfile">Save</button>                
            </footer>

        </div>
    </article>
  </div>
</template>

<style lang="scss" scoped>
  .main-content {
    text-align: center;
  }


.center-div
{
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  /* bottom: 0; */
  left: 0;
  width: 100%;
  background-color: #bbbbbb;
  z-index: 99;

  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: stretch;
}


  section.permissions {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    justify-content: left;
    flex-wrap: wrap;
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
    font-size: 14px;
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
 * @author Ingo Randolf
*/
import { Accounts } from 'meteor/accounts-base';
import router from '../../router';
import { logout } from '../../vuex/auth';

import VueCroppie from 'vue-croppie';
import 'croppie/croppie.css' // import the croppie css manually

// const Croppie = require('croppie');

toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
  reader.readAsDataURL(file);
});

export default {
  name: 'ProfileSettings',
  iOS: !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform),
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
    userEmail() {
      const user = this.$store.state.auth.user;
      return user && user.emails[0] || "no email";
    },  
    userProfile() {
      const user = this.$store.state.auth.user;
      if (user === undefined) return {};
      if (user.profile === undefined) return {};

      if (user.profile.description === undefined) {
        user.profile.description = "";
      }

      if (user.profile.image === undefined) {
        // create a placeholder
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = 100;
        canvas.height = 100;
        ctx.fillStyle = 'rgba(' + [255,255,255,0.3].join() + ')';
        ctx.fillRect(0, 0, canvas.width, canvas.height);          
        ctx.font = "bold 16px Arial";
        ctx.textAlign = "center"; 
        ctx.textBaseline = 'middle';
        ctx.fillText("image", (canvas.width / 2), (canvas.height / 2));
        // set data
        user.profile.image = canvas.toDataURL('image/png','');
      }

      return user.profile;
    },
    userPermissions() {
      const user = this.$store.state.auth.user;
      return user && user.profile && user.profile.permissions || {};
    },
  },
  data() {
    return {
      upperHeight: 0,
    };
  },
  mounted() {
    this.upperHeight = `${this.$refs.content.clientHeight}px`;
  },
  methods: {    
    loadProfileImage() {
      document.getElementById('thumbnail-input').click();
    },
    imageChanged(file) {
      toBase64(file).then(data => {
        this.$refs.croppieRef.bind({
            url: data,
            orientation: this.iOS === true ? 6 : 1
        });      
        // show croppie
        document.getElementById('croppie-modal').style.visibility = "visible";
      });
    },
    cancelCrop() {
      document.getElementById('croppie-modal').style.visibility = "hidden";
    },
    okCrop() {
      // hide modal
      document.getElementById('croppie-modal').style.visibility = "hidden";

      // get crop
      let options = {
          format: 'jpeg', 
          circle: false
      }
      this.$refs.croppieRef.result(options, (output) => {
        // set image
        this.$refs.profileImageRef.src = output;
        // set image in profile
        const profile = this.$store.state.auth.user.profile; 
        profile.image = output;
      });
    },
    saveProfile() {      
      // update user profile
      Meteor.users.update(Meteor.userId(), {$set: {profile: this.$store.state.auth.user.profile}});
      // back to profile
      router.push('/profile');  
    },
  }
};
</script>
