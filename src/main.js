import { SearchInput } from './js/SearchInput';
import { MaskedInput } from './js/MaskedInput';
import { StorageService } from './js/Storage';
import { initButtons } from './js/Buttons';
import './scss/index.scss';

document.addEventListener('DOMContentLoaded', () => {
  window.searchInput = new SearchInput('#mainInput', '.autocomplete-block');
  window.maskedInput = new MaskedInput('#maskedInput');
  window.storageService = new StorageService();
  initButtons();
});
