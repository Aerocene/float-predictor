<template>
    <div 
      class="main-content"       
      
    >
<transition name="fadeout">
      <article 
        class="form-container" 
        ref="content"        
        v-show="!isArchiveContent"
      >

        <!-- <div role="tablist"> -->
        <div class="legend-item">

          <div class="item-header" v-b-toggle.accordion-1>
            Tethered Flights
            <div class="iconbox">
              <img src="/img/marker-tethered.png"/>
            </div>
          </div>

          <b-collapse id="accordion-1" class="item-content" visible accordion="archive-accordion" role="tabpanel">
            <div v-for="(item, key) in tethered" v-bind:key="key">
              {{getTitle(item)}}
            </div>
          </b-collapse>
        </div>

        <div class="legend-item">
          <div class="item-header" v-b-toggle.accordion-2>
            Free Flights
            <div class="iconbox">
              <img src="/img/marker-free.png"/>
            </div>
          </div>

          <b-collapse id="accordion-2" class="item-content" accordion="archive-accordion" role="tabpanel">
            <div v-for="(item, key) in free" v-bind:key="key">
              {{getTitle(item)}}
            </div>
          </b-collapse>
        </div>

        <div class="legend-item">      
          <div class="item-header" v-b-toggle.accordion-3>
            Human Flights
            <div class="iconbox">
              <img src="/img/marker-human.png"/>
            </div>
          </div>

          <b-collapse id="accordion-3" class="item-content" accordion="archive-accordion" role="tabpanel">
            <div v-for="(item, key) in human" v-bind:key="key">
              {{getTitle(item)}}
            </div>
          </b-collapse>
        </div>

        <hr>

        <div class="legend-item">      
          <div class="item-header" v-b-toggle.accordion-4>
            Museo Aerosolar
            <div class="iconbox2">
              <img src="/img/marker-museo.png"/>
            </div>
          </div>

          <b-collapse id="accordion-4" class="item-content" accordion="archive-accordion" role="tabpanel">
            <div v-for="(item, key) in museo" v-bind:key="key">
              {{getTitle(item)}}
            </div>
          </b-collapse>
        </div>

        <div class="legend-item">      
          <div class="item-header" v-b-toggle.accordion-5>
            Community Member
            <div class="iconbox2">
              <img src="/img/marker-member.png"/>
            </div>
          </div>

          <b-collapse id="accordion-5" class="item-content" accordion="archive-accordion" role="tabpanel">
              <div v-for="(item, key) in member" v-bind:key="key">
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
  padding: 0.8em;
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
    width: 100%; 
    border-top:1px solid white;
    margin: 0.8em;
  }

  .legend-item {
    width: 100%;
    
    .item-header {
      width: 100%;
      display: flex;    
      justify-content: space-between;
      white-space: nowrap;

      .iconbox {
        max-height: 30px;
        max-width: 60px;
        overflow: hidden;
        img {
          width: 80%;
          margin-left: 10px;
        }
      }
  
      .iconbox2 {
        max-height: 30px;
        max-width: 60px;
        overflow: hidden;
  
        img {
          margin-top: -15px;
          margin-left: 10px;
          width: 80%;
        }
      }
    }

    .item-content {
      overflow-y: scroll;
      padding-left: 1em;
      padding-right: 1em;
      font-size: 12px;
      white-space: nowrap;

      max-height: 40vh;

      /* transition: height 0.3s ease; */
    }

  }
}

</style>

<script>

var he = require('he');

export default {
  name: 'GlobeArchive',
  data() {
    return {      
      // tethered: [{title: "uno"}, {title: "uno"}, {title: "uno"}],
      // free: ["free1", "free2", "free3", "free4"],
      // human: ["human_1", "human_1", "human_5"],
      // museo: ["uno", "dos", "tres"],
      // member: ["uno", "dos", "tres"],
    };
  },
  mounted() {
    // disable all events on the legend
    $('main-archive').bind('blur change click dblclick error focus focusin focusout hover keydown keypress keyup load mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup resize scroll select submit', function(event){
      event.stopPropagation();
    });
  },
  computed: {
    archiveContent() {
      return this.$store.state.archive.content;
    },
    isArchiveContent() {
      return this.$store.state.archive.content.title || false;
    },
    tethered() {
      return this.$store.state.archive.archiveTethered || [];
    },
    free() {
      return this.$store.state.archive.archiveTethered || [];
    },
    human() {
      return this.$store.state.archive.archiveTethered || [];
    },
    museo() {
      return this.$store.state.archive.archiveTethered || [];
    },
    member() {
      return this.$store.state.archive.archiveTethered || [];
    },
  },
  methods: {    
    getTitle(item) {
      return he.decode(item.title.rendered);
    },
    setArchiveContent(title) {
      content = {};
      content.title = title || "Test";
      this.$store.commit('archive/setArchiveContent', content);
    },
    onTethered(e) {    
      this.setArchiveContent("Tethered");
    },
    onFree(e) {
      this.setArchiveContent("free");
    },
    onHuman(e) {
      this.setArchiveContent("human");
    },
    onMuseo(e) {
      this.setArchiveContent("museo");
    },
    onMember(e) {
      // this.setArchiveContent();
      console.log(e.target);


      elm = document.createElement("div");
      elm.innerHTML = "test";

      this.$refs.commContent.appendChild(elm);

      this.$refs.commContent.style.height = this.$refs.commContent.childElementCount*2 + "em";
    }
  }
};
</script>
