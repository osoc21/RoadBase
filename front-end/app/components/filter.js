import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class FilterComponent extends Component {
  @tracked checked = true;

  @action 
  uncheck () {
    this.checked = false;
  } 
}
