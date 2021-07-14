import Route from '@ember/routing/route';

export default Route.extend({
  model: async () => {
    // Fetching signs works but the conversion from Lambert to normal coordinates doesn't (lat always return 90)
    // this conversion might not be needed for the MVP though
    // // fetching from local json-file is temporary as the mu.semtech backend is being developed
    // const markers = await fetch('/features.json')
    //   .then((result) => {
    //     return result.json();
    //   })
    //   .then((result) => {
    //     return result.features.slice(0, 100);
    //   });
    // return {
    //   markers: markers.map((marker) => {
    //     const [X, Y] = marker.geometry.coordinates;
    //     // TO DO: convert convert coordinates (Lambert 72) to lon-lat
    //     const LongRef = 0.076042943;
    //     const nLamb = 0.7716421928;
    //     const aCarre = 6378388 ^ 2;
    //     const bLamb = 6378388 * (1 - 1 / 297);
    //     const eCarre = ((aCarre - bLamb) ^ 2) / aCarre;
    //     const KLamb = 11565915.812935;
    //     const eLamb = Math.sqrt(eCarre);
    //     const eSur2 = eLamb / 2;
    //     const Tan1 = (X - 150000.01256) / (5400088.4378 - Y);
    //     const Lambda = LongRef + (1 / nLamb) * (0.000142043 + Math.atan(Tan1));
    //     const RLamb = Math.sqrt(
    //       (X - 150000.01256) ^ (2 + (5400088.4378 - Y)) ^ 2
    //     );
    //     const TanZDemi = (RLamb / KLamb) ^ (1 / nLamb);
    //     let Lati1 = 2 * Math.atan(TanZDemi);
    //     let eSin;
    //     let Mult1, Mult2, Mult;
    //     let LatiN, Diff;
    //     let lat, lng;
    //     do {
    //       eSin = eLamb * Math.sin(Lati1);
    //       Mult1 = 1 - eSin;
    //       Mult2 = 1 + eSin;
    //       Mult = (Mult1 / Mult2) ^ (eLamb / 2);
    //       LatiN = Math.PI / 2 - 2 * Math.atan(TanZDemi * Mult);
    //       Diff = LatiN - Lati1;
    //       Lati1 = LatiN;
    //     } while (Math.abs(Diff) > 0.0000000277777);
    //     lat = (LatiN * 180) / Math.PI;
    //     lng = (Lambda * 180) / Math.PI;
    //     console.log(X, Y);
    //     console.log(lat, lng);
    //     return {
    //       type: 'FeatureCollection',
    //       features: [
    //         {
    //           type: 'Feature',
    //           geometry: {
    //             type: 'Point',
    //             coordinates: [lat, lng],
    //           },
    //         },
    //       ],
    //     };
    //   }),
    // };
  },
});
