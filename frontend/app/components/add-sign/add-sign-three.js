import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AddSignThreeComponent extends Component {
  @service addSign;

  @tracked direction = this.addSign.direction;

  @action showDirectionValue(e) {
    this.direction = e.target.value;
    const arrow = document.querySelector('.compass-arrow');
    arrow.style.transform = `rotate(${this.direction}deg)`;
    // service
    this.addSign.setDirection(this.direction);
    this.args.onUpdate(
      this.addSign.position.lat,
      this.addSign.position.lon,
      this.direction
    );
  }
}
