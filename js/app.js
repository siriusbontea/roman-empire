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


////////// This is just a placeholder for right now //////////////
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
        `<img src='images/legionary_globe.png' class='center' style='width: 150px'><br>Geography of the Roman Empire, y'all!`, {
            className: "blue-tooltip",
            maxWidth: 200,
            sticky: true,
        }
    );




// graticulez and linez o' latitude
var gratLines = omnivore
    .topojson('data/geo_lines.topojson')
    .on("ready", function (e) {
        drawGeoLines(e.target.toGeoJSON());
    })
    .on("error", function (e) {
        console.log(e.error[0].message);
    })


// Land
var landLines = omnivore
    .topojson('data/10m_land.topojson')
    .on("ready", function (e) {
        drawGeoLines(e.target.toGeoJSON());
    })
    .on("error", function (e) {
        console.log(e.error[0].message);
    })


// // Lakes
// var lakeLines = omnivore
//     .topojson('data/10m_lakes.topojson')
//     .on("ready", function (e) {
//         drawMap(e.target.toGeoJSON());
//     })
//     .on("error", function (e) {
//         console.log(e.error[0].message);
//     })


// // Lakes and rivers centre lines
// var lakeRiverLines = omnivore
//     .topojson('data/10m_rivers_lake_centerlines.topojson')
//     .on("ready", function (e) {
//         drawMap(e.target.toGeoJSON());
//     })
//     .on("error", function (e) {
//         console.log(e.error[0].message);
//     })


// // Lakes label
// var lakeLabels = omnivore
//     .topojson('data/10m_lakes_label.topojson')
//     .on("ready", function (e) {
//         drawMap(e.target.toGeoJSON());
//     })
//     .on("error", function (e) {
//         console.log(e.error[0].message);
//     })



// // Major Roman Roads (class_code "M"), Minor Roman Roads (class_code "n"), and Fortifications (class_code "F").
// var romanRoadsWalls = omnivore
//     .topojson('data/RomanRoadsWallsIntersect_Min.topojson')
//     .on("ready", function (e) {
//         drawMap(e.target.toGeoJSON());
//     })
//     .on("error", function (e) {
//         console.log(e.error[0].message);
//     })



// // Places High - Data takes a while to load.  Will need to trim this down and keep items specific to this map app:

// // omnivore.topojson('data/places_high.topojson').addTo(map);




// /////////// Roman Empire extent layers
// var empireExtent = omnivore
//     .topojson('data/CombinedExtentLayers_v3.topojson')
//     .on("ready", function (e) {
//         drawMap(e.target.toGeoJSON());
//     })
//     .on("error", function (e) {
//         console.log(e.error[0].message);
//     })


var geoLines = [gratLines, landLines]

// var data = [gratLines, landLines, lakeLines, lakeRiverLines, lakeLabels, romanRoadsWalls, empireExtent]

function drawGeoLines(data) {
    const lines = L.geoJson(data, {
             
                        style: function (feature) {
                            return {
                                color: '#20282e',
                                weight: 2,
                                fillOpacity: 1,
                                fillColor: '#1f78b4'
                            };
                        },
                    }).addTo(map);
                }
                // end drawMap()

// /////////// drawMap()
// function drawMap(data) {
//     //crate Leaflet data layer and add to map
//     const geolinez = L.geoJson(geoLines, {
//         // style boroughs with initial default path options
//         style: function (feature) {
//             return {
//                 color: '#20282e',
//                 weight: 2,
//                 fillOpacity: 1,
//                 fillColor: '#1f78b4'
//             };
//         },
//     }).addTo(map);
// }
// // end drawMap()









// ////// Slider stuff

// function createSliderUI(dataLayer) {


//     // create Leaflet control for the slider
//     const sliderControl = L.control({
//         position: 'bottomleft'
//     });
//     // when added to the map
//     sliderControl.onAdd = function (map) {
//         // select an existing DOM element with an id of "ui-controls"
//         const slider = L.DomUtil.get("slider-control");
//         // disable scrolling of map while using controls
//         L.DomEvent.disableScrollPropagation(slider);
//         // disable click events while using controls
//         L.DomEvent.disableClickPropagation(slider);
//         // return the slider from the onAdd method
//         return slider;
//     }
//     // add the control to the map
//     sliderControl.addTo(map);

//     // select the form element
//     const slider = document.querySelector(".year-slider");
//     // listen for changes on input element
//     slider.addEventListener("input", function (e) {
//         // get the value of the selected option
//         const currentYear = e.target.value;
//         // update the map with current timestamp
//         updateMap(dataLayer, currentYear);
//         // update timestamp in period indicator heading
//         document.querySelector("#periodIndicator").innerHTML = currentYear;
//     });
// } // end createSliderUI()









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