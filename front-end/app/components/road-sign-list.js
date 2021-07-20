import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class CounterComponent extends Component {
  @tracked selectedSigns = service().query('road-sign-concept', {
    filter: { 'road-sign-concept-code': 'B9' },
  });

  @action
  selectItem(sign) {
    this.args.onSelect(sign);
  }

  @action
  filterSignsOnSearch(event) {
    console.log(this.selectedSigns);
    this.selectedSigns = this.args.signs.filter((sign) => {
      const searchTerm = event.target.value;
      console.log(sign);

      return sign.roadSignConceptCode.includes(searchTerm);
    });
  }
}
