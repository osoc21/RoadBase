import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class IndexController extends Controller {
  @tracked clickedPosition = 'value';
  @action
  setClickedPosition(event) {
    console.log(event);
    this.clickedPosition = 'lat' + event.latlng.lat + 'lng' + event.latlng.lng;
  }
}
