import {httpSearch} from "./utils";

export class SearchInputManipulator {
    constructor(inputSelector, autocompleteSelector) {
        this.element = document.querySelector(inputSelector)
        this.autocomplete = document.querySelector(autocompleteSelector)
        if (!this.element || !this.autocomplete) {
            throw new Error('One of elements for SearchInputManipulator not found')
        }
        this.setup()
    }

    setup() {
        this.servers = Array.from({ length: 3 }, (value, idx) => idx)
        this.value = ''
        this.searchTimeout = null
        this.result = []
        this.element.addEventListener('input', this.elementOnChange.bind(this))
        this.element.addEventListener('focus', () => {
            if (this.result.length) this.autocomplete.style.display = 'block'
        })
        this.element.addEventListener('blur', () => this.autocomplete.style.display = 'none     ')
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
            this.result = await httpSearch(this.value, server)
            if (this.result.length) break
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
            this.autocomplete.appendChild(elem)
        })
        this.autocomplete.style.display = 'block'
    }
}