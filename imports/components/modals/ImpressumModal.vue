<template>
    <!-- Modal Component -->
    <!-- <div @click="close" v-if="showImpressum"> -->

    <div>
        <b-modal 
            id="impressum-modal" 
            class="page-modal"
            hide-footer 
            hide-header 
            no-fade
            centered
            size="lg"            
        >
            
            <div class="entry-body" @click="$bvModal.hide('impressum-modal')">
                <h3 style="margin-top: 0px;">Impressum</h3>
                <p>
                    The Aerocene Float Predictor is being developed by
                    the Aerocene Foundation and the members of its diverse community.
                </p>
                <h4>TRAJECTORY COMPUTATION</h4>
                <p>
                    <a href="https://www.cuspaceflight.com/" target="_blank">
                    Camebridge Space Flight (CUSF)</a> - <a href="https://github.com/cuspaceflight/tawhiri" target="_blank">Tawhiri</a>.
                </p>
                <h4>VISUALISATION, DESIGN AND DEVELOPMENT</h4>
                <p>
                    <a href="http://www.studiofolder.it/" target="_blank">Studio Folder</a> (Marco Ferrari, Elisa Pasqual, Luca Ferrario, Iacopo Leardini).
                    with <a href="http://angelosemeraro.info/" target="_blank">Angelo Semeraro</a>.<br/>
                    <a href="https://ingorandolf.info/" target="_blank">Ingo Randolf</a><br/>
                    <a href="http://www.roham.eu" target="_blank">Roham Fayazi</a>
                </p>
                <h4>PROJECT DEVELOPMENT AND COORDINATION</h4>
                <p>
                    <a href="http://aerocene.org/" target="_blank">Aerocene Foundation</a> (Joaquin Ezcurra, Camilla Berggren Lundell, Alice Lampert),
                    <a href="http://tomassaraceno.com/" target="_blank">Studio Tomás Saraceno</a>
                    (Erik Vogler, Saverio Cantoni, Rosalie Laurin, Yelta Köm,
                    Connie Chester, Roxanne Mackie, Sofia Lemos, Zaida Violan),
                    <a href="https://publiclab.org/ " target="_blank">Public Lab</a>
                    (Nick Shapiro, Liz Barry), Imperial College London, Radio Amateurs DE
                    & UK, and the <a href="https://ukhas.org.uk/" target="_blank">UK High Altitude Society</a>.
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
    height: calc(100% - 75px);
    padding-top:75px;
}
</style>
