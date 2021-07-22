import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AddSignOneComponent extends Component {
  // data
  @tracked signs = this.model.signs;
  @tracked signSizes = [1.1, 0.9, 0.7, 0.4];
  // sates
  @tracked showSignSelector = false;
  @tracked selectedSigns = [];

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
  }
  @action updateSign(sign, index) {
    const newSelectedSigns = this.selectedSigns;
    newSelectedSigns[index] = sign;
    this.selectedSigns = newSelectedSigns;
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
  }
}
