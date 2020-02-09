<template>
  <transition name="fade">
  <div id="archiveContent" @click="clearContent">
    <!-- <div style="display: table-cell; vertical-align: middle;"> -->
      <div class="content-container-wrapper">

      <div class="content-container" :class="{'--isProfile': archiveIsProfile}">
        <div>
          <div class="loader-content">

            <b-carousel
              v-if="archivePictures.length > 1"
              id="carousel-1"
              :interval="2000"
              controls
              :class="{'--isProfile': archiveIsProfile}"
            >
              <b-carousel-slide v-for="(item, index) in archivePictures" v-bind:key="index" v-bind:img-src="item.url">              
              </b-carousel-slide>
            </b-carousel>

            <img
              :class="{'--isProfile': archiveIsProfile}"
              v-if="archivePictures.length == 1"             
              v-bind:src="archivePictures[0].url" 
              alt=""
            />

            <div style="margin-top: 1em;" v-if="archivePictures.length === 0"/>

            <div class="archive-info">
              <div style="font-size: 18px;">{{ archiveTitle }}</div>
              <div style="">{{ archiveRole }}</div>

              <div style="" v-if="archiveDate !== undefined">{{ archiveDate }}</div>

              <div style="font-size: 12px;">{{ archivePlace }}</div>
              <div style="margin-top: 1em;" v-if="archiveContent">{{ archiveContent }}</div>
              <div style="margin-top: 1em;" v-if="archiveLink"><a target="_blank" rel="noopener noreferrer" v-bind:href="archiveLink">{{archiveLink}}</a></div>

              <br>
              <div v-if="archivePilots.length > 0">
                <span style="font-size: 11px;">PILOTS:</span>
                <div class="pilot" :class="{'--published': isPilotPublished(item)}" v-for="(item, key) in archivePilots" v-bind:key="key" @click="onPilot(item, $event)">
                  {{item.post_title}}                
                </div>
              </div>
            </div>

          </div>  

        </div>
      </div>
      <div 
        v-if="hasIndex"
        class="next-item" 
        @click="nextItem"
      >
      </div>
      </div>
  </div>
</transition>
</template>


<script>
/**
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
*/
/* eslint-disable */

import Util from '../visualization/Util';

export default {
  name: 'archiveEntry',
  data () {
    return {
      // type: 'fullscreen'
    }
  },
  // props: ['title', 'subtitle', 'place', 'content', 'imageurl', 'isProfile', 'link'],
  computed: {
    archiveTitle() { return this.$store.state.archive.content.title; },
    archiveRole() { return this.$store.state.archive.content.role; },
    archiveDate() { return this.$store.state.archive.content.date; },
    archivePlace() { return this.$store.state.archive.content.place; },
    archiveContent() { return this.$store.state.archive.content.content; },
    archiveIsProfile() { return this.$store.state.archive.content.isProfile; },
    archiveLink() { return this.$store.state.archive.content.link; },
    archivePilots() { return this.$store.state.archive.content.pilots || []; },
    archivePictures() { return this.$store.state.archive.content.pictures || []; },
    hasIndex() { return this.$store.state.archive.content.index >= 0; },
  },
  methods: {
    isPilotPublished(item) {
      return item.post_status === 'publish' && this.findPilot(item);
    },
    clearContent() {
      this.$store.commit('archive/clearArchiveContent');
    },
    findPilot(item)
    {
      if (item.post_status === 'publish')
      {
        for (let i = 0; i < this.$store.state.archive.archiveMember.length; i++)
        {
          const member = this.$store.state.archive.archiveMember[i];
          if (member.id === item.ID)
          {          
            return {obj: member, index: i};
          }
        }
      }
      console.log("could not find pilot: "+ item.ID);        
    },    
    onPilot(item, e) {
      e.stopPropagation();
      
      const member = this.findPilot(item);
      if (member) {
        this.$store.commit('archive/setLocation', {
          lat: member.obj.acf.map.lat, 
          lng: member.obj.acf.map.lng,
          archiveItem: Util.convertArchiveItem(member.obj, member.index)
        });

        this.clearContent();
        this.$store.commit('archive/setShowLegend', false);
      }
    },
    nextItem(e) {
      e.stopPropagation();
      
      const obj = this.$store.state.archive.content;

      if (obj && obj.index) {
        let new_index = obj.index + 1;
        let arr;
        switch(obj.archive_type) {
          case "upcoming":    
            arr = this.$store.state.archive.archiveUpcoming;
            break;
          case "member":
            arr = this.$store.state.archive.archiveMember;
            break;
          case "museo":
            arr = this.$store.state.archive.archiveMuseo;
            break;
          case "tethered":
            arr = this.$store.state.archive.archiveTethered;
            break;
          case "human":
            arr = this.$store.state.archive.archiveHuman;
            break;
          case "free":
            arr = this.$store.state.archive.archiveFree;
            break;
        }
  
        if (arr && arr.length > 0)
        {
          if (new_index > arr.length)
          {
            new_index = 0;
          }

          this.$store.commit('archive/setLocation', {
            lat: arr[new_index].acf.map.lat, 
            lng: arr[new_index].acf.map.lng,
            archiveItem: Util.convertArchiveItem(arr[new_index], new_index)
          });


          this.clearContent();
          this.$store.commit('archive/setShowLegend', false);
        }
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../css/_variables_and_mixins.scss";

::-webkit-scrollbar {
    display: none;
}

.pilot {
  text-transform: none;
  &.--published {
    cursor: pointer;
    text-decoration: underline;
  }
}
.next-item {
  width: 40px;
  height: 40px;
  color: black;
  text-align: center;
  font-size: 20px;
  background: rgba(200, 200, 200, 1);
  border-radius: 50%;

  position: relative;
  left: calc(100% - 25px);
  bottom: 80px;

  cursor: pointer;

  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 4px;
  content: url('/assets/icons/arrow_acc-close.svg');
}


#archiveContent{
  overflow: hidden;
  position: absolute;
  z-index: 49;
  top:0px;
  left:0px;
  /* display: table; */
  height: 100%;
  width: 100%;
  transition: opacity 0.4s ease;
  background-color: transparent;
}

.content-container-wrapper {

  margin-top: 15vh;
  margin-left: 10%;
  margin-right: 10%;
  @include medium_up {
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
}

.content-container {
  position: relative;
  max-height: 80vh;
  overflow-y: scroll;
  overflow-x: hidden;

  scrollbar-width: none;  

  /* margin: 10 10; */
  display: flex;
  flex-direction: row;
  justify-content: center;

  background: rgba(44, 42, 42, 0.85);
  
  margin: 0;
  border-radius: 21px;
  padding: 0%;
}
.loader-content {
  display: flex;
  flex-direction: column;
  justify-content: center;

  
  .carousel {
    &.--isProfile {
      width: 50%;
      border-radius: 0px;
      margin: 1em;
    }
    .carousel-inner {
      width: 100%;
      border-radius: 21px;    
    }
  }

  img {
    width: 100%;
    border-radius: 21px;

    &.--isProfile {
      margin-top: 10px;
      margin-left: 10px;
      width: 50%;
      border-radius: 0px;
      margin: 1em;
    }
  }

  .archive-info {
    padding: 1em 2em 1em 2em;
  }
}

.error-container:before {
  content: "";
  display: block;
  padding-top: 100%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
