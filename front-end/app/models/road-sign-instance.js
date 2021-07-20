import Model, { attr } from '@ember-data/model';

export default class RoadSignInstanceModel extends Model {
  @attr('string') location_lat;
  @attr('string') location_long;
}
