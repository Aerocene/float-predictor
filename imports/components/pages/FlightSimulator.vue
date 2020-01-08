<template>
  <div class="main-content over" :style="{ height: upperHeight }">

      <!--just the animation here-->

      <div v-if="isChoosing" class="flight-form wrapper shadowed" ref="content">
          <b-form @submit="onSubmit">
              <div class="type-selector-group">

                  <b-form-checkbox id="FlightTypeSelector"
                                   v-model="flightType"
                                   value="free"
                                   unchecked-value="planned"
                                   class="type-selector"
                                   :class="flightType"
                  >
                    <div class="type-selector">
                        <span :class="{'--isActive': isPlanned}">Planned Float</span>
                        <span class="slider round"></span>
                        <span :class="{'--isActive': isFree}">Free Float</span>
                    </div>
                  </b-form-checkbox>

                  <transition name="switch-text">
                      <p v-if="isPlanned" class="description" key="planned">
                          Planned floats try to reach a specific destination
                          starting from a selected departure point.
                      </p>
                      <p v-else class="description" key="free">
                          Free floats start from a selected departure point to
                          fly along following the wind.
                      </p>
                  </transition>

              </div>

              <!-- From / To -->
              <div class="coordinates-selector-group">

                  <!-- <label class="small">From</label> -->
                  <div class="place-input">

                    <vue-google-autocomplete
                            id="map" classname="form-control"
                            ref="departureBox"
                            :placeholder="placeholder.departure"
                            @placechanged="setDeparture"
                            @focus="setFocus"
                            @blur="removeFocus"
                            @change="mapChanged"
                            types="(cities)"
                            rtypes="geocode">
                    </vue-google-autocomplete>

                    <!-- <button class="locationBtn" @click="getLocationDep">⦿</button> -->

                  </div>

                  <transition name="fade-height">
                    
                      <div class="optional-destination" v-if="(flightType === 'planned')">
                        <!-- <label  class="small">To</label> -->
                        <div class="place-input">

                          <vue-google-autocomplete
                            id="map2" classname="form-control"
                            ref="destinationBox"
                            :placeholder="placeholder.destination"
                            @placechanged="setDestination"
                            @focus="setFocus"
                            @blur="removeFocus"
                            @change="map2Changed"
                            types="(cities)"
                            rtypes="geocode">
                          </vue-google-autocomplete>
                          
                          <!-- <button class="locationBtn" @click="getLocationDest">⦿</button> -->

                        </div>
                      </div>
                  </transition>
              </div>

              <!-- altitude selector -->
              <div class="altitude-selector-group">
                  <div class="input-group altitude-select">
                      <label class="small">Float Altitude</label>
                      <div class="alt-select" @click="toggleAltPanel">
                          <span>{{ form.altValues[selectedAlt] }}</span>
                          <i class="fp fp-caret-down"
                             :class="{'isOpen': isAltPanelOpen}">
                          </i>
                      </div>
                  </div>
                  <transition name="select-slide">
                      <div v-if="isAltPanelOpen"
                           class="alt-panel-wrapper"
                           @click="closeAltPanel">
                          <altitude-panel :isFull="false">
                          </altitude-panel>
                      </div>

                  </transition>
                  <p class="input-label">
                      Aerocene sculptures always leave at noon with sun light.
                  </p>
              </div>

              <!-- launch button -->
              <button 
                class="launch-button" 
                type="submit"
                v-bind:disabled="!hasLocations"
              >
                Launch
              </button>
          </b-form>
      </div>
  </div>
</template>

<script>
/**
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
*/
import VueGoogleAutocomplete from 'vue-google-autocomplete';
import _ from 'lodash';
import altitudePanel from '../parts/AltitudePanel';

