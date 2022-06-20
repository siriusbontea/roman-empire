// Mapbox API parameters
var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
var mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2lyaXVzYm9udGVhIiwiYSI6ImNrd3AzN3BnaDA4eGQycWswYmg2eGd2cjgifQ.7bGCHPM-V8bkUNxlXn9YOg'



// DARE map tiles
var dare = L.tileLayer('https://dh.gu.se/tiles/imperium/{z}/{x}/{y}.png', {
    maxZoom: 11,
    // attribution: '&copy; <a href="https://cdh.hum.gu.se/">Universitas Gothoburgensis</a>,<a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a></a>'
});

// ESRI NatGeo tiles (thick modern National borders)
var Esri_NatGeoWorldMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
    // attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
    maxZoom: 16
});

/* ---------- This map is a work in progress. Custom road layers will be added within Mapbox ------------*/
// // PlainTerrain custom tiles from Mapbox
// var plainTerrain = L.tileLayer(mbUrl, {
//     id: 'siriusbontea/cl41hks5e000x16udd55zcnuj',
//     tileSize: 512,
//     zoomOffset: -1,
//     // attribution: mbAttr
// });


var map = new L.map('map', {
    center: [41.9100498, 12.4659593], // Rome
    zoom: 7.5,
    zoomSnap: 0.1,
    zoomDelta: 0.2,
    zoomControl: false,
    maxZoom: 11,
    minZoom: 5,
    layers: [dare]
});

map.bounds = [],
    map.setMaxBounds([
        [-5, -20], // Southwest
        [80, 110] // Northeast
    ]);
map.attributionControl.setPrefix(""); // hide attrinution and citation - place it somewhere else to improve the Fung Shui of the site.


var baseLayers = {
    // 'Terrain Map': plainTerrain,
    'DARE map': dare,
    'NatGeo map (modern)': Esri_NatGeoWorldMap
};

// Note: Leaflet examples for layergroup overlays for city/park preserved in a2.js as a reference

var layerControl = L.control.layers(baseLayers).addTo(map);