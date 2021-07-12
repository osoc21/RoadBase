
import Controller from '@ember/controller';

export default Controller.extend({
  marker: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [ 3.7174243, 51.0543422 ] },
        properties: {
          icon: {
            iconUrl: 'https://docs.mapbox.com/mapbox.js/assets/images/astronaut1.png',
            iconSize: [50, 50], // size of the icon
            iconAnchor: [25, 25], // point of the icon which will correspond to marker's location 
            popupAnchor: [0, -25], // point from which the popup should open relative to the iconAnchor
            className: 'dot'
          }
        }
      },
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [ 4.7174243, 50.0543422 ] }
      },
    ]
  },

  actions: {
    mapClicked({ target: map, point }) {
      console.log(map, point);
    }
  }
});