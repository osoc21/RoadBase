import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AddSignAddSignFourComponent extends Component {
  @tracked cities = ['Aalst', 'Antwerpen', 'Aalter'];

  @action
  foo() {}
}
