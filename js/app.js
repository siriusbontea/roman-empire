// // ////////// Start of Projected
// var naprj = {
//   epsg: "EPSG:3034",
//   def: "+proj=lcc+lat_1=35+lat_2=65+lat_0=52+lon_0=10+x_0=4000000+y_0=2800000+ellps=GRS80+towgs84=0,0,0,0,0,0,0+units=m+no_defs",
//   resolutions: [8192, 4096, 2048, 1024, 512, 256, 128],
//   origin: [0, 0],
// };

// var crs = new L.Proj.CRS(naprj.epsg, naprj.def, {
//   resolutions: naprj.resolutions,
//   origin: naprj.origin,
// });


// // ////////// End of Projected

var southWest = L.latLng(-5, -20),
    northEast = L.latLng(80, 110),
    bounds = L.latLngBounds(southWest, northEast);

var options = {
    // crs: crs,   // comment if not using projection other than WGS84
    center: [41.9100498, 12.4659593], // Rome
    zoom: 7.5,
    zoomSnap: 0.1,
    zoomDelta: 0.2,
    zoomControl: false,
    maxBounds: bounds,
    maxZoom: 11,
    minZoom: 5,
    // layers: [plainTerrain, dare, streets]   /// layer options not working
};

// Mapbox API parameters
var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
var mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2lyaXVzYm9udGVhIiwiYSI6ImNrd3AzN3BnaDA4eGQycWswYmg2eGd2cjgifQ.7bGCHPM-V8bkUNxlXn9YOg'

// // mapbox API parameters
// const accessToken = 'pk.eyJ1Ijoic2lyaXVzYm9udGVhIiwiYSI6ImNrd3AzN3BnaDA4eGQycWswYmg2eGd2cjgifQ.7bGCHPM-V8bkUNxlXn9YOg';
// const yourName = "siriusbontea";
// const yourMap = "cl41hks5e000x16udd55zcnuj"; // PlainTerrain

// const map = L.map("map", options);
// map.attributionControl.setPrefix("");
// // map.scrollWheelZoom.disable();

//  L.tileLayer(
//    `https://api.mapbox.com/styles/v1/${yourName}/${yourMap}/tiles/256/{z}/{x}/{y}?access_token=${accessToken}`, {
//     //  attribution: '',
//     //  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
//      maxZoom: 18,
//    }
//  ).addTo(map);

const map = L.map("map", options);
map.attributionControl.setPrefix("");
// map.scrollWheelZoom.disable();

var baseMaps = {
    "Terrain": plainTerrain,
    "DARE": dare,
    "Modern Streets": streets
};

var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
var mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2lyaXVzYm9udGVhIiwiYSI6ImNrd3AzN3BnaDA4eGQycWswYmg2eGd2cjgifQ.7bGCHPM-V8bkUNxlXn9YOg'

// PlainTerrain custom tiles from Mapbox
var plainTerrain = L.tileLayer(mbUrl, {
    id: 'siriusbontea/cl41hks5e000x16udd55zcnuj',
    tileSize: 512,
    zoomOffset: -1,
    attribution: mbAttr
}).addTo(map);

// DARE map tiles
var dare = L.tileLayer('https://dh.gu.se/tiles/imperium/{z}/{x}/{y}.png', {
    maxZoom: 11,
    attribution: '&copy; <a href="https://cdh.hum.gu.se/">Universitas Gothoburgensis</a>,<a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a></a>'
});

// Mapbox streets-v11 tiles
var streets = L.tileLayer(mbUrl, {
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    attribution: mbAttr
});

//////// Not working yet...
// var layerControl = L.control.layers(baseMaps).addTo(map);


/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │  Mapbox GL JS is cool in that it can do projected raster maps.          │
  │ However, it does everything else differently with markers, etc.         │
  │ compared to Leaflet.  New learning curve (nothing wrong with that),     │
  │ but not enough time to mess with right now. I just need to get things   │
  │ working!                                                                │
  └─────────────────────────────────────────────────────────────────────────┘
 */
// /// start of Mapbox GL JS (from instructions)
// mapboxgl.accessToken = 'pk.eyJ1Ijoic2lyaXVzYm9udGVhIiwiYSI6ImNrd3AzN3BnaDA4eGQycWswYmg2eGd2cjgifQ.7bGCHPM-V8bkUNxlXn9YOg';
// const map = new mapboxgl.Map({
// container: 'map',
// style: 'mapbox://styles/siriusbontea/cl41hks5e000x16udd55zcnuj',
// center: [0,1],
// zoom: 0,
// projection: {
//   name: 'lambertConformalConic',
//   center: [12, 42],
//   parallels: [30, 30]
// }
// });
// /// end of Mapbox GL JS


var romeIcon = L.icon({
    iconUrl: "svg/RomanAquila_AdobeStock_229200876-gold.svg", // placeholder icon for now
    iconSize: [90, 60], // size of the icon
    iconAnchor: [5, 10], // point of the icon which will correspond to marker's location
    popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
});

