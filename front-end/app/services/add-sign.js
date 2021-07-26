import Service from '@ember/service';

export default class AddSignService extends Service {
  position = {};
  direction = 0;
  streets = [];
  date = '';
  owner = '';

  setStreets(value) {
    this.streets = [...value];
  }

  setDirection(value) {
    this.direction = value;
  }

  setPosition(value) {
    this.position = value;
  }

  setDate(value) {
    this.date = value;
  }

  setOwner(value) {
    this.owner = value;
  }
}
