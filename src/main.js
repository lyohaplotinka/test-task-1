import './scss/index.scss'

import { SearchInput } from "./js/SearchInput";
import {MaskedInput} from "./js/MaskedInput";

document.addEventListener('DOMContentLoaded', () => {
    window.searchInput = new SearchInput('#mainInput', '.autocomplete-block')
    window.maskedInput = new MaskedInput('#maskedInput', '#hiddenMasked')
})