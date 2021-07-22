import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import * as L from 'leaflet';

export default class IndexController extends Controller {
  @tracked clickedPosition = undefined;
  @tracked signsOnMap = [];
  @tracked showAddSign = false;
  @tracked showFilter = false;

  @action
  setClickedPosition(event) {
    this.clickedPosition = { lat: event.latlng.lat, lon: event.latlng.lng };
    this.showAddSign = true;
  }

  @action
  addSignToMap(sign) {
    this.signsOnMap = [
      ...this.signsOnMap,
      {
        location: [this.clickedPosition.lat, this.clickedPosition.lon],
        marker: L.icon({
          iconUrl: sign.image,
          iconSize: [38, 95],
          iconAnchor: [22, 94],
          popupAnchor: [-3, -76],
          // shadowUrl: 'my-icon-shadow.png',
          shadowSize: [68, 95],
          shadowAnchor: [22, 94],
        }),
        content: sign,
      },
    ];
    this.clickedPosition = undefined;
  }
}
