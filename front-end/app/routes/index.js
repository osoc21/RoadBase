import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class IndexRoute extends Route {
  model() {
    return {
      signs: this.store.findAll('road-sign-concept'),
      instances: this.store.findAll('road-sign-instance'),
    };
  }
}
