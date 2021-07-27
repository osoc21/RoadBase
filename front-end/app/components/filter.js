import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class FilterComponent extends Component {
  @tracked checked = true;
  @tracked verkeersborden = true;
  @tracked wegmarkeringen = true;
  @tracked fietsers = true;
  @tracked transport = true;
  @tracked vervoer = true;
  @tracked voetgangers = true;
  @tracked actief = true;
  @tracked conceptueel = true;
  @tracked gepland = true;
  @tracked probleem = true;
  @tracked tijdelijk = true;
  @tracked autosnelweg = true;
  @tracked kom = true;
  @tracked fietsstraat = true;
  @tracked woonerf = true;
  @tracked landbouwverkeer = true;
  @tracked zonesThirty = true;
  @tracked zonesFifty = true;

  @action
  uncheck() {
    this.verkeersborden = false;
    this.wegmarkeringen = false;
    this.fietsers = false;
    this.transport = false;
    this.vervoer = false;
    this.voetgangers = false;
    this.actief = false;
    this.conceptueel = false;
    this.gepland = false;
    this.probleem = false;
    this.tijdelijk = false;
    this.autosnelweg = false;
    this.kom = false;
    this.fietsstraat = false;
    this.woonerf = false;
    this.landbouwverkeer = false;
    this.landbouwverkeer = false;
    this.zonesThirty = false;
    this.zonesFifty = false;
  }
}
