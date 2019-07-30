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

var frameCount = 3;
var currentImage = 1;
 
function getPath() {
  return "https://gallant-albattani-48f0af.netlify.com/img/" + currentImage + ".png";
}

mapboxgl.accessToken = settings.mapbox_key; // pk.eyJ1IjoiYm9sa2hvdnNreSIsImEiOiJDZ0Nuc2tNIn0.lZxQdQsCzIU76syFmJ8MNA


var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/dark-v10',
  center: [19.5, 56.5], // starting position
  zoom: 5 // starting zoom
});

map.on('load', function() {
 
  map.addSource("radar", {
    type: "image",
    url: getPath(),
    coordinates: [
      [12.026, 60.582],
      [27.808, 60.583],
      [27.808, 56.480],
      [12.026, 56.480]
    ]
  });

  map.addLayer({
    id: "radar-layer",
      "type": "raster",
      "source": "radar",
      "paint": {
      "raster-fade-duration": 0
    }
  });
   
  setInterval(function() {
    currentImage = (currentImage + 1) % frameCount;
    map.getSource("radar").updateImage({ url: getPath() });
  }, 200);
});