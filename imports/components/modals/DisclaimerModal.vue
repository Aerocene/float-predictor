<template>
    <!-- Modal Component -->
    <b-modal id="disclaimer-modal"
             class="page-modal"
             centered 
             hide-footer 
             hide-header
             no-fade
             size="lg"
             title="Disclaimer"
    >    
        <div class="entry-body"  @click="$bvModal.hide('disclaimer-modal')">
            
            <h3>Disclaimer</h3>

            <p>
                Aerocene Foundation is a non-for-profit organisation devoted to community building,
                scientific research, artistic experience and education aimed at increasing public
                awareness of global resource circulation and reactivating a common imaginary towards
                a new symbiotic relationship with the Earth.
            </p>
            <h4>Privacy</h4>
            <p>
                Any material, data, imagery and sound
                collected may be used by Aerocene Foundation for  any artistic, scientific,
                educational or other purposes without restriction to any specific media, including,
                without limitation, press use, books, publications, films, video materials or
                exhibitions dealing with Aerocene, world-wide and unlimited in time.
                All images created and shared by Aerocene Foundation under the use of the Float
                Predictor are licensed under CC Creative Commons Share-A-Like Attribution which
                means users are free to share and adapt the material as long as they distribute
                their contributions under the same license as the original.
                Any personal data relating to users gathered by Aerocene Foundation
                in the website user process or during your use of the service will be
                recorded and only be used in accordance with <a href="https://ec.europa.eu/info/law/law-topic/data-protection_en" target="_blank">
                    https://ec.europa.eu/info/law/law-topic/data-protection_en</a>.
                <br><br>
                We send you push
                messages to inform you about projects, events and exhibitions by and with
                Studio Tomás Saraceno GmbH. Push messages are messages that are displayed 
                on your device even when you are not using the app. We will only send you
                push messages if you have consented to receive them by activating the push
                messages (Art. 6 para. 1 sentence 1 lit. a GDPR). Upon activation,
                the device ID of your mobile device is communicated to the service that
                provides the push functionality at your operating system provider.
                You can deactivate the sending of push messages at any time and thus
                withdraw your consent by changing the settings of your device
                (iOS: Settings > App Name > Notifications; Android: Settings > Apps or
                Application Manager > App Name > Notifications).
                Please note that the revocation only takes effect for the future.
                Processing that took place before the revocation is not affected.

            </p>
            <h4>Terms and Conditions</h4>
            <p>
                The information contained in this website is for general information purposes only.
                The information is provided by Aerocene Foundation and whilst we endeavour to keep
                the information up to date and correct, we make no representations or warranties of
                any kind, express or implied, about the completeness, accuracy, reliability,
                suitability or availability with respect to the website or the information,
                products, services, or related graphics contained on the website for any purpose.
                Any reliance you place on such information is therefore strictly at your own risk.
                Under no circumstances will Aerocene Foundation be liable for any loss or damage,
                including, without limitation, indirect or consequential loss or damage, or any
                loss or damage whatsoever arising from the loss of data or profits arising out
                of, or in connection with, the use of this website.
                Every effort is made to keep the website up and running smoothly. However,
                Aerocene Foundation takes no responsibility for, and will not be liable for,
                the website being temporarily unavailable due to technical issues beyond our control.
                Aerocene Foundation is dedicated to providing an harassment-free, safe,
                and inclusive experience for everyone, regardless of personal and
                professional background, gender identity and expression, style of clothing,
                sexual orientation, dis-/ability, physical appearance, race, age, or religion.
                Aerocene Foundation does not accept racism, sexism, ableism, ageism, homophobia,
                transphobia, body shaming, religion shaming, “geekier-than-thou” shaming,
                education bias, and the dismissal or bullying of children and adults among other.
            </p>
            <p>
                <br>
            </p>
        </div>
    </b-modal>
</template>

<script>
/**
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
*/
export default {
  name: 'disclaimer-modal',
};
</script>

<style lang="scss">
@import "../css/_variables_and_mixins.scss";

.modal-dialog-centered {
    height: calc(100% - 90px);
    padding-top:90px;
}

#disclaimer-modal {
    @include small_down {
        padding-top: 40px;
    }
}

</style>
