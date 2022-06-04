
//// DARE map tile layer for now - It's a beautiful map, but for this project, I plan to make my own.
// L.tileLayer(
//     `https://dh.gu.se/tiles/imperium/{z}/{x}/{y}.png`, {
//         attribution: '<a href="https://cdh.hum.gu.se/">Universitas Gothoburgensis</a>,<a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>',
//         maxZoom: 11,
//     }
// ).addTo(map);
////

// ////////// Start of Projected
var naprj = {
  epsg: "EPSG:3034",
  def: "+proj=lcc+lat_1=35+lat_2=65+lat_0=52+lon_0=10+x_0=4000000+y_0=2800000+ellps=GRS80+towgs84=0,0,0,0,0,0,0+units=m+no_defs",
  resolutions: [8192, 4096, 2048, 1024, 512, 256, 128],
  origin: [0, 0],
};

var crs = new L.Proj.CRS(naprj.epsg, naprj.def, {
  resolutions: naprj.resolutions,
  origin: naprj.origin,
});


// ////////// End of Projected

var southWest = L.latLng(-5, -20),
  northEast = L.latLng(80, 110),
  bounds = L.latLngBounds(southWest, northEast);

var options = {
  // crs: crs,
  center: [41.9100498, 12.4659593], // Rome
  zoom: 7.5,
  zoomSnap: 0.1,
  zoomDelta: 0.2,
  zoomControl: false,
  maxBounds: bounds,
  maxZoom: 11,
  minZoom: 5,
};

const map = L.map("map", options);
map.attributionControl.setPrefix("");
// map.scrollWheelZoom.disable();



// DARE map tiles layer for now - It's a beautiful map, but for this project, I plan to make my own.
L.tileLayer(
  `https://dh.gu.se/tiles/imperium/{z}/{x}/{y}.png`, {
    attribution: '<a href="https://cdh.hum.gu.se/">Universitas Gothoburgensis</a>,<a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>',
    maxZoom: 11,
  }
).addTo(map);
// end DARE map tiles



var romeIcon = L.icon({
  iconUrl:
    "svg/RomanAquila_AdobeStock_229200876.svg", // placeholder icon for now
  iconSize: [60, 66], // size of the icon
  iconAnchor: [5, 10], // point of the icon which will correspond to marker's location
  popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
});

L.marker([41.9100498, 12.4659593], {
  icon: romeIcon,
})
  .addTo(map)
  .bindTooltip(
    `<img src='images/legionary_globe.png' class='center'><br>Geography of the Roman Empire, y'all!`,
    {
      className: "blue-tooltip",
      maxWidth: 300,
      sticky: true,
    }
  );

// graticules 
fetch("data/geo_lines.geojson")
  .then(function (response) {
    console.log(response);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  })
  .then(function (data) {
    var data = L.geoJson(data, {
      style: function (feature) {
        return {
          color: "#000",
          weight: 0.5,
          opacity: .5,
          interactive: false,
        };
      },
    }).addTo(map);
    drawMap(data);
  })
  .then(function () {
    drawNewLayers();
  })
  .catch(function (error) {
    console.log(`Something went wrong: ${error}`);
  });

// Map
fetch("data/map_extent.geojson")
  .then(function (response) {
    console.log(response);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  })
  .then(function (data) {
    var data = L.geoJson(data, {
      style: function (feature) {
        return {
          color: "black",
          weight: .5,
          opacity: 1,
          fillColor: "#ffffff",
          fillOpacity: 0,
          interactive: false,
        };
      },
    }).addTo(map);
  })
  .then(function () {
    drawNewLayers();
  })
  .catch(function (error) {
    console.log(`Something went wrong: ${error}`);
  });
