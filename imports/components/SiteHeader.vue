<template>

<div class="site-header-wrapper">

    <div>
        <main-menu 
            v-show="isMenuVisible" 
            :is-choosing="isChoosing"
        />
    </div>

    <div style="text-align: center; color: white; margin-top: 0.1em;">
        <div style="font-size: 10px;">
        Fly with
        </div>
        <div style="font-size: 15px; font-weight: normal; margin-top: -0.1em;">
        Aerocene
        </div>
    </div>

    <!-- <div class="site-header">
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
        </div>
    </div> -->

    <div class="modeslider-container">
        <div class="modeslider-line">
        </div>

        <div class="modeslider">
            <div class="modeslider-item" @click="clickFP">
                <div class="modeslider-btn">
                    <img src="/img/modesliderkite.svg" alt="" v-if="isVirtual">
                </div>
                <div class="modeslider-txt">
                    Virtual
                </div>
            </div>
            <div class="modeslider-item" @click="clickAR" id="openARBtn">
                <div class="modeslider-btn">
                    <img src="/img/modesliderkite.svg" alt="" v-if="isAugmented">
                </div>
                <div class="modeslider-txt">
                    Augmented
                </div>
            </div>
            <div class="modeslider-item" @click="clickA">
                <div class="modeslider-btn">
                    <img src="/img/modesliderkite.svg" alt="" v-if="isReal">
                </div>
                <div class="modeslider-txt">
                    Real
                </div>
            </div> 
        </div>
    </div>

</div>
</template>




<style lang="scss">
@import "./css/_variables_and_mixins.scss";
@import "./css/_typography.scss";

.modeslider-container {
    margin-top: 26px;
    margin-left: 25%;
    margin-right: 25%;

    @include medium_down {
        margin-left: 20px;
        margin-right: 20px;
    }

    .modeslider-line {
        position: relative;
        height: 0px;
        top: 9px;
        margin-left: 20px;
        margin-right: 14px;
        z-index: -1;

        border: 1px solid #706D6D;
    }

    .modeslider {    
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .modeslider-item {

            display: flex;
            flex-direction: column;

            .modeslider-btn {
                align-self: center;
                height: 16px;
                width: 16px;
                border-radius: 100%;
                background: black;
                border: 1px solid #706D6D;

                img {
                    margin-left: -50%;
                    margin-top: -120%;
                }
            }
            .modeslider-txt {
                font-family: "Raleway-Regular";
                font-style: normal;
                font-weight: 500;
                font-size: 16px;
                line-height: 19px;
                margin-top: 4px;

                text-align: center;

                color: #969595;
            }
        }
    }
}



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

    padding: 6px 14px 6px 14px !important;
    white-space: nowrap;

    &.--is-predict{
        background-color: rgba(74, 144, 226, 0.3928);
    }

    @media screen and (max-width: 321px) {
        font-size: 14px !important;
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
    height: 110px;

    display: flex;
    flex-direction: column;

    z-index: 200; /* lower than login background! */
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
        padding-left: 10%;

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
  mounted() {
    var arbutton = document.getElementById("openARBtn");
    if (arbutton !== undefined)
    {
    try 
    {
        arbutton.hidden = isARAvailable === true ? false : true;
    } 
    catch (error) 
    {
        arbutton.hidden = true;
    }
    }
  },
  computed: {        
    archiveAllowed() {
        // archive not allowed when:
        // STATE_MOVING_TO_#DEPARTURE (1)
        // STATE_ANIMATION_ACTIVE (2)
        // STATE_MOVING_TO_DESTINATION (3)
        // STATE_WAIT_FOR_FLIGHTS(9)
        return this.$store.state.flightSimulator.visualizationState !== 1 &&
                this.$store.state.flightSimulator.visualizationState !== 2 &&
                this.$store.state.flightSimulator.visualizationState !== 3 &&
                this.$store.state.flightSimulator.visualizationState !== 9;
    },
    isVirtual() {
        return this.$store.state.general.mode === 'virtual';
    },
    isAugmented() {
        return this.$store.state.general.mode === 'ar';
    },
    isReal() {
        return this.$store.state.general.mode === 'real';
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
        this.$store.commit('general/setVirtual');

        this.$store.commit('archive/clearArchiveContent');
        this.$store.commit('general/closeMenu'); 

        if (this.$store.state.flightSimulator.isActive &&
            this.$store.state.flightSimulator.visualizationState !== 4)
        {
            this.$dialog.confirm('This Action will reset the current simulation and start a new one. Please confirm to continue.')
            .then(() => {
                this.initNew();
            });
        } else {
            this.initNew();
        }

        router.push('/flight-simulator');
    },
    clickAR() {
        this.$store.commit('general/setAR');
        this.$store.commit('general/closeMenu');

        if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.arcontroller) {
            window.webkit.messageHandlers.arcontroller.postMessage("openar");
        }
        else if (window.ARCONTROLLER && window.ARCONTROLLER.openAR)
        {
            window.ARCONTROLLER.openAR()
        }
        else
        {
            console.log("__AEROCENE_COMMAND::OPENAR");
        }
    },
    clickA() {
        this.$store.commit('general/setReal');
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

