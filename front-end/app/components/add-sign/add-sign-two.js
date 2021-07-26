import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AddSignAddSignTwoComponent extends Component {
  @service addSign;

  @tracked streets = [];

  @action addStreet() {
    let streetsTemp = [];
    const $streetInputs = document.querySelectorAll('.position__street_input');
    $streetInputs.forEach((input) => {
      if (input.value !== '') {
        streetsTemp.push(input.value);
      }
    });
    this.streets = [...streetsTemp];
    this.addSign.setStreets(streetsTemp);
  }

  @action addStreetInput() {
    const $streetForm = document.querySelector('.streets-form');
    const $streetInput = document.querySelector('.streets-form__input');
    const $streetInputClone = $streetInput.cloneNode(false);
    $streetInputClone.classList.remove('hidden', 'streets-form__input');
    $streetInputClone.classList.add('position__street_input');
    $streetInputClone.addEventListener('blur', this.addStreet);
    $streetForm.appendChild($streetInputClone);
  }
}
