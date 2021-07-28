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
  @tracked showSignDetails = false;
  @tracked allowAddSign = false;
  @tracked signDetails;

  @action
  updateAllowAddSign(newValue) {
    this.allowAddSign = newValue;
    if (newValue === true) {
      document.getElementById('ember192').style.cursor = 'copy';
    } else {
      document.getElementById('ember192').style.cursor = 'move';
    }
  }

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

    let latDirection = event.latlng.lat >= 0 ? 'N' : 'Z';
    let lonDirection = event.latlng.lng >= 0 ? 'O' : 'W';

    this.clickedPosition = {
      lon,
      lat,
      latDeg: latDeg,
      latMin: latMin,
      latSec: latSec,
      latDirection: latDirection,
      lonDeg: lonDeg,
      lonMin: lonMin,
      lonSec: lonSec,
      lonDirection: lonDirection,
    };

    this.addSign.setPosition(this.clickedPosition);
    this.model.cacheNewSign(this.clickedPosition.lat, this.clickedPosition.lon);

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

  @action toggleShowSignDetails(bool, instance) {
    this.showSignDetails = bool;
    this.signDetails = instance;
  }
}
