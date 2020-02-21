<template>
  <div id="gallery" class="main-content gallery" v-infinite-scroll="loadMore"
       infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <h1 class="entry-title">Aeroglyphs Archive</h1>
      <h3 class="entry-subtitle">
          The trajectories of aerosolar journeys create signatures for the air, or Aeroglyphs, which petition for the planetary independence from fossil fuels.
      </h3>
      <div class="stats">
        <div class="saved">
          <div class="h2">{{count}}</div>
          <p>Aeroglyphs saved</p>
        </div>
        <div class="travelled">
          <div class="h2">{{kmTravelled.toLocaleString('en')}}</div>
          <p>Kilometers travelled free from carbon emissions (TOTAL)</p>
          <div class="h2">{{co2SavedInTons.toLocaleString('en')}}</div>
          <p>tons CO2 Saved (TOTAL)</p>
        </div>
      </div>
      <div class="path-wrapper">
        <div class="gallery-item" v-for="item in flights" :key="item._id">
          <div class="gallery-item-inside">

            <img :src="item.svgB64 != undefined ? item.svgB64 : getSVGPath(item)"/>

            <div class="info">
              <div class="aer-code">
                AER {{(count - flights.indexOf(item)).toLocaleString('en')}}
              </div>
              <div class="date-created">
                {{getDate(item.created)}}
              </div>

              <!--  -->
              <div v-if="item.destination_city" class="additional-info">
                <p>
                  Departed from <strong>{{item.departure_city}}</strong>.
                </p>
                <p>
                  Arrived within <strong>{{item.min_dist.toLocaleString('en')}}</strong> km
                  of <strong>{{item.destination_city}}</strong>
                  in <strong>{{item.min_time.toFixed(2)}} days</strong>.</p>
                <p>
                  Travelled a total of
                  <strong>{{parseInt(item.distance * 1000).toLocaleString('en')}} km</strong>.
                </p>
                <p v-if="item.savedCO2InKilograms !== undefined">
                  <strong>{{parseInt(item.savedCO2InKilograms).toLocaleString('en')}} kg </strong> CO2 Saved for this journey
                </p>
              </div>
              <!-- free flights -->
              <div v-else class="additional-info">
                  <p>Departed from <strong>{{item.departure_city}}</strong>.</p>
                  <p>Travelled a total of
                      <strong>{{parseInt(item.distance * 1000).toLocaleString('en')}} km</strong>
                      in <strong>{{item.min_time}} days</strong>.
                  </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="busy" class='small-loader'>
        <Loading></Loading>
      </div>
      <!-- <back-to-viz /> -->
  </div>
</template>

<script>
/**
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
*/
import moment from 'moment';
import Loading from '../parts/Loading.vue';
import BackToViz from '../parts/BackToViz.vue';
import loadFlights from '../../api/flights/client/loadFlights';
import Trajectory from '../visualization/Trajectory';
import calculateCO2PerKilometers from '../../api/flights/calculateCO2PerKilometers'

export default {
  name: 'Gallery',
  data() {
    return {
      flights: [],
      totalDistance: 0,
      count: 0,
      busy: false,
      page: 1,
    };
  },
  mounted() {
    this.done = false;
    this.addPage(this.page);
  },
  components: {
    BackToViz,
    Loading,
  },
  computed: {
    kmTravelled() {
      return parseInt(this.totalDistance * 1000);
    },
    co2SavedInTons() {
      return (calculateCO2PerKilometers(this.kmTravelled)/1000.0).toFixed(2);
    },
  },
  methods: {
    loadMore() {
      if (!this.busy) {        
        this.addPage(this.page);
      }
    },
    addPage(i) {
      this.busy = true;
      const prom = loadFlights(i);
      prom.then((data) => {

        if (data)
        {
          if (data.flights) {
            this.flights = this.flights.concat(data.flights);
          }
          if (data.total_distance) {
            this.totalDistance = data.total_distance;
          }
          if (data.count) {
            this.count = data.count;
          }
          
          this.busy = false;
          this.page += 1;
        }
      });   
    },
    getDate(dt) {
      return moment(dt).format('MMM Do, YYYY');
    },
    getSVGPath(item) {
      return `svg/${String(item.id)}.svg`;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../css/_variables_and_mixins.scss';

  .main-content.gallery {
      padding-top: 9.375rem;
      padding-left: 12rem;
      padding-right: 12rem;
      @include up(1440px) {
          padding-left: 0;
          padding-right: 0;
          max-width: 1100px;
      }
      @include down($large) {
          padding-left: 6rem;
          padding-right: 6rem;
      }
      @include medium_down {
          padding-left: 1rem;
          padding-right: 1rem;
      }
      text-align: center;
      margin: 0 auto;

      .entry-subtitle {
          max-width: 20em;
          margin-left: auto;
          margin-right: auto;
      }
      .small-loader{
          transition: opacity 1.0s ease;
          height: 50px;
          width: 100%;
          position: relative;
      }
      .main-application{
          overflow: scroll !important;
      }
      p {
          color: $gray;
      }
      .stats {
          display: flex;
          flex-flow: row wrap;
          div {
              width: 50%;
              text-align: center;
              .h2 {
                  margin-left: auto;
                  margin-right: auto;
              }
              @include medium_down {
                  width: 100%;
              }
          }
      }
      .path-wrapper {
          margin-top: 4rem;
          display: flex;
          flex-flow: row wrap;
          position: relative;
          padding: 1rem;
          justify-content: center;
          align-items: center;
      }
      .gallery-item {
          height: 245px;
          overflow: hidden;
          width: 18%;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          font-size: 1rem;
          @include down($xlarge) {
              width: 25%;
          }
          @include down($large) {
              width: 33.33%;
          }
          @include medium_down {
              width: 50%;
          }
          .gallery-item-inside {
              min-width: 85%;
              padding: 1rem 0 1.5rem 0;
              border: 20px solid black;
              border-top: 0;
              border-bottom: 0;
              box-sizing: content-box;
              background-color: $bodyColor;
              transition: background-color .3s ease, border-color .3s ease;
              p {
                  color: rgba(255,255,255,.8);
                  margin-top: .8em;
              }
              strong {
                  color: #FFF;
              }
          }
          .info {
              .aer-code {
                  margin-top: 0;
                  font-size: 1em;
              }
              .date-created {
                  font-size: .8em;
              }
              .additional-info {
                  text-align: left;
                  margin-top: 1.5rem;
                  transition: opacity .2s ease;
                  opacity: 0;
                  font-size: .8em;
              }
              strong {
                  @extend %raleway_bold;
              }
          }
          img {
              width: 75%;
              height: auto;
              margin-bottom: 1.2rem;
          }
          &:hover {
              overflow: visible;
              z-index: 1;
              .gallery-item-inside {
                  background-color: $lightBlack;
                  border-color: $lightBlack;
              }
              .additional-info {
                  opacity: 1;
              }
              img svg
              {
                  box-shadow: 0px 0px 5px #fff;
              }
          }
      }
  }
</style>
