import Controller from '@ember/controller';

export default Controller.extend({
  text: 'sd',
  marker: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [-96.7969879, 32.7766642] },
      },
    ],
  },

  actions: {
    mapClicked({ target: map, point }) {
      console.log(map, point);
    },
  },
});
