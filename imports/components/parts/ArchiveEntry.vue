<template>
  <transition name="fade">
  <div id="archiveContent" @click="clearContent">
    <!-- <div style="display: table-cell; vertical-align: middle;"> -->
      <div class="content-container">
    <div>
        <div class="loader-content">
          <img
            v-if="imageurl" 
            width="50%" 
            v-bind:src="imageurl" 
            alt=""
          />
          <div style="font-size: 18px; margin-top: 1em;">{{ title }}</div>
          <div style="">{{ subtitle }}</div>
          <div style="font-size: 12px;">{{ place }}</div>
          <div style="margin-top: 1em; margin-bottom: 2em;">{{ content }}</div>
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
  props: ['title', 'subtitle', 'place', 'content', 'imageurl'],
  methods: {
    clearContent() {
      this.$emit("clear-content");
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#archiveContent{
  overflow-y: scroll;
  overflow-x: hidden;
  position: absolute;
  z-index: 999;
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
  /* margin: 10 10; */
  display: flex;
  flex-direction: row;
  justify-content: center;

  background: rgba(0, 0, 0, 0.8);
  margin-top: 15vh;
  margin-left: 10%;
  margin-right: 10%;
  border-radius: 20px;
  padding: 2em;
}
.loader-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
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
