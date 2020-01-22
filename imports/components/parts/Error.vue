<template>
  <transition name="fade">
  <div id="error" @click="clearError">
    <div class="content-container">
      <div class="loader-content">
        <div class="message">
          <h4>Error</h4>
          {{ content }}
          <h4/>
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
  name: 'error',
  data () {
    return {
    }
  },
  computed: {
    content() {
      return this.$store.state.general.errorContent;
    },
  },
  methods: {
    clearError() {
      this.initNew();
      this.$store.commit('general/setErrorContent', '');
    },
    initNew() {
        this.$store.dispatch('flightSimulator/resetVisualization');
        this.$store.commit('general/closeMenu');
        this.$store.commit('general/setFormStatus', true);
        this.$store.commit('general/setModalShow', true);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

#error{
  background-color: rgba(0,0,0,0.6);

  overflow-y: scroll;
  overflow-x: hidden;
  position: absolute;
  z-index: 999;
  top:0px;
  left:0px;
  height: 100%;
  width: 100%;
  
  transition: opacity 0.4s ease;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  margin-left: 10%;
  margin-right: 10%;
  margin-bottom: 15vh;
  border-radius: 20px;
  padding: 2em;
  background-color: rgba(59, 59, 59, 0.692);
}
.loader-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
