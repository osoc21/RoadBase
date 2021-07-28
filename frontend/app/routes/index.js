import Route from '@ember/routing/route';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class IndexRoute extends Route {
  @tracked codeFilter = 'A';
  @tracked nextStoreId = 1;

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
      saveNewSign: (location_lat, location_lon, direction, signConceptId) => {
        // push in cache
        this.store.push({
          data: [
            {
              id: this.nextStoreId,
              type: 'road-sign-instance',
              attributes: {
                location_lat,
                location_long: location_lon,
                direction,
              },
              relationships: {
                type: 'road-sign-concept',
                id: signConceptId,
              },
            },
          ],
        });
        this.nextStoreId += 1;
        // push in
      },
    };
  }

  @action
  searchSignsByCode(event) {
    // not yet working, but leaving it in to prioritise other stuff
    if (event.data) this.codeFilter = event.data;
    this.refresh();
  }
}
