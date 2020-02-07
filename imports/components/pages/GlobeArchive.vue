<template>
    
    <div class="main-content">

<transition name="fadeout">
      <article 
        class="form-container" 
        ref="content"        
        v-show="show"
      >

        <!-- <div role="tablist"> -->
        <div class="legend-item">
          <div class="item-header">
            <span v-b-toggle.accordion-1>Upcoming Flights</span>
            <div class="iconbox" @click="toggleUpcoming">
              <img src="/img/marker-upcoming.png" :class="{'--disabled': !archiveUpcomingEnabled}"/>
            </div>
          </div>

          <b-collapse ref="acc1" id="accordion-1" class="item-content" accordion="archive-accordion" role="tabpanel">
            <div class="archive-item" v-for="(item, key) in upcoming" v-bind:key="key" @click="onItemClicked(item)" :class="{'--isPacha': isPacha(item)}">
              <hr>
              {{getTitle(item)}}
            </div>
          </b-collapse>
        </div>

        <hr>

        <div class="legend-item">
          <div class="item-header">
            <span v-b-toggle.accordion-2>Tethered Flights</span>
            <div class="iconbox" @click="toggleTethered">
              <img src="/img/marker-tethered.png" :class="{'--disabled': !archiveTetheredEnabled}"/>
            </div>
          </div>

          <b-collapse ref="acc2" id="accordion-2" class="item-content" accordion="archive-accordion" role="tabpanel">
            <div class="archive-item" v-for="(item, key) in tethered" v-bind:key="key" @click="onItemClicked(item)" :class="{'--isPacha': isPacha(item)}">
              <hr>
              {{getTitle(item)}}
            </div>
          </b-collapse>
        </div>

        <div class="legend-item">
          <div class="item-header">
            <span v-b-toggle.accordion-3>Free Flights</span>
            <div class="iconbox" @click="toggleFree">
              <img src="/img/marker-free.png" :class="{'--disabled': !archiveFreeEnabled}"/>
            </div>
          </div>

          <b-collapse ref="acc3" id="accordion-3" class="item-content" accordion="archive-accordion" role="tabpanel">
            <div class="archive-item" v-for="(item, key) in free" v-bind:key="key" @click="onItemClicked(item)" :class="{'--isPacha': isPacha(item)}">
              <hr>
              {{getTitle(item)}}
            </div>
          </b-collapse>
        </div>

        <div class="legend-item">      
          <div class="item-header">
            <span v-b-toggle.accordion-4>Human Flights</span>
            <div class="iconbox" @click="toggleHuman">
              <img src="/img/marker-human.png" :class="{'--disabled': !archiveHumanEnabled}"/>
            </div>
          </div>

          <b-collapse ref="acc4" id="accordion-4" class="item-content" accordion="archive-accordion" role="tabpanel">
            <div class="archive-item" v-for="(item, key) in human" v-bind:key="key" @click="onItemClicked(item)" :class="{'--isPacha': isPacha(item)}">
              <hr>
              {{getTitle(item)}}
            </div>
          </b-collapse>
        </div>

        <div class="legend-item">      
          <div class="item-header">
            <span v-b-toggle.accordion-5>Museo Aero Solar</span>
            <div class="iconbox2" @click="toggleMuseo">
              <img src="/img/marker-museo.png" :class="{'--disabled': !archiveMuseoEnabled}"/>
            </div>
          </div>

          <b-collapse ref="acc5" id="accordion-5" class="item-content" accordion="archive-accordion" role="tabpanel">
            <div class="archive-item" v-for="(item, key) in museo" v-bind:key="key" @click="onItemClicked(item)" :class="{'--isPacha': isPacha(item)}">
              <hr>
              {{getTitle(item)}}
            </div>
          </b-collapse>
        </div>

        <hr>

        <div class="legend-item">      
          <div class="item-header">
            <span v-b-toggle.accordion-6>Community Member</span>
            <div class="iconbox2" @click="toggleMember">
              <img src="/img/marker-member.png" :class="{'--disabled': !archiveMemberEnabled}"/>
            </div>
          </div>

          <b-collapse ref="acc6" id="accordion-6" class="item-content" accordion="archive-accordion" role="tabpanel">
              <div class="archive-item" v-for="(item, key) in member" v-bind:key="key" @click="onItemClicked(item)">
                <hr>
                {{getTitle(item)}}
              </div>
          </b-collapse>
        </div>
  
      </article>
