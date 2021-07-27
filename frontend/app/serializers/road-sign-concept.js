import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  keyForAttribute: function (attr) {
    if (attr === 'roadSignConceptCode') {
      return 'road-sign-concept-code';
    } else {
      return this._super(...arguments);
    }
  },
});
