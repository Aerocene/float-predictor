<template>
<transition appear disappear>
    <div class="main-content" v-show="!isArchiveContent">
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

.main-content {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 20;
  /* padding-top: 120px; */
  padding-bottom: 2em;
  padding-left: 0.8em;
  padding-right: 0.8em;
  overflow: hidden;

  transition: opacity 0.4s ease;
  background: transparent;

  text-align: left;
  
  display: flex;
  display: -webkit-box;
  flex-direction: column;
  justify-content: end;

  pointer-events: none;
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