</transition>
    </div>
</template>

<style lang="scss" scoped>
@import "../css/_variables_and_mixins.scss";

.main-content {
  position: absolute;
  width: 100%;
  bottom: 0px;

  z-index: 20;
  overflow: hidden;

  padding-bottom: 2em;
  padding-left: 0.8em;
  padding-right: 0.8em;

  background: transparent;

  text-align: left;

  /* pointer-events: none; */

  visibility: hidden;
  @media screen and (min-height: 400px) and (min-width: 320px) {
    visibility: visible;
  }
}

.fade-enter, .fadeout-enter {
  bottom: -300px;
  opacity: 0;
}
.fade-enter-to, .fadeout-enter-to {
  bottom: 0px;
  opacity: 100;
}
.fade-enter-active, .fadeout-enter-active, .fadeout-leave-active {
  transition: all 0.4s ease;
  /* transition-property: opacity, bottom; */
}
.fade-leave, .fadeout-leave {
  opacity: 100;
  bottom: 0px;
}
.fade-leave-to, .fadeout-leave-to {
  bottom: -300px;
  opacity: 0;
}


/* .form-container * {
  width: 100%;
} */

.form-container {
  width: 90%;
  max-width: 400px;
  min-width: 250px;
  background: rgba(59, 59, 59, 0.925);
  border-radius: 14px;
  padding: 0.8em 0.8em 0.8em 0.2em;
  font-size: 14px;
  line-height: 26px;

  /* max-height: 80vh; */
  
  /* or 20px */
  letter-spacing: 2.1px;
  text-indent: 7px;

  .flight-section-1 {
    background: rgba(107, 102, 102, 0.91);
    border-radius: 14px;
    width: 100%;
    margin-left: 1em;
    margin-right: 1em;
    margin-bottom: 0.5em;
    padding: 0.2em 0 0 0;
  }

  hr {
    width: 85%; 
    border-top:1px solid rgba(130, 130, 130, 0.6);
    margin: 0.3em;
  }

  .legend-item {
    width: 100%;
    
    .item-header::before {
      content: url('/assets/icons/arrow_acc-open.svg');
    }
    .item-header.collapsed::before {
      content: url('/assets/icons/arrow_acc-close.svg');
    }
    .item-header {
      width: 100%;
      display: flex;    
      justify-content: space-between;
      white-space: nowrap;

      cursor: pointer;

      span {
        flex-grow: 1;
      }

      .iconbox {
        max-height: 30px;
        max-width: 60px;
        overflow: hidden;
        img {
          width: 80%;
          margin-left: 10px;
        }
        img.--disabled {
          opacity: 0.4;
        }
      }
  
      .iconbox2 {
        max-height: 30px;
        max-width: 60px;
        overflow: hidden;
  
        img {
          margin-top: -10px;
          margin-left: 10px;
          width: 80%;
        }
        img.--disabled {
          opacity: 0.4;
        }
      }
    }

    .item-content {
      overflow-y: scroll;
      overflow-x: hidden;
      padding-left: 2.3em;
      padding-right: 3em;
      font-size: 12px;
      /* white-space: nowrap; */

      max-height: 40vh;
      cursor: pointer;

      /* transition: height 0.3s ease; */
      /* div::before {
        content: "";
        margin-left: -0.6em;
      } */
    }

    .archive-item {
      color: rgb(196, 196, 196);
      hr {
        margin: 0;
        width: 100%;
        border-top:1px solid rgba(182, 182, 182, 0.3);
      }
    }

    .archive-item.--isPacha {
      color: red;
    }

  }
}

</style>

<script>

import Util from '../visualization/Util';
import router from '../../router';

var he = require('he');

