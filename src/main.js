import './scss/index.scss'

import { SearchInput } from "./js/SearchInput";
import {MaskedInput} from "./js/MaskedInput";
import { StorageService } from "./js/Storage";
import {initButtons} from "./js/Buttons";

document.addEventListener('DOMContentLoaded', () => {
    window.searchInput = new SearchInput('#mainInput', '.autocomplete-block')
    window.maskedInput = new MaskedInput('#maskedInput', '#hiddenMasked')
    window.storageService = new StorageService()
    initButtons()
})