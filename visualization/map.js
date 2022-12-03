mapboxgl.accessToken =
  "pk.eyJ1IjoiZmxvaGF0MzIiLCJhIjoiY2o1aWhnaXhjMXh6bzMzb2RlamR5N3lxZCJ9.wu2JL5mP4H5eFeDxpmrxNQ";

const map = new mapboxgl.Map({
  container: "map", // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/mapbox/streets-v12", // style URL
  center: [-1.32, 46.12], // starting position [lng, lat]
  zoom: 9, // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

var toggle = document.querySelector(".toggle-sidebar");
var sidebar = document.querySelector(".sidebar");

console.log(toggle);

toggle.addEventListener("click", function () {
  sidebar.classList.toggle("show-sidebar");
  console.log("Button clicked");
});

map.on("load", () => {
  // Add a custom vector tileset source. This tileset contains
  // point features representing museums. Each feature contains
  // three properties. For example:
  // {
  //     alt_name: "Museo Arqueologico",
  //     name: "Museo Inka",
  //     tourism: "museum"
  // }
  // Add the Mapbox Terrain v2 vector tileset. Read more about
  // the structure of data in this tileset in the documentation:
  // https://docs.mapbox.com/vector-tiles/reference/mapbox-terrain-v2/
  map.addSource("contours", {
    type: "vector",
    url: "mapbox://mapbox.mapbox-terrain-v2",
  });
  map.addLayer({
    id: "contours",
    type: "line",
    source: "contours",
    "source-layer": "contour",
    layout: {
      // Make the layer visible by default.
      visibility: "visible",
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#877b59",
      "line-width": 1,
    },
  });
  map.addSource("my-geojson-file", {
    type: "geojson",
    data: "../data/DCSMM2018_D11C1.3.geojson",
  });

  map.addLayer({
    id: "my-geojson-layer",
    type: "circle",
    source: "my-geojson-file",
    paint: {
      "circle-color": "red",
    },
  });
});

// After the last frame rendered before the map enters an "idle" state.
map.on("idle", () => {
  // If these two layers were not added to the map, abort
  if (!map.getLayer("contours") || !map.getLayer("my-geojson-layer")) {
    return;
  }

  // Enumerate ids of the layers.
  const toggleableLayerIds = ["contours", "my-geojson-layer"];

  // Set up the corresponding toggle button for each layer.
  for (const id of toggleableLayerIds) {
    // Skip layers that already have a button set up.
    if (document.getElementById(id)) {
      continue;
    }

    // Create a link.
    const link = document.createElement("a");
    link.id = id;
    link.href = "#";
    link.textContent = id;
    link.className = "active";

    // Show or hide layer when the toggle is clicked.
    link.onclick = function (e) {
      const clickedLayer = this.textContent;
      e.preventDefault();
      e.stopPropagation();

      const visibility = map.getLayoutProperty(clickedLayer, "visibility");

      // Toggle layer visibility by changing the layout object's visibility property.
      if (visibility === "visible") {
        map.setLayoutProperty(clickedLayer, "visibility", "none");
        this.className = "";
      } else {
        this.className = "active";
        map.setLayoutProperty(clickedLayer, "visibility", "visible");
      }
    };

    const layers = document.getElementById("menu");
    layers.appendChild(link);
  }
});
