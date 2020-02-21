<template>
    <div class="f-slider-wrapper"
         @wheel.stop.prevent="onScroll"
         @touchmove.stop.prevent="onTouchMove"
         @touchend="onTouchEnd" @touchstart="onTouchStart">
        <div class="f-slider-inner">
            <f-slide id="101">
                <h3 class="title">Aerocene</h3>
                <div class="animation-wrapper">
                    <img class="animation"
                         src="/img/instructions/Instructions_1-1.gif">
                </div>
                <div class="description">
                    Aerocene is an open platform for the development of aerosolar 
                    sculptures floating in the air, free from carbon emissions. 
                    Aerosolar journeys are a new way of travelling in the Aerocene epoch, 
                    collaborating with the atmosphere instead of industrialising, 
                    restricting and capitalising off of it.
                </div>
            </f-slide>
            <f-slide id="102">
                <h3 class="title">Aerosolar Sculptures</h3>
                <div class="animation-wrapper">
                    <img class="animation"
                         src="/img/instructions/Instructions_1-2.gif">
                </div>
                <div class="description">
                    Aerosolar Sculptures are air-fuelled balloons for solar-powered 
                    atmospheric exploration. By becoming buoyant only with the heat 
                    of the Sun and infrared radiation from Earth’s surface, the Sculptures 
                    can float freely across political borders. Different shapes and 
                    materials have been tested, and several Sculptures have been successfully 
                    recovered after floating hundreds of kilometers.
                </div>
            </f-slide>
            <f-slide id="103">
                <h3 class="title">Virtual Flights</h3>
                <div class="animation-wrapper">
                    <img class="animation"
                         src="/img/instructions/Instructions_1-3.gif">
                </div>
                <div class="description">
                    The Aerocene App develops on the Float Predictor, allowing for endless 
                    virtual journeys around the globe without CO2-emissions. The system 
                    utilises open meteorological data to predict aerosolar trajectories 
                    based on real-time weather forecasts.
                </div>
            </f-slide>
            <f-slide id="201">
                <h3 class="title">Departure and Destination</h3>
                <div class="animation-wrapper">
                    <img class="animation"
                         src="/img/instructions/Instructions_2-1a.gif">
                </div>
                <div class="description">
                    By selecting a departure and a destination point, 8 different 
                    routes are visualised to determine when would be the best day 
                    to launch a sculpture to get from A to B. 
                    <br>
                    Departure and destination points can be selected by typing any 
                    location in the world into the entry field.
                </div>                
            </f-slide>
            <!-- <f-slide id="202">
                <h3 class="title">Departure and Destination</h3>
                <div class="animation-wrapper">
                    <img class="animation"
                         src="/img/instructions/Instructions_2-2.gif">
                </div>
                <div class="description">
                    Departure and destination points can be selected by typing any city in
                    the world into the entry field.
                </div>
            </f-slide> -->
            <f-slide id="203">
                <h3 class="title">Flight Controls</h3>
                <div class="animation-wrapper">
                    <img class="animation"
                         src="/img/instructions/Instructions_2-3_02.gif">
                </div>
                <div class="description --upper">
                    When a journey has started, a flight control interface will allow 
                    you to interact with the visualisation. The predictions simulate 
                    a 16 days forecast, in which eight aerosolar sculptures are launched.
                </div>                
            </f-slide>
            <f-slide id="204">
                <h3 class="title">Go onboard</h3>
                <div class="animation-wrapper">
                    <img class="animation"
                         src="/img/instructions/Instructions_2-5.gif">
                </div>
                <div class="description">
                    You can jump onboard an aerosolar sculpture and see the Earth 
                    pass below you from a different perspective: just click on any 
                    sculpture’s icon on the right-hand side of the screen or within 
                    the visualisation itself. When onboard, real-time flight telemetry 
                    data will appear.
                </div>
            </f-slide>
            <f-slide id="205">
                <h3 class="title">Understanding Winds</h3>
                <div class="animation-wrapper">
                    <img class="animation"
                         src="/img/instructions/Instructions_2-6.gif">
                </div>
                <div class="description">
                    Global wind patterns at a default altitude of 10,000 m are 
                    visualised based on a 16 days forecast. 
                </div>
            </f-slide>
            <f-slide id="206">
                <h3 class="title">Controlling the Globe</h3>
                <div class="animation-wrapper">
                    <img class="animation"
                         src="/img/instructions/Instructions_2-4.gif">
                </div>
                <div class="description">
                    Scroll or tap and drag the globe to tilt the view. 
                    Zoom in and out by pinching on the globe. 
                    To go back and follow the paths of all of the sculptures, 
                    just click “re-centre”.
                </div>
            </f-slide>
            <f-slide id="301">
                <h3 class="title">Aeroglyphs</h3>
                <div class="animation-wrapper">
                    <div class="animation-wrapper">
                        <img class="animation"
                             src="/img/instructions/Instructions_3-1.gif">
                    </div>
                </div>
                <div class="description">
                    Each aerosolar journey produces an Aeroglyph: an air 
                    signature that represents the 16-day trajectory of an 
                    Aerocene Sculpture around the globe. Aeroglyphs are saved 
                    into an archive: a gallery of all the fossil-free journeys 
                    around the world.
                </div>
            </f-slide>
            <!-- <f-slide id="302">
                <h3 class="title">Save and Share</h3>
                <div class="animation-wrapper">
                    <img class="animation --big"
                         src="/img/instructions/Instructions_3-2.gif">
                </div>
                <div class="description">
                    Aeroglyphs are graphical depiction of how Aerocene
                    sculptures float around the globe. They created in
                    a vector polar projection that can be downloaded
                    and manipulated. All selected floats in the Float
                    Predictor are automatically stored into the
                    Aeroglyphs Archive, a gallery of all the journeys
                    around the world.
                </div>
            </f-slide>
            <f-slide id="303">
                <h3 class="title">Download and APIs</h3>
                <div class="animation-wrapper">
                    <img class="animation"
                         src="/img/instructions/Instructions_3-4.gif">
                </div>
                <div class="description">
                    Besides being saved in our online archive,
                    each Aeroglyph can be downloaded as a JSON file.
                    The entire database of Aerosolar journeys can
                    be accessed via the Aerocene Float Predictor’s APIs.
                </div>
            </f-slide> -->
        </div>
    </div>
</template>
<script>
/**
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
*/
import fSlide from './FSlide';

export default {
  name: 'f-slides-wrapper',
  components: { fSlide },
  props: ['currentIndex'],
  data() {
    return {
      clientY: 0,
    };
  },
  methods: {
    onScroll(e) {
      this.manageScroll(e.deltaY);
    },
    onTouchMove(e) {
      if (e.changedTouches.length === 1) {
        this.manageScroll(this.clientY - e.changedTouches[0].clientY);
      }
    },
    onTouchEnd() {
      this.clientY = null;
    },
    onTouchStart(e) {
      if (e.touches.length === 1) {
        this.clientY = e.touches[0].clientY;
      }
    },
    manageScroll(deltaY) {
      if (deltaY > 18) {
        this.$emit('scrollDown', parseInt(this.id, 10) + 1);
      } else if (deltaY < -18) {
        this.$emit('scrollUp', parseInt(this.id, 10) - 1);
      }
    },
  },
};
</script>


<style lang="scss">
.animation-wrapper {
    text-align: center;
    flex: 1 1 auto;
    height: 40%;
    display: flex;
    flex-flow: column;
    justify-content: center;
}
.animation {
    /* width: 100%; */
    max-width: 100%;
    max-height: 100%;
    margin: auto;
}
.description {
    flex-grow: 1.1;
}
</style>
