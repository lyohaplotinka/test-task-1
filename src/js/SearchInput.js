import { httpSearch } from "./utils";

export class SearchInput {
    constructor(inputSelector, autocompleteSelector) {
        this.element = document.querySelector(inputSelector)
        this.autocomplete = document.querySelector(autocompleteSelector)
        if (!this.element || !this.autocomplete) {
            throw new Error('One of elements for SearchInputManipulator not found')
        }
        this.setup()
        this.requiredResults = Number(process.env.REQUIRED_RESULTS)
    }

    setup() {
        this.servers = Array.from({ length: Number(process.env.MAX_SERVERS) }, (value, idx) => idx)
        this.value = ''
        this.searchTimeout = null
        this.result = []
        this.delegateSearchResultsEvent()

        this.element.addEventListener('input', this.elementOnChange.bind(this))
        this.element.addEventListener('focus', () => {
            if (this.result.length) this.autocomplete.style.display = 'block'
        })
    }

    delegateSearchResultsEvent() {
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('search-result')) {
                const value = event.target.getAttribute('data-value')
                if (value) this.element.value = value.trim()
            }
            if (!event.target.classList.contains('autocomplete-input'))this.autocomplete.style.display = 'none'
        })
    }

    elementOnChange(event) {
        const { value } = event.target
        this.value = value
        this.triggerSearchTimeout()
    }

    triggerSearchTimeout() {
        if (this.searchTimeout) clearTimeout(this.searchTimeout)
        this.searchTimeout = setTimeout(() => this.doSearch(), 500)
    }

    async doSearch() {
        this.result = []
        if (!this.value) {
            this.clearAutocomplete()
            this.autocomplete.style.display = 'none'
            return
        }
        for await (const server of this.servers) {
            const result = await httpSearch(this.value, server)
            this.result = [...this.result, ...result]
            if (this.result.length >= this.requiredResults) break
        }
        this.createAutocompleteElements()
    }

    clearAutocomplete() {
        while (this.autocomplete.firstChild) {
            this.autocomplete.firstChild.remove();
        }
    }

    createAutocompleteElements() {
        this.clearAutocomplete()
        this.result.forEach(result => {
            const elem = document.createElement('div')
            elem.classList.add('search-result')
            elem.innerText = result
            elem.setAttribute('data-value', result)
            this.autocomplete.appendChild(elem)
        })
        this.autocomplete.style.display = 'block'
    }
}