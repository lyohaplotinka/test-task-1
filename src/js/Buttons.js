export function initButtons() {
  const saveButton = document.getElementById('saveButton');
  const clearButton = document.getElementById('clearButton');

  saveButton.onclick = function () {
    window.storageService.searchInput = window.searchInput.element.value;
    window.storageService.phoneInput = window.maskedInput.value;
    alert('Сохранено!');
  };

  clearButton.onclick = function () {
    window.storageService.clear();
    window.searchInput.element.value = '';
    window.maskedInput.value = '';
    window.maskedInput.element.value = '';
  };
}
