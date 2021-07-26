import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class SelectedSignItemComponent extends Component {
  // data
  @tracked signSizes = [1.1, 0.9, 0.7, 0.4];
  // sates
  @tracked sign = this.args.data;
  @tracked selectedSize = this.signSizes[0];

  @action setSelectedSign(sign) {
    const signObject = {
      size: this.selectedSize,
      concept: sign,
    };
    this.selectedSigns = [...this.selectedSigns, signObject];
    this.showSignSelector = false;
  }
  @action onSizeSelect(value) {
    this.selectedSize = value;
    const newSignData = this.sign;
    newSignData.size = this.selectedSize;
    this.args.updateSign(newSignData, this.args.locationInList);
  }
}
