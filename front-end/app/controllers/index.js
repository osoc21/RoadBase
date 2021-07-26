import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import * as L from 'leaflet';

export default class IndexController extends Controller {
  @tracked clickedPosition = undefined;
  @tracked signsOnMap = [];
  @tracked showAddSign = false;
  @tracked allowAddSign = false;

  @action
  updateAllowAddSign(newValue) {
    this.allowAddSign = newValue;
    if (newValue === true) {
      document.getElementById('ember192').style.cursor = 'copy';
    } else {
      document.getElementById('ember192').style.cursor = 'move';
    }
    console.log(this.allowAddSign);
  }

  @action
  setClickedPosition(event) {
    this.clickedPosition = { lat: event.latlng.lat, lon: event.latlng.lng };
    if (this.allowAddSign) {
      this.showAddSign = true;
    }
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

  @action
  closeAddSign() {
    this.showAddSign = false;
  }
}
