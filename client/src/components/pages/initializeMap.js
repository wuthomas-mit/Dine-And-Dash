import mapboxgl from "mapbox-gl";
import centroid from "@turf/centroid";

const initializeMap = () => {
  mapboxgl.accessToken =
    "pk.eyJ1Ijoid3V0aG9tYXMiLCJhIjoiY2xyazIxdW5mMDlxZzJpcDdlZWR3Z2QybiJ9.RyFTb-1qZ7D445ptcHwdvQ";
  const map = new mapboxgl.Map({
    container: "map", // container ID
    center: [-74.5, 40], // starting position [lng, lat]
    style: "mapbox://styles/wuthomas/clrk24s6p001301pff0hq9wwz",
    zoom: 9, // starting zoom
  });
  map.on("load", function () {
    map.addSource("country", {
      type: "geojson",
      data: "https://raw.githubusercontent.com/openlayers/ol3/6838fdd4c94fe80f1a3c98ca92f84cf1454e232a/examples/data/geojson/countries.geojson",
    });
    map.addLayer({
      id: "country-fills",
      type: "fill",
      source: "country",
      layout: {},
      paint: {
        "fill-color": "#627BC1",
        "fill-opacity": 0.5,
      },
    });

    map.addLayer({
      id: "country-fills-hover",
      type: "fill",
      source: "country",
      layout: {},
      paint: {
        "fill-color": "#627BC1",
        "fill-opacity": 1,
      },
      filter: ["==", "name", ""],
    });
    map.addLayer({
      id: "country-clicked",
      type: "fill",
      source: "country",
      layout: {},
      paint: {
        "fill-color": "#FF0000",
        "fill-opacity": 1,
      },
      filter: ["==", "name", ""],
    });
    // When the user moves their mouse over the page, we look for features
    // at the mouse position (e.point) and within the states layer (states-fill).
    // If a feature is found, then we'll update the filter in the state-fills-hover
    // layer to only show that state, thus making a hover effect.
    map.on("mousemove", function (e) {
      var features = map.queryRenderedFeatures(e.point, {
        layers: ["country-fills"],
      });
      if (features.length) {
        map.getCanvas().style.cursor = "pointer";
        map.setFilter("country-fills-hover", ["==", "name", features[0].properties.name]);
      } else {
        map.setFilter("country-fills-hover", ["==", "name", ""]);
        map.getCanvas().style.cursor = "";
      }
    });

    // Reset the state-fills-hover layer's filter when the mouse leaves the map
    map.on("mouseout", function () {
      map.getCanvas().style.cursor = "auto";
      map.setFilter("country-fills-hover", ["==", "name", ""]);
    });

    // map.on("click", function (e) {
    //   var features = map.queryRenderedFeatures(e.point, {
    //     layers: ["country-fills"],
    //   });
    //   if (features.length) {
    //     window.location =
    //       "https://en.wikipedia.org/wiki/" + features[0].properties.name;
    //   }
    // });
    let lastClickedCountry = null;
    map.on("click", function (e) {
      var features = map.queryRenderedFeatures(e.point, {
        layers: ["country-fills"],
      });
      if (features.length) {
        // var clickedCountry = features[0].properties.name;
        var clickedCountry = features[0].properties.name;
        const centr = centroid(features[0]);
        const [longitude, latitude] = centr.geometry.coordinates;

        map.flyTo({ center: [longitude, latitude], zoom: 4 });
        // Check if the clicked country is the same as the last clicked country
        if (clickedCountry === lastClickedCountry) {
          // If it's the same country, reset the filter and clear the last clicked country
          map.setFilter("country-clicked", ["==", "name", ""]);
          lastClickedCountry = null;
        } else {
          // If it's a different country, set the filter and update the last clicked country
          map.setFilter("country-clicked", ["==", "name", clickedCountry]);
          lastClickedCountry = clickedCountry;
        }
      }
    });
  });
};

export default initializeMap;
