mapboxgl.accessToken = 'pk.eyJ1IjoiZmxvaGF0MzIiLCJhIjoiY2o1aWhnaXhjMXh6bzMzb2RlamR5N3lxZCJ9.wu2JL5mP4H5eFeDxpmrxNQ';
    
const map = new mapboxgl.Map({
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-1.32, 46.12], // starting position [lng, lat]
    maxBounds: [[-1.32, 46.12], [-1.32, 46.12]],
    zoom: 8, // starting zoom
    maxZoom: 13, // prevent zooming in
    minZoom: 8, // prevent zooming out
});

// create a marker for the whales's location
const whaleMarker = new mapboxgl.Marker()
    .setLngLat([-1.32, 46.13]) // set the marker's position
    .addTo(map); // add the marker to the map

// listen for clicks on the whale marker
whaleMarker.on('click', function() {
    // when the marker is clicked, add some data to the "sound-effect" div
    document.getElementById('sound-effect').innerHTML = '<b>Lorem Ipsum</b>';
})