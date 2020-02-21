<template>

<div class="site-header-wrapper">

    <div style="text-align: center; color: white; margin-top: 0.1em;">
        <div style="font-size: 10px;">
        Fly with
        </div>
        <div style="font-size: 15px; font-weight: normal; margin-top: -0.1em;">
        Aerocene
        </div>
    </div>

    <div class="site-header">
        <!-- <div class="spacer"></div> -->

        <div class="container">

            <b-button 
                class="a-button"
                id="float"
                :class="{'--is-predict': isPredictor}" 
                @click="clickFP"
            >
                Virtual Flight
            </b-button>

            <b-button 
                class="a-button" 
                id="archive"
                :class="{'--is-predict': !isPredictor}" 
                @click="clickA"
                v-show="archiveAllowed"
            >
                Real Flights
            </b-button>

            <div>
                <main-menu 
                    v-show="isMenuVisible" 
                    :is-choosing="isChoosing"
                />
            </div>
        </div>

        <!-- <div class="spacer"></div> -->


    </div>
</div>
</template>


<script>
import mainMenu from './parts/MainMenu';
import router from '../router'

export default {
  components: {
    mainMenu,
  },
  data() {
      return {
      }
  },
  computed: {        
    archiveAllowed() {
        // archive not allowed when:
        // STATE_MOVING_TO_DEPARTURE (1)
        // STATE_ANIMATION_ACTIVE (2)
        // STATE_MOVING_TO_DESTINATION (3)
        // STATE_WAIT_FOR_FLIGHTS(9)
        return this.$store.state.flightSimulator.visualizationState !== 1 &&
                this.$store.state.flightSimulator.visualizationState !== 2 &&
                this.$store.state.flightSimulator.visualizationState !== 3 &&
                this.$store.state.flightSimulator.visualizationState !== 9;
    },
    isPredictor() {
        return this.$store.state.general.isPredictor || false;
    },
    isOnboard() { return this.$store.state.flightSimulator.focusedExplorer > 0; },
    isChoosing() { 
        return this.$store.state.general.isChoosingDestination || this.$store.state.general.errorContent !== '';
    },
    isHome() { return this.$route.name === 'home-page'; },
    isMobile() {
        return (window.matchMedia('(max-width: 768px)').matches);
    },
    isMenuVisible() {
        return this.archiveAllowed && ((!this.isOnboard && this.isMobile) || !this.isMobile);
    },    
  },
  methods: {
    clickFP() {
        this.$store.commit('archive/clearArchiveContent');
        this.$store.commit('general/setIsPredictor', true); 
        this.$store.commit('general/closeMenu'); 

        if (this.$store.state.flightSimulator.isActive &&
            this.$store.state.flightSimulator.visualizationState !== 4)
        {
            this.$dialog.confirm('This Action will reset the current simulation and start a new one. Please confirm to continue')
            .then(() => {
                this.initNew();
            });
        } else {
            this.initNew();
        }

        router.push('/flight-simulator');
      },
    clickA() {
        this.$store.commit('general/setIsPredictor', false);
        this.$store.commit('general/closeMenu'); 
        this.$store.commit('flightSimulator/setVisualizationState', 10);
        router.push('/globe-archive');
    },
    initNew() {
        this.$store.dispatch('flightSimulator/resetVisualization');
        this.$store.commit('general/closeMenu');
        //   this.$store.commit('flightSimulator/setVisualizationState', 8);
        this.$store.commit('general/setFormStatus', true);
        this.$store.commit('general/setModalShow', true);
    },
  }
};
</script>


<style lang="scss">
@import "./css/_variables_and_mixins.scss";
@import "./css/_typography.scss";

.spacer {
    min-width: 8px;
    max-width: 10%;
    width: 10%;
    /* width: initial; */

    @include small_down {
        width: 30px;        
        max-width: 30px;
  }
}
.container {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
}
.a-button {    
    text-transform: none !important;
    font-size: 16px !important;
    background-color: transparent;
    transition: background-color .5s;
    border: none;
    margin-top: 0px !important;

    overflow: hidden;
    text-overflow: ellipsis;

    padding: 8px 14px 8px 14px !important;
    white-space: nowrap;

    &.--is-predict{
        background-color: rgba(74, 144, 226, 0.3928);
    }

    @media screen and (max-width: 316px) {
        width: calc((100% - 0px)*0.5);
        /* font-size: 12px !important; */
    }
}


.site-header-wrapper {
    position: fixed;
    top: 0;
    width: 100%;
    height: 84px;

    display: flex;
    flex-direction: column;

    z-index: 50; /* lower than login background! */
    background-color: rgba(0, 0, 0, 0.8) !important;
}

.site-header {
    width: calc(100% - 60px);
    display: flex;

    margin-top: 6px;
    
    padding-left: 20%;
    padding-right: 10px;

    transition: top .3s ease-in-out;
    @include small_down {
        padding-left: 10px;

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
