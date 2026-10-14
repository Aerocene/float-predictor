import OpenMeteoAutocomplete from './OpenMeteoAutocomplete.vue'

const OpenMeteoAutocompletePlugin = {
    install(Vue) {
        Vue.component(OpenMeteoAutocomplete)
    }
}

export default OpenMeteoAutocompletePlugin
export { OpenMeteoAutocomplete, OpenMeteoAutocompletePlugin }