export default {
  name: 'GlobeArchive',
  data() {
    return {
    };
  },
  props: ['page'],
  mounted() {
    // disable all events on the legend
    $('main-archive').bind('blur change click dblclick error focus focusin focusout hover keydown keypress keyup load mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup resize scroll select submit', function(event){
      event.stopPropagation();
    });

    // if "page"
    if (this.page) {
      console.log("page: " + this.page);
      // get
    }
    
  },
  computed: {
    show() {
      const s = this.$store.state.archive.content.title === undefined && this.$store.state.archive.showLegend;
      if (s === true) {
        // this.$root.$emit('bv::toggle::collapse', 'accordion-6');
        // this.$root.$emit('bv::toggle::collapse', 'accordion-5');
        // this.$root.$emit('bv::toggle::collapse', 'accordion-4');
        // this.$root.$emit('bv::toggle::collapse', 'accordion-3');
        // this.$root.$emit('bv::toggle::collapse', 'accordion-2');
        // this.$root.$emit('bv::toggle::collapse', 'accordion-1');
        // this.$refs.acc1.visible = false;
        
        // this.$refs.acc1.close();
        // const e = document.getElementById("accordion-1");
        // if (e) {
        //   e.close();
        // }
      }

      return s;
    },
    upcoming() {
      return this.$store.state.archive.archiveUpcoming || [];
    },
    tethered() {
      return this.$store.state.archive.archiveTethered || [];
    },
    free() {
      return this.$store.state.archive.archiveFree || [];
    },
    human() {
      return this.$store.state.archive.archiveHuman || [];
    },
    museo() {
      return this.$store.state.archive.archiveMuseo || [];
    },
    member() {
      return this.$store.state.archive.archiveMember || [];
    },
    archiveUpcomingEnabled() { return this.$store.state.archive.archiveUpcomingEnabled; },
    archiveTetheredEnabled() { return this.$store.state.archive.archiveTetheredEnabled; },
    archiveFreeEnabled() { return this.$store.state.archive.archiveFreeEnabled; },
    archiveHumanEnabled() { return this.$store.state.archive.archiveHumanEnabled; },
    archiveMuseoEnabled() { return this.$store.state.archive.archiveMuseoEnabled; }, 
    archiveMemberEnabled() { return this.$store.state.archive.archiveMemberEnabled; }, 
  },  
  watch: {
    page(v) {
      console.log("page changed: "+ v);
    }
  },
  methods: {    
    getTitle(item) {
      return he.decode(item.title.rendered).trim();
    },
    isPacha(item) {
      return this.getTitle(item).includes("Aerocene Pacha");      
    },
    onItemClicked(item) {

      // collapse all
      // this.$root.$emit('bv::toggle::collapse', 'accordion-6');
      // this.$root.$emit('bv::toggle::collapse', 'accordion-5');
      // this.$root.$emit('bv::toggle::collapse', 'accordion-4');
      // this.$root.$emit('bv::toggle::collapse', 'accordion-3');
      // this.$root.$emit('bv::toggle::collapse', 'accordion-2');
      // this.$root.$emit('bv::toggle::collapse', 'accordion-1');

      // TODO: instead browse to site
      // router.push(`/globe-archive?p=${item.id}`);

      // change location
      this.$store.commit('archive/setLocation', {
        lat: item.acf.map.lat, 
        lng: item.acf.map.lng,
        archiveItem: Util.convertArchiveItem(item)
      });

      this.$store.commit('archive/setShowLegend', false);
    },
    toggleUpcoming(e) {
      this.$store.commit('archive/setArchiveUpcomingEnabled', !this.$store.state.archive.archiveUpcomingEnabled);
    },
    toggleTethered(e) {
      this.$store.commit('archive/setArchiveTetheredEnabled', !this.$store.state.archive.archiveTetheredEnabled);
    },
    toggleFree(e) {
      this.$store.commit('archive/setArchiveFreeEnabled', !this.$store.state.archive.archiveFreeEnabled);
    },
    toggleHuman(e) {
      this.$store.commit('archive/setArchiveHumanEnabled', !this.$store.state.archive.archiveHumanEnabled);
    },
    toggleMuseo(e) {
      this.$store.commit('archive/setArchiveMuseoEnabled', !this.$store.state.archive.archiveMuseoEnabled);
    },
    toggleMember(e) {
      this.$store.commit('archive/setArchiveMemberEnabled', !this.$store.state.archive.archiveMemberEnabled);
    },
  }
};
</script>
