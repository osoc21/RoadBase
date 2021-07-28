import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AddSignOneComponent extends Component {
  // data
  @tracked signs = this.model.signs;
  @tracked signSizes = [1.1, 0.9, 0.7, 0.4];
  // states
  @tracked showSignSelector = false;
  @tracked selectedSigns = this.addSign.signs;
  @tracked poleHeight = this.addSign.poleHeight;
  // service
  @service addSign;

  get remainingHeight() {
    let remainingHeight = this.poleHeight;
    this.selectedSigns.forEach((sign) => {
      remainingHeight -= sign.size;
    });
    return remainingHeight.toFixed(2);
  }

  @action toggleShowSignSelector() {
    this.showSignSelector = !this.showSignSelector;
  }

  @action setSelectedSign(sign) {
    const signObject = {
      position: this.selectedSigns.length,
      size: this.signSizes[0],
      concept: sign,
    };
    this.selectedSigns = [...this.selectedSigns, signObject];
    this.showSignSelector = false;
    this.addSign.setSigns(this.selectedSigns);

    this.args.onUpdate(
      this.addSign.position.lat,
      this.addSign.position.lon,
      this.addSign.direction,
      this.selectedSigns[0].concept.id
    );
  }

  @action updateSign(sign, index) {
    const newSelectedSigns = this.selectedSigns;
    newSelectedSigns[index] = sign;
    this.selectedSigns = newSelectedSigns;
    this.addSign.setSigns(this.selectedSigns);
  }

  @action updateSignsOrder(dragObj) {
    let newSelectedSigns = this.selectedSigns;

    newSelectedSigns.splice(
      dragObj.targetIndex,
      0,
      newSelectedSigns.splice(dragObj.sourceIndex, 1)[0]
    );
    newSelectedSigns = newSelectedSigns.map((el, i) => {
      const newEl = el;
      newEl.position = i;
      return newEl;
    });
    this.selectedSigns = newSelectedSigns;
    this.addSign.setSigns(this.selectedSigns);
  }

  @action updatePoleheight(event) {
    const input = event.target.value;
    if (input && Number(input)) {
      this.poleHeight = Number(input);
      this.addSign.setPoleHeight(this.poleHeight);
    } else {
      this.poleHeight = 0;
    }
  }
}
