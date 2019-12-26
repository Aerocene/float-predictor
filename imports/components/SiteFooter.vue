<template>
    <div class="footer modal-contents">
        <instructions />
        <impressum />
        <disclaimer />
        <modal-winner-explorer />
    </div>
</template>

<style lang="scss" scoped>
  .modal-contents {
    height: 0;
    width: 0;
  }
</style>

<script>
import instructions from './modals/InstructionsModal';
import impressum from './modals/ImpressumModal';
import disclaimer from './modals/DisclaimerModal';
import modalWinnerExplorer from './modals/ModalWinnerExplorer.Vue';

export default {
  components: { instructions, impressum, modalWinnerExplorer, disclaimer },
};
</script>
