import './scss/index.scss'

import { SearchInputManipulator } from "./js/searchInput";

document.addEventListener('DOMContentLoaded', () => {
    window.searchInputManipulator = new SearchInputManipulator('#mainInput', '.autocomplete-block')
})