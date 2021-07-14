import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  model() {
    this.store.findAll('road-sign-concept').then((result) => {
      console.log('result');
      console.log(result);
    });
    return {
      signs: this.store.findAll('road-sign-concept'),
    };
  }
}
