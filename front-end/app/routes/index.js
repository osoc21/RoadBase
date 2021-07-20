import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  model() {
    return {
      signs: this.store.query('road-sign-concept', {
        filter: { 'road-sign-concept-code': 'B9' },
      }),
      instances: this.store.findAll('road-sign-instance'),
    };
  }
}
