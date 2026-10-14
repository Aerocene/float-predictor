<template>
    <div>
        <slot
            name="input"
            :context="context"
            :actions="{ selectItemFromList, shiftResultsSelection, unshiftResultsSelection }"
            :events="{ inputHasReceivedFocus, inputHasChanged }"
        >        
            <input        
                type="text"
                v-model="context.input"
                @focus="inputHasReceivedFocus"
                @input="inputHasChanged"
                @keydown.enter.prevent="selectItemFromList"
                @keydown.down.prevent="shiftResultsSelection"
                @keydown.up.prevent="unshiftResultsSelection"
                class="vbga-input"
            >
        </slot>
        <ul v-if="hasResults" class="vbga-results">
            <li
                v-for="(result, index) in autocomplete.results"
                :class="{ highlighted: index === autocomplete.resultsHighlight }"
                :key="result.id"
                @click="resultHasBeenSelected(result)"
            >
                <slot name="item" :place="result" v-if="index !== autocomplete.resultsHighlight">
                    {{ placeName(result) }}
                </slot>
                <slot name="activeItem" :place="result" v-if="index === autocomplete.resultsHighlight">
                    {{ placeName(result) }}
                </slot>
            </li>
        </ul>
    </div>
</template>

<script>
export default {

    name: "OpenMeteoAutocomplete",

    data() {
        return {
            autocomplete: {
                service: null,
                sessionToken: null,
                results: [],
                resultsHighlight: 0,
                status: null,
                selected: this.place,
            },
            context: {
                input: this.value,
                disableSearch: false,
            },
        }
    },

    props: {

        bounds: {
            type: Object,
            required: false,
            default: null,
        },

        fields: {
            type: Array,
            required: false,
            default: () => ([]),
        },

        value: {
            type: String,
            required: false,
            default: '',
        },

        place: {
            type: Object,
            required: false,
            default: () => ({}),
        },

    },

    computed: {

        hasResults() {
            console.log("has result: " + (this.autocomplete.results.length > 0));
            return this.autocomplete.results.length > 0
        },

        searchValue() {
            console.log("search value: " + this.context.input);
            return this.context.input
        },

        resultField() {
            return [
                'formatted_address',
                'geometry',
                ...this.fields,
            ]
        }

    },

    watch: {

        value: {
            handler(value) {
                if (!value) return

                this.$set(this.context, 'input', value)
            },
            immediate: true,
        },

        place: {
            handler(value) {
                if (!value) return

                this.$set(this.autocomplete, 'selected', value)
            },
            immediate: true,
        },

        searchValue(newValue, oldValue) {
            if (newValue || !oldValue) return

            this.$emit('resultCleared')
        },

    },

    methods: {

        placeName(place) {
            return `${place.name} (${place.country})`;
        },

        selectItemFromList() {
            const { results, resultsHighlight, selected } = this.autocomplete
            const { input } = this.context

            /**
             * Bail if there is nothing to work with
             */
            if (!input && !results.length) {
                return
            }

            /**
             * Return the last result if things haven't changed
             */
            if (input === this.value && Object.keys(selected).length) {
                return this.returnLastSelection()
            }

            /**
             * Show the search results again
             */
            if (input && !results.length) {
                return this.inputHasChanged()
            }

            /**
             * The expected standard user journey. The user selected a result from the list.
             */
            this.resultHasBeenSelected(results[resultsHighlight] || "")
        },

        shiftResultsSelection() {
            const { results, resultsHighlight } = this.autocomplete
            let newIndex = Math.min(results.length, resultsHighlight) + 1

            if (newIndex >= results.length) newIndex = 0

            this.$set(this.autocomplete, 'resultsHighlight', newIndex)
        },

        unshiftResultsSelection() {
            const { results, resultsHighlight } = this.autocomplete
            let newIndex = Math.min(results.length, resultsHighlight) - 1

            if (newIndex < 0) newIndex = results.length - 1

            this.$set(this.autocomplete, 'resultsHighlight', newIndex)
        },

        inputHasReceivedFocus() {
        },

        inputHasChanged() 
        {
            const { input } = this.context

            // console.log("inputHasChanged: " + input);
            this.$set(this.autocomplete, 'resultsHighlight', 0)

            if (!input ||
                input.length < 2)
            {
                this.$set(this.autocomplete, 'selected', {})
                this.$set(this.autocomplete, 'results', [])
                return
            }

            fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${input}&count=10`)
            .then(response => response.json())
            .then(predictions => {
                console.log("result:", JSON.stringify(predictions))
                this.$set(this.autocomplete, 'results', predictions.results || [])
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                this.loading = false;
            });
        },

        resultHasBeenSelected(place) {

            // place.latitude
            // place.longitude
            // place.elevation

            this.$set(this.autocomplete, 'selected', place)
            this.$set(this.context, 'input', this.placeName(place))
            this.$set(this.autocomplete, 'results', [])
            this.$emit('resultChanged', place)
        },

        returnLastSelection() {
            const { selected: place } = this.autocomplete

            if (!place) return

            this.$emit('resultChanged', place)
        }
    },

}
</script>
