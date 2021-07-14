import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class CounterComponent extends Component {
  @tracked lng = 4;
  @tracked lat = 52;
  @tracked zoom = 12;
  @tracked location = [52, 4];
  @action
  onMapClick(e) {
    this.args.onMapClick(e);
  }
}
