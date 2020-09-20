export class MaskedInput {
  constructor(selector) {
    this.element = document.querySelector(selector);
    if (!this.element) {
      throw new Error('Element for MaskedInput not found');
    }
    this.value = '';
    this.setup();
  }

  setup() {
    this.element.addEventListener('input', this.createMaskedOutput.bind(this));
  }

  cutMask(value) {
    return value.replace(/\D/g, '');
  }

  createMask(value) {
    if (value.length > 0 && value.length < 2) {
      if (value[0] === '8') value = '7';
      return `+${value}`;
    }
    if (value.length >= 2 && value.length < 5) {
      return value.replace(/(\d{1})(\d{1,3})/, '+$1 ($2');
    }
    if (value.length >= 5 && value.length < 8) {
      return value.replace(/(\d{1})(\d{3})(\d{1,3})/, '+$1 ($2) $3');
    }
    if (value.length >= 8 && value.length < 10) {
      return value.replace(/(\d{1})(\d{3})(\d{3})(\d{1,2})/, '+$1 ($2) $3-$4');
    }
    if (value.length >= 10) {
      return value.replace(
        /(\d{1})(\d{3})(\d{3})(\d{2})(\d{1,2})/,
        '+$1 ($2) $3-$4-$5'
      );
    }
    return '';
  }

  createMaskedOutput(event) {
    const { value } = event.target;
    const unmasked = this.cutMask(value);
    let newValue = unmasked.length <= 11 ? unmasked : this.value;
    this.element.value = this.createMask(newValue);
    this.element.setAttribute('data-number', newValue);
    this.value = newValue;
  }

  setValue(value) {
    this.value = value;
    this.element.value = this.createMask(value);
  }
}
