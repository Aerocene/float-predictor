<template>
  <transition name="fade">
  <div id="archiveContent" @click="clearContent">
    <!-- <div style="display: table-cell; vertical-align: middle;"> -->
      <div class="content-container" :class="{'--isProfile': archiveIsProfile}">
      <div>
        <div class="loader-content">

          <img
            class="aaa"
            :class="{'--isProfile': archiveIsProfile}"
            v-if="archiveImageUrl"             
            v-bind:src="archiveImageUrl" 
            alt=""
          />

          <div class="archive-info">
            <div style="font-size: 18px;">{{ archiveTitle }}</div>
            <div style="">{{ archiveRole }}</div>
            <div style="font-size: 12px;">{{ archivePlace }}</div>
            <div style="margin-top: 1em;" v-if="archiveContent">{{ archiveContent }}</div>
            <div style="margin-top: 1em;" v-if="archiveLink"><a target="_blank" rel="noopener noreferrer" v-bind:href="archiveLink">{{archiveLink}}</a></div>
          </div>
        </div>        
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
export default {
  name: 'archiveEntry',
  data () {
    return {
      // type: 'fullscreen'
    }
  },
  // props: ['title', 'subtitle', 'place', 'content', 'imageurl', 'isProfile', 'link'],
  computed: {
    archiveImageUrl() { return this.$store.state.archive.content.url; },
    archiveTitle() { return this.$store.state.archive.content.title; },
    archiveRole() { return this.$store.state.archive.content.role; },
    archivePlace() { return this.$store.state.archive.content.place; },
    archiveContent() { return this.$store.state.archive.content.content; },
    archiveIsProfile() { return this.$store.state.archive.content.isProfile; },
    archiveLink() { return this.$store.state.archive.content.link; },
  },
  methods: {
    clearContent() {
      this.$store.commit('archive/clearArchiveContent');
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../css/_variables_and_mixins.scss";

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

.content-container {
  position: relative;
  max-height: 80vh;
  overflow-y: scroll;
  overflow-x: hidden;
  /* margin: 10 10; */
  display: flex;
  flex-direction: row;
  justify-content: center;

  background: rgba(44, 42, 42, 0.85);
  margin-top: 15vh;
  margin-left: 10%;
  margin-right: 10%;
  @include medium_up {
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
  border-radius: 21px;
  padding: 0%;
}
.loader-content {
  display: flex;
  flex-direction: column;
  justify-content: center;

  img {
    width: 100%;
    border-radius: 21px;
    &.--isProfile {
      width: 50%;
      border-radius: 0px;
    }
  }

  .archive-info {
    padding: 2em;
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
