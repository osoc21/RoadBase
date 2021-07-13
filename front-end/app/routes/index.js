import Route from '@ember/routing/route';
// import d3 from 'd3-geo-projection';

export default Route.extend({
  model: async () => {
    //   can we put this logic on a component level instead?

    // fetching from local json-file is temporary as the mu.semtech backend is being developed
    const markers = await fetch('/features.json')
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        return result.features.slice(0, 100);
      });
    return {
      markers: markers.map((marker) => {
        const { coordinates } = marker.geometry;
        // TO DO: convert convert coordinates (Lambert 72) to lon-lat
        return {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: coordinates,
              },
            },
          ],
        };
      }),
    };
  },
});
