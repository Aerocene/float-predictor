<template>
    <div class="site-header" :class="{'--logged-out': isLoggedOut}">

        <b-button ref="fp" id="fpBtn" class="a-button btn" @click="clickFP">Float Predictor</b-button>
        <b-button ref="ar" id="aBTn" class="a-button" @click="clickA">Archive</b-button>
        <div></div>
        <main-menu v-if="isMenuVisible" :is-choosing="isChoosing" />

    </div>
</template>


<script>
import mainMenu from './parts/MainMenu';
import navBrand from './parts/NavBrand';
import router from '../router'

export default {
  components: {
    mainMenu, navBrand,
  },
  data() {
      return {
          isPredictor: true,
      }
  },
  mounted() {
    this.$refs.fp.style.backgroundColor = this.isPredictor ? ("rgba(74, 144, 226, 0.3928)") : "transparent";
    this.$refs.ar.style.backgroundColor = this.isPredictor ? "transparent" : ("rgba(74, 144, 226, 0.3928)");
  },
  computed: {  
    isLoggedOut() {
      return this.$store.state.auth.user === undefined || this.$store.state.auth.user === null;
    },    
    isOnboard() { return this.$store.state.flightSimulator.focusedExplorer > 0; },
    isChoosing() { return this.$store.state.general.isChoosingDestination; },
    isHome() { return this.$route.name === 'home-page'; },
    isMobile() {
        return (window.matchMedia('(max-width: 768px)').matches);
    },
    isMenuVisible() {
        return ((!this.isOnboard && this.isMobile) || !this.isMobile);
    },
  },
  watch: {
      isPredictor(v) {
          console.log("re" + this.isPredictor);
          this.$refs.fp.style.backgroundColor = v ? ("rgba(74, 144, 226, 0.3928)") : "transparent";
          this.$refs.ar.style.backgroundColor = v ? "transparent" : ("rgba(74, 144, 226, 0.3928)");
      }
  },
  methods: {
      clickFP() {
          this.isPredictor = true;
          this.$store.commit('general/closeMenu'); 
          router.push('/flight-simulator');
      },
      clickA() {
          this.isPredictor = false;
          this.$store.commit('general/closeMenu'); 
          router.push('/globe-archive');
      }
  }
};
</script>


<style lang="scss">
@import "./css/_variables_and_mixins.scss";
@import "./css/_typography.scss";
/* body.flight-simulator .choosing-destination .site-header {
//    position: relative;
//   background-color: transparent;
} */


.a-button {    
    text-transform: none !important;
    font-size: 16px !important;
    background-color: transparent;
    transition: background-color .5s;
    border: none;
    margin-top: 0px !important;
    padding-left: 14px !important;
    padding-right: 14px !important;
    white-space: nowrap;
}
/* .a-button:active {
    background-color: rgba(74, 144, 226, 0.3928);    
} */

.site-header {
    position: relative;
    padding-right: 40px;
    padding-left: 50px;

    display: flex;
    /* display: -webkit-box; */
    justify-content: space-between;
    align-items: center;

    z-index: 50 !important; /* lower than login background! */
    background-color: rgba(0, 0, 0, 0.8) !important;
    transition: top .3s ease-in-out;
    @include large_down {
        position: fixed;
        top: 0;
        height: 65px;
        width: 100%;
        &.is-onboard {
            display: none;
        }
    }
    &.--logged-out {
      display: none;
    }
    /* &:before {
        content: '';
        display: block;
        height: 100%;
        position: absolute;
        top: 0; left: 0;
        opacity: 0;
        width: 100%;
        z-index: -100;
        transition: opacity 0.4s;
        background: linear-gradient( to bottom,
                rgba(0,0,0,1) 0%,
                rgba(0,0,0,1) 40%,
                rgba(0,0,0,.9) 90%,
                rgba(0,0,0,0) 100%);
    } */
    /* &.--scroll:before {
        opacity: 1;
    } */
    /* &.to-top {
        top: -60px !important;
    } */
    .nav-brand {
        color: #fff;
        display: block;
        opacity: 0;
        position: fixed;
        top: 0;
        left: 0;
        padding: $marginBase;
        transition: opacity .2s ease;
        @include large_down {
            padding: 2rem $marginMobile $marginMobile;
        }
    }
    .logo {
        @extend %raleway_bold;
        text-transform: uppercase;
        text-decoration: none;
        font-size: 1.5rem; // 24px
        transition: top .3s ease-in-out;

        .title {
            color: #FFF;
        }
        .subtitle {
            @include medium_up{
                margin-bottom: 2.625rem; // 42px
            }
            color: $gray;
        }
        @include down($xlarge) {
            font-size: 1.2rem;
        }
        @include medium_down {
            position: fixed;
            top: $marginMobile;
            left: $marginMobile;
            text-align: left;
            font-size: 1rem;
        }
        @include medium_down {
            transform: translateY(-25%);
        }
    }
    .read-more {
        margin-top: 1.5rem;
        display: none;
        @include down($xlarge) {
            font-size: .85em;
        }
    }
    &.--pages .nav-brand {
        opacity: 1;
        .intro-description {
            max-width: 230px;
            @include down($xlarge) {
                font-size: .85em;
            }
            @include medium_down {
                display: none;
            }
        }
        .read-more {
            display: block;
            @include medium_down {
                display: none;
            }
        }
    }
    &.--home .nav-brand {
        opacity: 1;
        text-align: center;
        top: 10%;
        @include medium_up {
            left: 50%;
            transform: translateX(-50%);
        }
        .intro-description {
            @extend .h4;
            @include medium_up {
                max-width: 450px;
            }
            @include medium_down {
                text-align: left;
                font-size: 1em;
                line-height: 1.45;
            }
        }
        .intro-devserver {
            @extend .h4;
            color:brown;
            text-transform: uppercase;
            @include medium_up {
                max-width: 450px;
            }
            @include medium_down {
                font-size: 1em;
                line-height: 1.45;                
            }
        }
        .logo {
            margin: 0 auto;
        }
    }
    &.to-top {
        top: -60px;
    }
}
</style>
