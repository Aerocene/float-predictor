<template>
    <div class="footer modal-contents">
        <instructions />
        <impressum />
        <disclaimer />
        <privacy />
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
import privacy from './modals/PrivacyModal';
import modalWinnerExplorer from './modals/ModalWinnerExplorer';

export default {
  components: { instructions, impressum, modalWinnerExplorer, disclaimer, privacy },
};
</script>
