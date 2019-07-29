// take settings from the url
var settings = {};
window.location.search.substring(1).split('&').forEach(function(q) {
    var kv = q.split('=');
    settings[kv[0]] = kv[1];
});

var datasetId = settings.dataset || 'noaa_wpc_qpf_1_7_days_6hr';
var variableName = settings.variable || 'APCP_surfaceMsurface';

if (settings.mapbox_key === undefined) {
    console.log('Can not find "mapbox_key" in current URL, please add "&mapbox_key=<your_key>" to this URL.');
}

if (settings.planetos_key === undefined) {
    console.log('Can not find "planetos_key" in current URL, please add "&planetos_key=<your_key>" to this URL.');
}


mapboxgl.accessToken = settings.mapbox_key; // pk.eyJ1IjoiYm9sa2hvdnNreSIsImEiOiJDZ0Nuc2tNIn0.lZxQdQsCzIU76syFmJ8MNA

var mapStyle = {
  "version": 8,
  "name": "Dark",
  "sources": {
    "mapbox": {
      "type": "vector",
      "url": "mapbox://mapbox.mapbox-streets-v8"
    },
    "overlay": {
      "type": "image",
      "url": "img/1.png",
      "coordinates": [
        [12.026, 60.582],
        [27.808, 60.583],
        [27.808, 56.480],
        [12.026, 56.480]
      ]
    }
  },
  "sprite": "mapbox://sprites/mapbox/dark-v10",
  "glyphs": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
  "layers": [
    {
      "id": "background",
      "type": "background",
      "paint": {"background-color": "#111"}
    },
    {
      "id": "water",
      "source": "mapbox",
      "source-layer": "water",
      "type": "fill",
      "paint": {"fill-color": "#2c2c2c"}
    },
    {
      "id": "boundaries",
      "source": "mapbox",
      "source-layer": "admin",
      "type": "line",
      "paint": {"line-color": "#797979", "line-dasharray": [2, 2, 6, 2]},
      "filter": ["all", ["==", "maritime", 0]]
    },
    {
      "id": "overlay",
      "source": "overlay",
      "type": "raster",
      "paint": {"raster-opacity": 0.85}
    },
  ]
  };
  var map = new mapboxgl.Map({
  container: 'map', // container id
  style: mapStyle,
  center: [19.5, 56.5], // starting position
  zoom: 6 // starting zoom
});