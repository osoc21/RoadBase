import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AddSignContainerComponent extends Component {
  @tracked currentStep = 0;
  @tracked stepTitles = [
    'Borden en hoogte',
    'Positie',
    'Windrichting',
    'Eigenaar en Plaatsingsdatum',
    'Overzicht',
  ];

  get currentTitle() {
    return this.stepTitles[this.currentStep];
  }

  @action
  incrementCurrentStep() {
    if (this.currentStep + 1 < this.stepTitles.length) {
      this.currentStep += 1;
    }
  }

  @action
  decrementCurrentStep() {
    if (this.currentStep - 1 >= 0) {
      this.currentStep -= 1;
    }
  }

  @action
  setCurrentStep(value) {
    this.currentStep = value;
  }
}
