import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AddSignAddSignTwoComponent extends Component {
  @service addSign;

  @tracked streets = [];

  get latDirection() {
    const direction = this.args.clickedPosition.latDeg >= 0 ? 'N' : 'Z';
    return direction;
  }

  get lonDirection() {
    const direction = this.args.clickedPosition.lonDeg >= 0 ? 'O' : 'W';
    return direction;
  }

  @action addStreet() {
    let streetsTemp = [];
    const $streetInputs = document.querySelectorAll('.position__street_input');
    $streetInputs.forEach((input) => {
      if (input.value !== '') {
        streetsTemp.push(input.value);
      }
    });
    this.streets = [...streetsTemp];
    console.log('streets', this.streets);
    this.addSign.setStreets(streetsTemp);
    console.log('store', this.addSign.streets);
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
