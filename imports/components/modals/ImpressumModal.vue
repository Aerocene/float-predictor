<template>
    <!-- Modal Component -->
    <!-- <div @click="close" v-if="showImpressum"> -->

    <div>
        <b-modal 
            id="impressum-modal" 
            class="page-modal test"
            hide-footer 
            hide-header 
            no-fade
            centered
            size="lg"            
        >
            
            <div class="entry-body" @click="$bvModal.hide('impressum-modal')">
                <h3 style="margin-top: 0px;">Impressum</h3>
                <p>
                    The Aerocene App is being developed by the Aerocene Community:
                </p>
                <h4>TRAJECTORY COMPUTATION</h4>
                <p>
                    <a href="https://eapsweb.mit.edu/" target="_blank">MIT Department of Earth, Atmospheric and Planetary Sciences</a> (Glenn Flierl, Lodovica Illari, Bill McKenna),
                    <a href="https://www.cuspaceflight.com/" target="_blank">Cambridge University Space Flight (CUSF)</a>.
                </p>
                <h4>VISUALISATION, DESIGN AND DEVELOPMENT</h4>
                <p>
                    Studio Tomás Saraceno with Ingo Randolf, Roham Fayazi, Studio Folder, Angelo Semeraro.                    
                </p>
                <h4>PROJECT DEVELOPMENT AND COORDINATION</h4>
                <p>
                    <a href="http://aerocene.org/" target="_blank">Aerocene Foundation</a>, 
                    <a href="http://tomassaraceno.com/" target="_blank">Studio Tomás Saraceno</a>, 
                    <a href="https://publiclab.org/" target="_blank">Public Lab</a>, 
                    Imperial College London, Radio Amateurs DE &amp; UK, 
                    and the <a href="https://ukhas.org.uk/" target="_blank">UK High Altitude Society</a>.
                </p>
            </div>

        </b-modal>
    </div>
    <!-- </div> -->
</template>

<script>
/**
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
*/
export default {
  name: 'impressum-modal',
  methods: {
      closeModal() {
          console.log("close");    
        //   this.$refs.impressum.close();    
      }
  },
};
</script>

<style lang="scss">
@import "../css/_variables_and_mixins.scss";
.page-modal {
    font-size: 1rem;
    .modal-body {
        font-size: 1.2em;
    }
}
.modal-dialog-centered {
    height: calc(100% - 90px);
    padding-top:90px;
}

#impressum-modal {
    @include small_down {
        padding-top: 40px;
    }

}
</style>
