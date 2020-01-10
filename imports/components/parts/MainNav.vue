<template>
    <div class="main-nav" @click="closeAction">

    <div style="height: 100%;">
        <!-- header -->
        <div class="header">
            <span style="font-size:24px;">MENU</span>
            <!-- <b-nav vertical>
                <b-nav-item @click="closeAction" class="--close --correction">
                    <i class="fp fp-close-w"></i></b-nav-item>
            </b-nav> -->
            <!-- <ul class="list-group menu-items brand-items">
                <router-link to="/flight-simulator">
                    <li class="menu-item --logo">
                        <div class="img-wrapper">
                        <img src="/img/globe_gif.gif" @click="startNew"/>
                        </div>
                    </li>
                    <li class="menu-item --nav">
                        <div @click="startNew">start a new<br>aerosolar journey</div>
                    </li>
                </router-link>
            </ul> -->
        </div>

        <!-- body -->
        <div class="body">
        <div class="macro-section --main">

            <div class="menu-section" style="line-height: 25px; letter-spacing: 2.4px;">
                <ul class="list-group menu-items">

                    <li v-show="user" class="menu-item --nav" @click="closeAction">
                        <router-link to="/profile">Profile</router-link>
                    </li>

                    <li class="menu-item --nav" @click="closeAction">
                        <a href="#" @click.prevent v-b-modal.instruction-modal>How to Float</a>
                    </li>
                    <li class="menu-item --nav" @click="closeAction">
                        <router-link 
                            to="/aerocene-explorer"
                            style="white-space:nowrap"
                        >
                            Aerocene Sculptures
                        </router-link>
                    </li>

                    <!-- <li class="menu-item --nav" @click="closeAction">
                        <router-link to="/about">About</router-link>
                    </li> -->

                    <li class="menu-item --nav" @click="closeAction">
                        <router-link 
                            to="/aeroglyphs-archive"
                            style="white-space:nowrap"
                        >
                            Aeroglyphs archive
                        </router-link>
                    </li>

                    <hr>

                    <!-- <li class="menu-item --nav" @click="closeAction">
                        <router-link to="/resources-and-api">Resources and API</router-link>
                    </li> -->
                </ul>
            </div>

            <div class="menu-section" style="line-height: 21px; letter-spacing: 2.4px; padding: 0px !important;">
                <ul class="list-group link-items">

                    <li class="menu-item --nav">
                        <a target="_blank" href="http://aerocene.org/">
                            Aerocene Project
                        </a>
                    </li>

                    <li class="menu-item --nav">
                        <a target="_blank" href="https://forum.aerocene.org/">
                            Aerocene Forum
                        </a>
                    </li>

                    <div style="margin-top:1.8em;"></div>

                    <li class="menu-item --link">
                        <a href="#" @click.prevent v-b-modal.impressum-modal>
                            Impressum
                        </a>
                    </li>

                    <li class="menu-item --link">
                        <a href="#" @click.prevent v-b-modal.disclaimer-modal>
                            Disclaimer
                        </a>
                    </li>

                </ul>
            </div>
            <!-- <div class="menu-section">
                <ul class="list-group horiziontal share-items">
                    <li class="menu-item --socialShare">
                        <a href="https://www.facebook.com/aerocene/" target="_blank">
                            <i class="fp fp-facebook"></i></a>
                    </li>
                    <li class="menu-item --socialShare">
                        <a href="https://twitter.com/aerocene" target="_blank"><i class="fp fp-twitter"></i></a>
                    </li>
                    <li class="menu-item --socialShare">
                        <a href="https://www.instagram.com/aerocene/" target="_blank">
                            <i class="fp fp-instagram"></i></a>
                    </li>
                </ul>
            </div> -->
        </div>
        <!-- <div class="macro-section --bottom">
            <div class="menu-section --rights">
                <div class="font-small">
                    Aerocene is an open artistic project by  <a target="_blank" href="http://tomassaraceno.com/">Studio Tomás Saraceno</a>.
                    Trajectory computation by
                    <a href="https://github.com/cuspaceflight/tawhiri" target="_blank">CUSF Tawhiri</a>.
                    Design and code by  <a target="_blank" href="http://www.studiofolder.it/">Studio Folder</a>, Angelo Semeraro and Ingo Randolf.
                </div>
            </div>
        </div> -->
        </div>
    </div>
    </div>
</template>

<style lang="scss" scoped>
hr {
    margin: 0px;
    background: white;
    min-width: 100%;
    margin: 40px 0 40px 0;
}

.main-nav {
    overflow: hidden !important;
    padding-right: 31px !important;
    /* padding: 0px 1.5em 0 0 !important; */
    height: 100% !important;
    width: 100% !important;
    max-width: none;
}
.header {
    text-align: center;
    background: black !important;
    margin-top: 21px !important;
    padding-top: 1.5em;
    padding-left: 1.5em;
    padding-right: 1.5em;
}
.body {
    background: black !important;
    padding-top: 1.1em;
    padding-left: 1.5em;
    padding-right: 1.5em;
    padding-bottom: 2em;
    font-size: 18px !important;
}
.img-wrapper {
    overflow: hidden; 
    position: absolute; 
    left: 14px; 
    top: -50px;

}
</style>

<script>
/**
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
*/
export default {
  name: 'main-nav',
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    }
  },
  methods: {            
    closeAction() { 
        this.$store.commit('general/toggleMenu'); 
    },
    startNew() {
        this.$store.commit('general/closeMenu');
      if (this.$store.state.flightSimulator.isActive) {
        this.$dialog.confirm('This Action will reset the current simulation and start a new one. Please confirm to continue')
          .then(() => {
            this.initNew();
          });
      } else {
        this.initNew();
      }
    },
    initNew() {
      this.$store.dispatch('flightSimulator/resetVisualization');
      this.$store.commit('general/closeMenu');
    //   this.$store.commit('flightSimulator/setVisualizationState', 8);
      this.$store.commit('general/setFormStatus', true);
      this.$store.commit('general/setModalShow', true);
    },
  },
};
</script>
