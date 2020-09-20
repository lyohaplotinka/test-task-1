export class StorageService {
  constructor() {
    const data = window.localStorage.getItem('testTaskFormData');
    this.formData = {
      searchInput: '',
      phoneInput: ''
    };
    if (data) this.parseData(data);
  }

  parseData(data) {
    try {
      const jsonData = JSON.parse(data);
      this.formData = {
        searchInput: jsonData.searchInput || '',
        phoneInput: jsonData.phoneInput || ''
      };
      window.searchInput.element.value = this.formData.searchInput;
      window.maskedInput.setValue(this.formData.phoneInput);
    } catch (e) {}
  }

  saveForm() {
    window.localStorage.setItem(
      'testTaskFormData',
      JSON.stringify(this.formData)
    );
  }

  clear() {
    this.formData = {
      searchInput: '',
      phoneInput: ''
    };
    this.saveForm();
  }

  set searchInput(value) {
    this.formData.searchInput = value;
    this.saveForm();
  }

  set phoneInput(value) {
    this.formData.phoneInput = value;
    this.saveForm();
  }
}
