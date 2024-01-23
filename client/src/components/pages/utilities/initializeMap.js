import mapboxgl from "mapbox-gl";
import centroid from "@turf/centroid";

async function fetchRandomCountry() {
  try {
    // Fetch the list of countries from your backend
    const response = await fetch("/api/countries");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON response
    const countries = await response.json();

    // Select a random country
    const randomIndex = Math.floor(Math.random() * countries.length);
    const randomCountry = countries[randomIndex];

    // Use the random country as needed
    console.log("Random Country:", randomCountry);
    return randomCountry;
  } catch (error) {
    console.error("Failed to fetch a random country:", error);
  }
}

const initializeMap = () => {
  mapboxgl.accessToken =
    "pk.eyJ1Ijoid3V0aG9tYXMiLCJhIjoiY2xyazIxdW5mMDlxZzJpcDdlZWR3Z2QybiJ9.RyFTb-1qZ7D445ptcHwdvQ";
  const map = new mapboxgl.Map({
    container: "map", // container ID
    center: [0, 0], //  .0 position [lng, lat]
    style: "mapbox://styles/wuthomas/clrk24s6p001301pff0hq9wwz",
    zoom: 0, // starting zoom
  });
  map.on("load", async function () {
    const country = await fetchRandomCountry();
    const lat = Number(country.Lat.replace(/"/g, ""));
    const long = Number(country.Long.replace(/"/g, ""));

    map.flyTo({ center: [long, lat], zoom: 4 });

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

    // if (country_data) {
    //   console.log("country found");
    //   const centr = centroid(country_data[0]);
    //   const [longitude, latitude] = centr.geometry.coordinates;
    //   map.flyTo({ center: [longitude, latitude], zoom: 4 });
    // } else {
    //   console.log("Country not found");
    // }

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
