import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  model() {
    return {
      signs: this.store.findAll('road-sign-concept'),
      instances: this.store.findAll('road-sign-instance'),
    };
  }
}
