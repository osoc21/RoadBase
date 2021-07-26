import Service from '@ember/service';

export default class AddSignService extends Service {
  direction = 0;
  streets = [];
  latDeg = 0;
  latMin = 0;
  lonDeg = 0;
  lonMin = 0;
  date = '';
  owner = '';

  setDirection(value) {
    this.direction = value;
  }

  setLatDeg(value) {
    this.latDeg = value;
  }

  setLatMin(value) {
    this.latMin = value;
  }

  setLonDeg(value) {
    this.lonDeg = value;
  }

  setLonMin(value) {
    this.lonMin = value;
  }

  setDate(value) {
    this.date = value;
  }

  setOwner(value) {
    this.owner = value;
  }
}