export default {
  name: 'FlightSimulator',
  components: { VueGoogleAutocomplete, altitudePanel },
  data() {
    return {
      upperHeight: 0,
      form: {
        errors: {
        },
        altValues: [
          '100 m', 
          '1,500 m',
          '5,500 m', 
          '10,000 m', 
          '16,000 m',
          '21,500 m', 
          '26,500 m',
        ],
      },
    };
  },
  computed: {
    isAltPanelOpen: {
      get() {
        return this.$store.state.general.isAltPanelOpen;
      },
      set(v) {
        this.$store.commit('general/setAltPanel', v);
      },
    },
    selectedAlt: {
      get() {
        return this.$store.state.flightSimulator.altitudeLevel;
      },
      set(v) {
        const alt = parseInt(v, 10);
        this.$store.commit('flightSimulator/setAltitudeLevel', alt);
      },
    },
    hasErrors() {
      return (this.form.errors.departure || this.form.errors.destination);
    },
    hasLocations() {
      return !_.isEmpty(this.departure) && (this.isFree || (!_.isEmpty(this.destination)));
    },
    placeholder() {
      let departureStr = 'From';
      let destinationStr = 'To';
      if (this.form.errors.departure) {
        departureStr = this.form.errors.departure;
      } else if (!_.isEmpty(this.departure)) {
        if (this.departure.city && this.departure.country) {
          departureStr = `${this.departure.city}, ${this.departure.country}`;
        } else {
          departureStr = `${this.departure.lat}, ${this.departure.lng}`;
        }
      }
      if (this.form.errors.destination) {
        destinationStr = this.form.errors.destination;
      } else if (!_.isEmpty(this.destination)) {
        if (this.destination.city && this.destination.country) {
          destinationStr = `${this.destination.city}, ${this.destination.country}`;
        } else {
          destinationStr = `${this.destination.lat}, ${this.destination.lng}`;
        }
      }
      return {
        departure: departureStr,
        destination: destinationStr,
      };
    },
    departure: {
      get() {
        return this.$store.state.flightSimulator.departure;
      },
      set(value) {
        this.$store.commit('flightSimulator/setDeparture', value);
      },
    },
    destination: {
      get() {
        return this.$store.state.flightSimulator.destination;
      },
      set(value) {
        this.$store.commit('flightSimulator/setDestination', value);
      },
    },
    flightType: { // free or planned
      get() {
        return this.$store.state.flightSimulator.flightType;
      },
      set(value) {
        this.$store.commit('flightSimulator/changeFlightType', value);
      },
    },
    isChoosing() { 
      return (this.$route.name === 'flight-simulator' && 
        this.$store.state.general.isChoosingDestination) && 
        this.$store.state.flightSimulator.loading >= 1; 
    },
    isFree() { return (this.$store.getters['flightSimulator/isFreeFlight']); },
    isPlanned() { return (this.$store.getters['flightSimulator/isPlannedFlight']); },
  },
  methods: {
    setFocus() {
      const ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf('android') > -1
        && window.matchMedia('(max-height: 768px)').matches
        && ua.indexOf('mobile'))
      {
        // this.$refs.content.style.marginTop = '-60px';
        // const header = document.getElementsByClassName('site-header')[0];
        // const logo = document.getElementById('fp-logo');
        // header.classList.add('to-top');
        // logo.classList.add('to-top');
      }
    },
    removeFocus() {
      const ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf('android') > -1
        && window.matchMedia('(max-height: 768px)').matches
        && ua.indexOf('mobile'))
      {
        // this.$refs.content.style.marginTop = '40px';
        // const header = document.getElementsByClassName('site-header')[0];
        // const logo = document.getElementById('fp-logo');
        // header.classList.remove('to-top');
        // logo.classList.remove('to-top');
      }
    },
    closeAltPanel() {
      this.isAltPanelOpen = false;
    },
    toggleAltPanel() {
      this.isAltPanelOpen = !this.isAltPanelOpen;
    },
    onSubmit(e) {
      e.preventDefault();
      this.validateForm()
        .then(() => {
          this.form.errors = {}; // reset previous errors
          // reset elapsed days from previous simulation if necessary
          this.$store.commit('flightSimulator/setElapsedDays', 0);
          this.$store.commit('flightSimulator/setAltitudeLevel', this.selectedAlt);
          this.startAnimation();
          this.upperHeight = 0;
        }).catch((errors) => {
          this.form.errors = errors;
        });
    },
    isValidGps(text, cb) {

      const arr = text.split(',');
      if (arr.length == 2) {
        const lat = parseFloat(arr[0]);
        const lng = parseFloat(arr[1]);
        if (!isNaN(lat) && !isNaN(lng)) {
          // use this!
          if (cb) {
            cb(lat, lng);
            return true;
          }
        }
      }
      return false;
    },
    mapChanged(text) {

      if (this.isValidGps(text, 
        (lat, lng) => this.setDepartureLocation(lat, lng)) === true)
      {
        return;
      }

      if (text !== this.departureString) {
        this.departure = {};
        this.departureString = undefined;
        const map_input = document.getElementById('map');
        if (map_input !== undefined) {
          map_input.value = "";
        }
      }
    },
    map2Changed(text) {
      
      if (this.isValidGps(text, 
        (lat, lng) => this.setDestinationLocation(lat, lng)) === true)
      {
        return;
      }

      if (text !== this.destinationString) {
        this.destination = {};
        this.destinationString = undefined;
        const map_input = document.getElementById('map2');
        if (map_input !== undefined) {
          map_input.value = "";
        }
      }
    },
    setDeparture(e) {    
      this.departure =
        { lat: e.latitude, lng: e.longitude, city: e.locality, country: e.country };

      // get actual string from inputfield
      const map = document.getElementById('map');
      map.value = e.locality + ', ' + e.country;
      this.departureString = map.value;
    },
    setDestination(e) {
      this.destination =
        { lat: e.latitude, lng: e.longitude, city: e.locality, country: e.country };

      // get actual string from inputfield
      const map = document.getElementById('map2');
      map.value = e.locality + ', ' + e.country;
      this.destinationString = map.value;
    },
    validateForm() {
      const errors = {};
      let hasErrors = false;
      return new Promise((resolve, reject) => {
        if (_.isEmpty(this.departure)) { // departure always filled
          errors.departure = 'Invalid location';
          hasErrors = true;
        }
        if (_.isEmpty(this.destination) && this.flightType === 'planned') {
          errors.destination = 'Invalid destination';
          hasErrors = true;
        }
        if (hasErrors) {
          reject(errors);
        } else {
          resolve();
        }
      });
    },
    startAnimation() {
      this.$store.commit('flightSimulator/startAnimation');
      this.$store.commit('general/setFormStatus', false);
      this.$store.commit('general/setAnimationHeight', 'normal');
    },
    getLocationDep() {
      navigator.geolocation.getCurrentPosition(
        location => {        
          this.setDepartureLocation(location.coords.latitude, location.coords.longitude);
        },
        error => {
          console.error("error getting location for departure: " + error);
        }
      );
    },
    getLocationDest() {
      navigator.geolocation.getCurrentPosition(
        location => {
          this.setDestinationLocation(location.coords.latitude, location.coords.longitude);
        },
        error => {
          console.error("error getting location for destination: " + error);
        }
      );
    },
    setDepartureLocation(lat, lng) {
      this.departure = {lat: lat, lng: lng}
      this.departureString = lat + ', ' + lng;
      this.$refs.departureBox.update(this.departureString)
    },
    setDestinationLocation(lat, lng) {
      this.destination = {lat: lat, lng: lng}
      this.destinationString = lat + ', ' + lng;
      this.$refs.destinationBox.update(this.destinationString)
    },
  },
  mounted() {
    this.upperHeight = (this.$refs.content) ? `${this.$refs.content.clientHeight + 80}px` : 0;
  },  
};
</script>

