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

  get instances() {
    const data = this.args.instances;
    console.log(data);
    return data
      .filter((loca) => {
        if (
          loca['location_lat'] !== undefined ||
          loca['location_long'] !== undefined
        ) {
          return loca;
        }
      })
      .map((loc) => {
        console.log([loc['location_lat'], loc['location_long']]);
        return [loc['location_lat'], loc['location_long']];
      });
  }
}
