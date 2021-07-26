import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AddSignAddSignTwoComponent extends Component {
  @service addSign;

  @tracked streets = ['Voeg een straat toe ...'];
  @tracked latDeg = 0;
  @tracked latMin = 0;
  @tracked lonDeg = 0;
  @tracked lonMin = 0;

  get latDegrees() {
    const degrees = Math.floor(Math.abs(this.args.clickedPosition.lat));
    this.latDeg = degrees;
    return degrees;
  }
  get latMinutes() {
    const minutes = Math.floor(
      Math.abs(this.args.clickedPosition.lat - this.latDeg) * 60
    );
    this.latMin = minutes;
    return minutes;
  }
  get latSeconds() {
    const seconds = Math.floor(
      (Math.abs(this.args.clickedPosition.lat - this.latDeg) * 60 -
        this.latMin) *
        60
    );
    return seconds;
  }
  get latDirection() {
    const direction = this.args.clickedPosition.lat >= 0 ? 'N' : 'Z';
    return direction;
  }
  get lonDegrees() {
    const degrees = Math.floor(Math.abs(this.args.clickedPosition.lon));
    this.lonDeg = degrees;
    return degrees;
  }
  get lonMinutes() {
    const minutes = Math.floor(
      Math.abs(this.args.clickedPosition.lon - this.lonDeg) * 60
    );
    this.lonMin = minutes;
    return minutes;
  }
  get lonSeconds() {
    const seconds = Math.floor(
      (Math.abs(this.args.clickedPosition.lon - this.lonDeg) * 60 -
        this.lonMin) *
        60
    );
    return seconds;
  }
  get lonDirection() {
    const direction = this.args.clickedPosition.lon >= 0 ? 'O' : 'W';
    return direction;
  }

  @action addStreet() {
    // this.nrStreets += 1;
    this.streets = [...this.streets, 'Voeg een straat toe ...'];
  }
}
