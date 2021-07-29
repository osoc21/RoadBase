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
      cacheNewSign: (location_lat, location_lon, direction, signConceptId) => {
        // push in cache
        const concept = signConceptId
          ? this.store.peekRecord('road-sign-concept', signConceptId)
          : undefined;

        const result = this.store.push({
          data: [
            {
              id: this.nextStoreId,
              type: 'road-sign-instance',
              attributes: {
                location_lat,
                location_long: location_lon,
                direction,
              },
              relationships: {},
            },
          ],
        });
      },
      saveNewSign: (location_lat, location_lon, direction, signConceptId) => {
        // save in store
        const concept = signConceptId
          ? this.store.peekRecord('road-sign-concept', signConceptId)
          : undefined;

        const newSignRecord = this.store.createRecord('road-sign-instance', {
          location_lat,
          location_long: location_lon,
          direction,
          roadSignConcept: concept,
        });
        newSignRecord.save();
        this.nextStoreId += 1;
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
