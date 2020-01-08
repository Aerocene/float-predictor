<template>
  <transition name="fade">
  <div id="error">
    <div style="display: table-cell; vertical-align: middle;">
      <div class="error-container">
        <div class="loader-content">
          <div>{{ content }}   </div>                
        </div>        
      </div>
      <div class="h-box">
        <b-button type="submit" variant="primary">Cancel</b-button>
        <b-button type="submit" variant="primary">OK</b-button>
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
  name: 'error',
  data () {
    return {
      // type: 'fullscreen'
    }
  },
  props: ['content'],
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

#error{
  overflow: hidden;
  position: absolute;
  z-index: 999;
  top:0px;
  left:0px;
  display: table;
  height: 100%;
  width: 100%;
  transition: opacity 1.0s ease;
  background-color: rgba(0,0,0,0.9);
}

.error-container {
  position: relative;
  margin: 10 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.loader-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.h-box {
  display: flex;
  width: 100%;
  flex-direction: row;
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