L.marker([41.9100498, 12.4659593], {
        icon: romeIcon,
    })
    .addTo(map)
    .bindTooltip(
        `<img src='images/legionary_globe.png' class='center'><br>Geography of the Roman Empire, y'all!`, {
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


///////////// Roman Empire extent layers
// Extent of Roman Empire, 500 B.C.
var extent500BC = L.geoJson(extent500BCdata, {
    style: function (feature) {
        return {
            color: "#000",
            fillColor: "#A91101",
            weight: 1,
            fillOpacity: 0.3,
            interactive: false,
        };
    },
}).addTo(map);

// Extent of Roman Empire, 338 B.C.
var extent338BC = L.geoJson(extent338BCdata, {
    style: function (feature) {
        return {
            color: "#000",
            fillColor: "#A91101",
            weight: 1,
            fillOpacity: 0.3,
            interactive: false,
        };
    },
});

// Extent of Roman Empire, 298 B.C.
var extent298BC = L.geoJson(extent298BCdata, {
    style: function (feature) {
        return {
            color: "#000",
            fillColor: "#A91101",
            weight: 1,
            fillOpacity: 0.3,
            interactive: false,
        };
    },
});

// Extent of Roman Empire, 290 B.C.
var extent290BC = L.geoJson(extent290BCdata, {
    style: function (feature) {
        return {
            color: "#000",
            fillColor: "#A91101",
            weight: 1,
            fillOpacity: 0.3,
            interactive: false,
        };
    },
});

// Extent of Roman Empire, 272 B.C.
var extent272BC = L.geoJson(extent272BCdata, {
    style: function (feature) {
        return {
            color: "#000",
            fillColor: "#A91101",
            weight: 1,
            fillOpacity: 0.3,
            interactive: false,
        };
    },
});

// Extent of Roman Empire, 264 B.C.
var extent264BC = L.geoJson(extent264BCdata, {
    style: function (feature) {
        return {
            color: "#000",
            fillColor: "#A91101",
            weight: 1,
            fillOpacity: 0.3,
            interactive: false,
        };
    },
});

// Extent of Roman Empire, 218 B.C.
var extent218BC = L.geoJson(extent218BCdata, {
    style: function (feature) {
        return {
            color: "#000",
            fillColor: "#A91101",
            weight: 1,
            fillOpacity: 0.3,
            interactive: false,
        };
    },
});

// Extent of Roman Empire, 133 B.C.
var extent133BC = L.geoJson(extent133BCdata, {
    style: function (feature) {
        return {
            color: "#000",
            fillColor: "#A91101",
            weight: 1,
            fillOpacity: 0.3,
            interactive: false,
        };
    },
});

// Extent of Roman Empire, 60 B.C.
var extent60BC = L.geoJson(extent60BCdata, {
    style: function (feature) {
        return {
            color: "#000",
            fillColor: "#A91101",
            weight: 1,
            fillOpacity: 0.3,
            interactive: false,
        };
    },
});


// Extent of Roman Empire, A.D. 14
var extentAD14 = L.geoJson(extentAD14data, {
    style: function (feature) {
        return {
            color: "#000",
            fillColor: "#A91101",
            weight: 1,
            fillOpacity: 0.3,
            interactive: false,
        };
    },
});


// Extent of Roman Empire, A.D. 69
var extentAD69 = L.geoJson(extentAD69data, {
    style: function (feature) {
        return {
            color: "#000",
            fillColor: "#A91101",
            weight: 1,
            fillOpacity: 0.3,
            interactive: false,
        };
    },
});


// Extent of Roman Empire, A.D. 117
var extentAD117 = L.geoJson(extentAD117data, {
    style: function (feature) {
        return {
            color: "#000",
            fillColor: "#A91101",
            weight: 1,
            fillOpacity: 0.3,
            interactive: false,
        };
    },
});


// Extent of Roman Empire, A.D. 200
var extentAD200 = L.geoJson(extentAD200data, {
    style: function (feature) {
        return {
            color: "#000",
            fillColor: "#A91101",
            weight: 1,
            fillOpacity: 0.3,
            interactive: false,
        };
    },
});


/////////// Roads layer

var romanRoads = L.geoJson(romanRoadsData, {
    style: function (feature) {
        return {
            color: "#000",
            weight: 1,
            fillOpacity: 0.3,
            interactive: false,
        };
    },
});


/* --------------- Toggle on/off info footer content ---------------  */
var clicked = false; // start with false condition
function myInfo() {
    // create button that changes color on click
    // create a footer overlay that displays 60% of the current viewport height
    var x = document.getElementById("footer");
    var y = document.getElementById("info-button");
    if (clicked) {
           y.style.background = "#A91101";
           y.style.color = "#fff9df";
        x.style.height = "0px"; // no footer height
    } else {
     y.style.background = "#fff9dfa0";
     y.style.color = "#A91101";
        x.style.height = "60vh"; // footer 60% of viewport height
    }
    clicked = !clicked;
}

