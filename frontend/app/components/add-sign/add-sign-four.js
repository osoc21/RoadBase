import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AddSignAddSignFourComponent extends Component {
  // service
  @service addSign;

  @tracked cities = [
    'Aalst',
    'Nieuwerkerken',
    'Haaltert',
    'Erembodegem',
    'Dendermonde',
    'Moorsel',
  ];
  @tracked authority = this.addSign.authority;
  @tracked placementDate = this.addSign.placementDate;

  @action onAuthoritySelect(value) {
    this.authority = value;
    this.addSign.setAuthority(this.authority);
  }

  @action onPlacementDateSelect(value) {
    this.placementDate = value;
    this.addSign.setPlacementDate(this.placementDate);
  }
}
