<template>
  <div class="main-content">
    <article role="article" class="article" ref="content">
        <header>
          Profile Settings
        </header>

        <div class="img-border" @click="loadProfileImage">
          <b-img 
            ref="profileImageRef"
            v-bind:src="userProfile.image"
            rounded="circle"
            blank-color='#777'
            width=80
            height=80
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
        
        <section class="settings">              

          <b-form-input 
            class="form-input"
            v-model="userEmail.address" 
            placeholder="Enter your email">
          </b-form-input>

          <b-form-input 
            class="form-input"
            v-model="userProfile.name" 
            placeholder="Enter your Name">
          </b-form-input>

          <b-form-input 
            class="form-input"
            v-model="userProfile.location" 
            placeholder="Location">
          </b-form-input>

          <b-form-textarea
            class="form-input bio"
            id="textarea"
            v-model="userProfile.description"
            placeholder="Biography"
            rows="3"
            max-rows="6"
          ></b-form-textarea>

        </section>

        <button class="form-input" @click="changePassword">Change Password</button>  

        <section class="permissions">

          <div class="label-checkbox-row">
            <span class="chk-label table-cell">Show Profile</span>
            <b-form-checkbox 
              class="my-check table-cell" 
              v-model="userPermissions.show_profile"
              switch
              size="lg"
            />
          </div>

          <div class="label-checkbox-row">
            <span class="chk-label table-cell">Show Location</span>
            <b-form-checkbox 
              class="my-check table-cell" 
              v-model="userPermissions.show_location"
              switch
              size="lg"
            />
          </div>

          <div class="label-checkbox-row">
            <span class="chk-label table-cell">Show Flights</span>
            <b-form-checkbox 
              class="my-check table-cell" 
              v-model="userPermissions.show_flights"
              switch
              size="lg"
            />
          </div>

          <div class="label-checkbox-row">
            <span class="chk-label table-cell">Show Biography</span>
            <b-form-checkbox 
              class="my-check table-cell" 
              v-model="userPermissions.show_description"
              switch
              size="lg"
            />
          </div>

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
            <button class="form-input last-element" @click="saveProfile">Save</button>                
        </footer>        
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

  header {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 33px;
    margin-top: 10px;
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

.form-input {
  margin-top: 2em;
  text-align: left;
  color: white;
  font-size: 18px;  
  border-bottom-color: white;
}
.form-input:focus {
  border-bottom-color: white;
  color: white;
}

.table-cell {
  display: table-cell;
}
.label-checkbox-row {
  display: table; 
  width: 100%;
}
.my-check {
  text-transform: none;
  width: 0px;  
}
.chk-label {
  text-align: left;
  font-size: 16px; 
}

.img-border {    
  margin: auto;
  margin-top: 2em;
  border-radius: 50% !important;
  width: 96px;
  height: 96px;
  background: white;

  img {
    margin-top: 8px;
  }
}

.bio {
  background: rgba(0, 0, 0, 0.4);
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


.last-element {
  margin-bottom: 60px;
}

section.permissions {
  margin-top: 16px;
  line-height: 2em;
  width: 80%;
  margin-left: 8px;
  align-self: normal;
}


section.settings {
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

footer.actions {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

button {
  width: 100%;  
  font-size: 14px;
  font-weight: 600;
  /* text-transform: uppercase; */
  margin: 8px;
  min-height: 44px;
  /* border-radius: 4px; */
  padding: 8px;
  /* background-color: rgba(0, 0, 0, 0.6); */
  background-color: rgba(0, 0, 0, 0);
  border: none;
  color: white;
  cursor: pointer;
  /* border: 1px solid white; */
  /* border-radius: 4px; */
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

      if (user.profile === undefined) {
        user.profile = {};
      };

      if (user.profile.description === undefined) {
        user.profile.description = "";
      }

      if (user.profile.image === undefined) {
        // create a placeholder
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
    changePassword() {
      router.push('/change-password');
    },
  }
};
</script>
