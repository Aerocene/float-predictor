<template>
    <div class="main-content-local">
        <f-slider />
    </div>
</template>

<style lang="scss" scoped>

.main-content-local {
  position: absolute;
  height: 100%;
  width: 100%;
  padding-top: 65px;
  z-index: 20;

  padding-left: 2em;
  padding-right: 2em;

  background-color: rgba(0, 0, 0, 1);

}


</style>

<script>
/**
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
*/
import backToViz from '../parts/BackToViz';
import fSlider from '../slider/FSlider';

export default {
  name: 'how-to-float',
  components: {
    backToViz, fSlider
  },
  data() {
    return {
      upperHeight: 0,
      imgHeight: 0,
      figureHeight: 0,
      captionWidth: 0,
    };
  },
  computed: {
  },
  created() {
    this.$store.commit('flightSimulator/setVisualizationState', 6);
    if (window.matchMedia('(max-width: 424px)').matches) {
      this.imgHeight = '150px';
      this.figureHeight = '333px';
      this.captionWidth = '267px';
    } else if (window.matchMedia('(max-width: 767px)').matches) {
      this.imgHeight = '200px';
      this.figureHeight = '433px';
      this.captionWidth = '356px';
    } else {
      this.imgHeight = '378px';
      this.figureHeight = '789px';
      this.captionWidth = '672px';
    }
  },
  mounted() {
    // this.upperHeight = `${this.$refs.content.clientHeight}px`;
  },
};
</script>