<style lang="scss">
/* @import "../css/_typography.scss"; */
@import "../css/_variables_and_mixins.scss";

.main-content.over .flight-form{
    transition: margin-top .3s ease-in-out;
    background-color: black;
}
.place-input {
  display: flex;
  flex-direction: row;
  align-items: stretch;
}
.locationBtn {
  color: white;
  font-size: 1.1em;
  position: absolute;
  right: 20px;
  margin: 0px;
  padding: 0.4em 0 0 0;
  background: none;
  border: none;
}
.flight-form.wrapper {
    position: relative;
    top: 0;
    width: 450px;
    margin: 0 auto;
    background: linear-gradient(180deg, $lightBlack, black);
    padding: $marginBase $marginBase*4/5;
    color: $gray;
    text-align: center;
    @include between($medium, $large) {
        position: absolute;
        top: 300px;
        left: 50%;
        transform: translateX(-50%);
    }
    @include medium_down {
        width: auto;
        padding: $marginMobile*2/3;
        margin: 80px auto $marginMobile;
        background: $lightBlack;
        max-width: 500px;
        form {
            height: 100%;
            display: flex;
            flex-flow: column;
            justify-content: space-evenly;
        }
    }
    @include small_down {
        margin: 40px $marginMobile 0;
    }
    p {
        font-size: .85em;
    }
}
.type-selector-group{
    position: relative;
    display: block;
    text-align: center;

    input {
        display:none;
    }
    label[for="FlightTypeSelector"] {
        &:after, &:before {
            display: none;
        }
    }
    .description {
        margin: 1em auto .5em;
        min-height: 48px;
        /* color:white; */
        font-size: 10px;
        line-height: 16px;
    }

    .type-selector {
        display: flex;
        //width: 100%;
        justify-content: center;
        align-items: center;
        span {
            color: $gray;
            transition: color .4s ease;
            &.--isActive {
                color: #fff;
            }
        }
        .slider {
            display: inline-block;
            width: 44px;
            height: 25px;
            position: relative;
            cursor: pointer;
            background-color: rgba(255, 255, 255, .2);
            -webkit-transition: .4s;
            transition: .4s;
            border-radius: 34px;
            margin: 0 10px;
        }
        .slider:before {
            position: absolute;
            content: "";
            height: 25px;
            width: 25px;
            background-color: white;
            -webkit-transition: .4s;
            transition: .4s;
            border-radius: 50%;
        }
        &.planned {
            .slider:before {
                transform: translateX(-22px);
            }
        }
    }
}
.coordinates-selector-group {
    text-align: left;
    .form-group {
        margin-top: 1em;
    }
    .form-control {
        font-size: 1em;
        padding: 0.1em 0 0.3em 0;
        margin-bottom: 1.4em;
        color: white;
        border-bottom-color: #979797;
    }
    .form-control:focus {
      color: white;
    }
    .input-label {
        color: #FFF;
        text-align: center;
        padding-top: .1em;
    }
    .small {
        font-size: .6em;
    }
}
.altitude-selector-group {
    .input-label {
        color: #FFF;
        text-align: left;
        //padding-top: .1em;
        padding-left: 1.2em;
        @include small_down {
            padding-left: 0;
        }
    }
}
.input-group {
    .small {
        font-size: .6em;
        padding-top: 9px;
        @include small_down {
            padding-top: 4px;
        }
    }
}
.altitude-selector-group {
    position: relative;
    display: flex;
    align-items: center;
    @include small_down {
        align-items: flex-start;
    }
    .input-group {
        width: 110px;
        flex: 0 0 110px;
    }
    .alt-select {
        width: 90px;
        height: 30px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        @include small_down {
            width: 85px;
        }
    }
    span {
        text-align: left;
        width: 75px;
        @include small_down {
            width: 80px;
        }
    }
    i {
        background-size: cover;
        transform: rotate(0deg);
        transition: transform .2s;
        min-height: 9px;
        min-width: 11px;
        height: 9px;
        width: 11px;
        @include small_down {
            transform: rotate(180deg);
        }
        &.isOpen {
            transform: rotate(180deg);
            @include small_down {
                transform: rotate(0deg);
            }
        }
    }
    .alt-panel-wrapper {
        overflow: hidden;
        box-shadow: 0 0 30px 1px rgba(0,0,0,.5);
        position: absolute;
        bottom: -220px;
        left: 0;
        height: 220px;
        background-color: $lightBlack;
        padding: 5px 1em;
        @include small_down {
            bottom: 45px;
        }
        .altitude-panel {
            .altitude-panel-inner {
                padding-top: 0;
            }
        }
    }
    .select-slide-enter-active {
        animation: select-slide-up .3s ease-in-out;
        @include small_up {
            animation: select-slide-down .3s ease-in-out;
            width: 90px;
            overflow: hidden;
            > div {
                position: absolute;
                bottom: 0;
                width: 90px;
                left: 0;
            }
        }
    }
    .select-slide-leave-active {
        animation: select-slide-up .2s ease-in-out reverse;
        @include small_up {
            animation: select-slide-down .3s ease-in-out reverse;
            width: 90px;
            overflow: hidden;
            > div {
                position: absolute;
                bottom: 0;
                width: 90px;
                left: 0;
            }
        }
    }
}
.switch-text-enter-active {
    animation: flip-up-from-bottom .4s ease;
}
.switch-text-leave-active {
    position: absolute;
    animation: flip-up-to-top .4s ease;
}
.fade-height-leave-active {
    animation: fadeHeight .4s ease;
    overflow: hidden;
}
.fade-height-enter-active {
    animation: fadeHeight .4s ease-in-out reverse;
    overflow: hidden;
}
@keyframes select-slide-up {
    0% {height: 0;}
    100% {height: 210px;}
}
@keyframes select-slide-down {
    0% {height: 0; bottom: 0;}
    100% {height: 210px; bottom: -210px;}
}

.launch-button {
  background-color: rgba(74, 144, 226, 0.3928);
  font-size: 16px;
  border-radius: 9px;
  border: none;
  color:white;
  margin-top: 2em;
  margin-left: auto;
  margin-right: auto;
  min-height: 37px;
  padding-left: 14px;
  padding-right: 14px;
}
</style>
