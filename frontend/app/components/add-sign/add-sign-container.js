import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AddSignContainerComponent extends Component {
  @service addSign;

  @tracked currentStep = 0;
  @tracked stepTitles = [
    'Borden en hoogte',
    'Positie',
    'Windrichting',
    'Beheer',
    'Overzicht',
  ];

  get currentTitle() {
    return this.stepTitles[this.currentStep];
  }

  get isLastStep() {
    return this.currentStep === this.stepTitles.length - 1;
  }

  get isNotFirstStep() {
    return this.currentStep !== 0;
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

  @action
  onClose() {
    console.log('sdsf');
    this.args.onClose();
  }
}
