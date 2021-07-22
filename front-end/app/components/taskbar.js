import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class TaskbarComponent extends Component {
  @tracked viewFilter = false;

  @action viewFilter() {
    this.viewFilter = !this.viewFilter;
    // this.args.showFilter = !this.a
  }
}
