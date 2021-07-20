import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AddSignOneComponent extends Component {
  @tracked showSignSelector = false;
  @tracked signs = this.model.signs;

  @action toggleShowSignSelector() {
    this.showSignSelector = !this.showSignSelector;
  }
}
