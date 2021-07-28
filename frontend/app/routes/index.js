import Route from '@ember/routing/route';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class IndexRoute extends Route {
  @tracked codeFilter = 'A';

  model() {
    return {
      signs: this.store.query('road-sign-concept', {
        filter: {
          'road-sign-concept-code': this.codeFilter,
        },
      }),
      instances: this.store.findAll('road-sign-instance', {
        include: 'road-sign-concept',
      }),
    };
  }

  @action
  searchSignsByCode(event) {
    // not yet working, but leaving it in to prioritise other stuff
    if (event.data) this.codeFilter = event.data;
    this.refresh();
  }
}
