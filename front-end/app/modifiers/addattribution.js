import { modifier } from 'ember-modifier';

export default modifier(function addattribution(element /*, params, hash*/) {
  window.addEventListener('load', () => {
    const attr = document.getElementsByClassName(
      'leaflet-control-attribution leaflet-control'
    );
    attr.item(0).innerHTML =
      '<p><a href="https://leafletjs.com/">Leaflet</a> | Map Data ©<a href="https://www.openstreetmap.org/copyright/en">OpenStreetMap</a></p> | Tiles courtesy of <a href="https://geo6.be/">GEO-6</a>.';
  });
});
