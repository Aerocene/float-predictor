<template>
<transition appear name="fade">
    <div class="main-content" v-if="!isArchiveContent">
      <article class="form-container" ref="content">

        <!-- section 1 -->
        <div class="flight-section-1">

          <div class="legend-item">
            Tethered Flights
            <div class="iconbox">
              <img src="/img/marker-tethered.png"/>
            </div>
          </div>

          <div class="legend-item">
            Free Flights
            <div class="iconbox">
              <img src="/img/marker-free.png"/>
            </div>
          </div>

          <div class="legend-item">
            Human Flights
            <div class="iconbox">
              <img src="/img/marker-human.png"/>
            </div>
          </div>
        </div>

        <div class="legend-item">
          Museo Aerosolar
          <div class="iconbox2">
            <img src="/img/marker-museo.png"/>
          </div>
        </div>
        
        <div class="legend-item">
          Community Member
          <div class="iconbox2">
            <img src="/img/marker-member.png"/>
          </div>
        </div>

      </article>
    </div>
</transition>
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

  transition: opacity 0.4s ease;
  background: transparent;

  text-align: left;

  pointer-events: none;

  visibility: hidden;
  @media screen and (min-height: 400px) and (min-width: 320px) {
    visibility: visible;
  }
}



.form-container {
  width: 90%;
  max-width: 400px;
  min-width: 250px;
  background: #252423;
  border-radius: 14px;
  padding: 0.8em;
  font-size: 14px;
  line-height: 26px;
  white-space: nowrap;


  /* or 20px */
  letter-spacing: 2.1px;
  text-indent: 7px;

  .flight-section-1 {
    background: rgba(91, 87, 87, 0.91);
    border-radius: 14px;
    width: 100%;
    margin-left: 1em;
    margin-right: 1em;
    margin-bottom: 0.5em;
    padding: 0.2em 0 0 0;
  }

  .legend-item {
    width: 100%;
    display: flex;    
    justify-content: space-between;

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
}

</style>

<script>
export default {
  name: 'GlobeArchive',
  data() {
    return {
    };
  },
  computed: {
    archiveContent() {
      return this.$store.state.archive.content;
    },
    isArchiveContent() {
      return this.$store.state.archive.content.title || false;
    },    
  }
};
</script>
