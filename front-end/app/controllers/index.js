import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import * as L from 'leaflet';
import { inject as service } from '@ember/service';

export default class IndexController extends Controller {
  @service addSign;

  @tracked clickedPosition = undefined;
  @tracked signsOnMap = [];
  @tracked showAddSign = false;

  @action
  setClickedPosition(event) {
    const lat = event.latlng.lat;
    const lon = event.latlng.lng;

    let latDeg = Math.floor(Math.abs(lat));
    let latMin = Math.floor(Math.abs(lat - latDeg) * 60);
    let latSec = Math.floor((Math.abs(lat - latDeg) * 60 - latMin) * 60);
    let lonDeg = Math.floor(Math.abs(lon));
    let lonMin = Math.floor(Math.abs(lon - lonDeg) * 60);
    let lonSec = Math.floor((Math.abs(lon - lonDeg) * 60 - lonMin) * 60);

    this.clickedPosition = {
      latDeg: latDeg,
      latMin: latMin,
      latSec: latSec,
      latDirection: latDeg >= 0 ? 'N' : 'Z',
      lonDeg: lonDeg,
      lonMin: lonMin,
      lonSec: lonSec,
      lonDirection: lonDeg >= 0 ? 'O' : 'W',
    };

    this.showAddSign = true;

    this.addSign.setPosition(this.clickedPosition);
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
