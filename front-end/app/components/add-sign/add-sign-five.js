import Component from '@glimmer/component';
// import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AddSignAddSignFiveComponent extends Component {
  @service addSign;

  @action log() {
    console.log('test');
    console.log(this.addSign);
    console.log('testttttt');
  }
}
