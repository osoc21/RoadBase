import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AddSignThreeComponent extends Component {
  @tracked value = 0;

  @action showDirectionValue(e) {
    this.value = e.target.value;
    const arrow = document.querySelector('.compass-arrow');
    arrow.style.transform = `rotate(${this.value}deg)`;
  }
}
