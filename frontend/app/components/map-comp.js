import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import * as L from 'leaflet';

export default class CounterComponent extends Component {
  @tracked lng = 4;
  @tracked lat = 51;
  @tracked zoom = 12;
  @tracked location = [51, 4];
  @tracked view = true;

  @action
  onMapClick(e) {
    this.args.onMapClick(e);
  }

  get instances() {
    const data = this.args.instances;

    return data
      .filter((loca) => {
        if (
          loca['location_lat'] !== undefined ||
          loca['location_long'] !== undefined
        ) {
          return loca;
        }
      })
      .map((instance) => {
        return {
          loc: [instance['location_lat'], instance['location_long']],
          content: instance,
          marker: L.divIcon({
            className: 'marker',
            html: `<div class="roadsign-icon" id="1" style="transform: rotate(${instance.direction}deg);"></div>`,
          }),
        };
      });
  }

  @action
  updateView(newView) {
    this.view = newView;
    console.log(this.view);
  }
}
