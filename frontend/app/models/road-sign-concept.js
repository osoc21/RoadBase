import Model, { attr, hasMany } from '@ember-data/model';

export default class RoadSignConceptModel extends Model {
  @attr('string') image;
  @attr('string') meaning;
  @attr('string') roadSignConceptCode;
  @hasMany('road-sign-instance') roadSignInstance;
}
