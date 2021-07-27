import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TaskbarComponent extends Component {
  @tracked showFilter = false;

  @action viewFilter() {
    this.showFilter = !this.showFilter;
  }
}
