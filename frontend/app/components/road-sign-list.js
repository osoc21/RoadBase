import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class CounterComponent extends Component {
  @tracked selectedSigns = this.args.signs;

  @action
  selectItem(sign) {
    this.args.onSelect(sign);
  }

  @action
  filterSignsOnSearch(event) {
    this.selectedSigns = this.args.signs.filter((sign) => {
      const searchTerm = event.target.value;
      return sign.roadSignConceptCode.includes(searchTerm);
    });
  }
}
