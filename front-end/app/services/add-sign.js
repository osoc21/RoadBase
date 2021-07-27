import Service from '@ember/service';

export default class AddSignService extends Service {
  position = {};
  direction = 0;
  streets = [];
  date = '';
  owner = '';
  signs = [];
  poleHeight = 0;
  authority = '';
  placementDate = '';

  setStreets(value) {
    this.streets = [...value];
  }

  setDirection(value) {
    this.direction = value;
  }

  setPosition(value) {
    this.position = value;
  }

  setPlacementDate(value) {
    this.placementDate = value;
  }

  setOwner(value) {
    this.owner = value;
  }

  setSigns(value) {
    this.signs = value;
  }

  setPoleHeight(value) {
    this.poleHeight = value;
  }

  setAuthority(value) {
    this.authority = value;
  }
}
