

const COMMAND_PREFIX = "__AEROCENE_COMMAND::";

const COMMAND_VIZ_INIT = "VIZ_INIT";
const COMMAND_ANIM_FIRST = "ANIM_FIRST";
const COMMAND_TOAST = "TOAST:";

export default {

    commandPrefix() {
        return COMMAND_PREFIX;
    },

    logVisInit() {
        console.log(COMMAND_PREFIX + COMMAND_VIZ_INIT);
    },

    logToast(msg) {
        console.log(COMMAND_PREFIX + COMMAND_TOAST + msg);        
    },

    logFirstAnimationDone() {
        console.log(COMMAND_PREFIX + COMMAND_ANIM_FIRST);
    }
}