// var cities = L.layerGroup();

// var mLittleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.').addTo(cities);
// var mDenver = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.').addTo(cities);
// var mAurora = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.').addTo(cities);
// var mGolden = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.').addTo(cities);


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

// PlainTerrain custom tiles from Mapbox
var plainTerrain = L.tileLayer(mbUrl, {
    id: 'siriusbontea/cl41hks5e000x16udd55zcnuj',
    tileSize: 512,
    zoomOffset: -1,
    // attribution: mbAttr
});


var map = new L.map('map', {
    center: [41.9100498, 12.4659593], // Rome
    zoom: 7.5,
    zoomSnap: 0.1,
    zoomDelta: 0.2,
    zoomControl: false,
    maxZoom: 11,
    minZoom: 5,
    layers: [plainTerrain]
});

map.bounds = [],
    map.setMaxBounds([
        [-5, -20],
        [80, 110]
    ]);
map.attributionControl.setPrefix("");


var baseLayers = {
    'Terrain Map': plainTerrain,
    'DARE map': dare,
    'NatGeo map (modern)': Esri_NatGeoWorldMap
};

var overlays = {
    // 'Cities': cities
};

var layerControl = L.control.layers(baseLayers, overlays).addTo(map);

// var crownHill = L.marker([39.75, -105.09]).bindPopup('This is Crown Hill Park.');
// var rubyHill = L.marker([39.68, -105.00]).bindPopup('This is Ruby Hill Park.');



// var parks = L.layerGroup([crownHill, rubyHill]);

// var satellite = L.tileLayer(mbUrl, {
//     id: 'mapbox/satellite-v9',
//     tileSize: 512,
//     zoomOffset: -1,
//     attribution: mbAttr
// });
// layerControl.addBaseLayer(satellite, 'Satellite');
// layerControl.addOverlay(parks, 'Parks');





// var southWest = L.latLng(-5, -20),
//     northEast = L.latLng(80, 110),
//     bounds = L.latLngBounds(southWest, northEast);

// var options = {
//     // crs: crs,   // comment if not using projection other than WGS84
//     center: [41.9100498, 12.4659593], // Rome
//     zoom: 7.5,
//     zoomSnap: 0.1,
//     zoomDelta: 0.2,
//     zoomControl: false,
//     maxBounds: bounds,
//     maxZoom: 11,
//     minZoom: 5,
//     // layers: [dare, Esri_NatGeoWorldMap]   /// layer options not working
// };

// const map = L.map("map", options);
// map.attributionControl.setPrefix("");
// // map.scrollWheelZoom.disable();

// // Mapbox API parameters
// var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
// var mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2lyaXVzYm9udGVhIiwiYSI6ImNrd3AzN3BnaDA4eGQycWswYmg2eGd2cjgifQ.7bGCHPM-V8bkUNxlXn9YOg'


// var baseMaps = {
//     // 'Terrain': plainTerrain,
//     'DARE': dare,
//     'NatGeo': Esri_NatGeoWorldMap
// };

// // // PlainTerrain custom tiles from Mapbox
// // var plainTerrain = L.tileLayer(mbUrl, {
// //     id: 'siriusbontea/cl41hks5e000x16udd55zcnuj',
// //     tileSize: 512,
// //     zoomOffset: -1,
// //     attribution: mbAttr
// // });

// // DARE map tiles
// var dare = L.tileLayer('https://dh.gu.se/tiles/imperium/{z}/{x}/{y}.png', {
//     maxZoom: 11,
//     attribution: '&copy; <a href="https://cdh.hum.gu.se/">Universitas Gothoburgensis</a>,<a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a></a>'
// });

// // ESRI NatGeo tiles (thick modern National borders)
// var Esri_NatGeoWorldMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
//     attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
//     maxZoom: 16
// });





////////// This is just a placeholder for right now //////////////
var romeIcon = L.icon({
    iconUrl: "svg/Colosseum_AdobeStock_203412188.svg", // placeholder icon for now
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

const d = {
    'in': [],
    'out': {},
    'sources': {
        'gratLines': {
            d: 'data/geo_lines.topojson',
            f: 'geo_lines'
        },
        'landLines': {
            d: 'data/10m_land.topojson',
            f: '10m_land'
        },
        // 'romanRoadsWalls': {
        //     d: 'data/RomanRoadsWallsIntersect_v4.topojson',
        //     f: '',
        // },
        'empireExtent': {
            d: 'data/CombinedExtentLayers_v4.topojson',
            f: 'CombinedExtentLayers_v4',
            colors: ['#000', '#111', '#222', '#333', '#444', '#555', '#666']
        },
    }
}

for (let x in d.sources) {
    d.in.push(
        fetch(d.sources[x].d)
            .then(function (r) {
                return r.json();
            })
    )
}

Promise.all(d.in)
    .then(function (r) {
        let i = 0
        for (let x in d.sources) {
            const geojson = topojson.feature(r[i], {
                type: 'GeometryCollection',
                geometries: r[i].objects[d.sources[x].f].geometries
            });
            d.out[x] = geojson
            i++
        }
        console.log(d.out)
        drawMap(d.out)
    })

function drawMap(d) {
    drawGeoLines(d.gratLines)
    drawGeoLines(d.landLines)
    drawExtent(d.empireExtent)
}



function drawGeoLines(geoLines) {
    const lines = L.geoJson(geoLines, {
        style: function (feature) {
            return {
                color: 'red',
                weight: 2,
                fillOpacity: 0,
                interactive: false,
            };
        },
    }).addTo(map);
}

function drawExtent(empireExtent) {
    const colors = d.sources.empireExtent.colors
    const extent = L.geoJson(empireExtent, {
        style: function (feature) {
            const props = feature.properties.order
            if (props < 7) {
                return {
                    color: colors[props],
                    weight: 1, // set weight to 0 after the slider works
                    fillOpacity: .6,
                    fillColor: colors[props],
                    interactive: false,
                };
            } else {
                return {
                    color: 'smoke',
                    weight: 1, // set weight to 0 after the slider works
                    fillOpacity: .2,
                    fillColor: '#A91101',
                    interactive: false,
                };
            }
        },
    }).addTo(map);
    // listen somehow in change in order value
    const order = 6
    extent.eachLayer(function (i) {
        if (i.feature.properties.order > order) {
            i.setStyle({
                opacity: 0,
                fillOpacity: 0
            })
        } else {
            i.setStyle({
                opacity: 0.8,
                fillOpacity: 0.8
            })
        }
    })
}

// function drawRoadsWalls(romanRoadsWalls) {
//     const roads = L.geoJson(romanRoadsWalls, {
//         style: function (feature) {
//             return {
//                 color: '#333333',
//                 weight: 1,
//             };
//         },
//     }).addTo(map);
// }
// console.log("Here is the output of empireExtent:", empireExtent)

// Major Roman Roads (class_code "M"), Minor Roman Roads (class_code "n"), and Fortifications (class_code "F").
// function drawRoadsWalls(romanRoadsWalls) {
//     const props = arcs.properties; // this is not the one... stuck on how to access the data in the data/RomanRoadsWallsIntersect_v4.topojson  !!!


// console.log("Here is the output of romanRoadsWalls:", L.geoJson(romanRoadsWalls))

// console.log("Here is the output of data/RomanRoadsWallsIntersect_v4.geojson", data/RomanRoadsWallsIntersect_v4.geojson)

// romanRoadsWalls.eachLayer(function (layer) {


//         if (props.CLASS[F]) {  // Black line for Fortification
//             layer.setStyle({
//                 color: 'black',
//                 weight: 3
//             });

//         } else if (props.CLASS[M]) { // Red line for Major Road
//             layer.setStyle({
//                 color: 'red',
//                 weight: 3
//             });
//         } else if (props.CLASS[n]) {
//             layer.setStyle({ 
//                 color: 'orange',
//                 weight: 3
//             });
//         };   
//     }).addTo(map);

// }


//////////////// START of water section //////////////////

// // Lakes
// var lakeLines = omnivore
//     .topojson('data/10m_lakes.topojson')
//     .on("ready", function (e) {
//         drawWaterLines(e.target.toGeoJSON());
//     })
//     .on("error", function (e) {
//         console.log(e.error[0].message);
//     })

// // Lakes and rivers centre lines
// var lakeRiverLines = omnivore
//     .topojson('data/10m_rivers_lake_centerlines.topojson')
//     .on("ready", function (e) {
//         drawWaterLines(e.target.toGeoJSON());
//     })
//     .on("error", function (e) {
//         console.log(e.error[0].message);
//     })

// // Lakes label
// var lakeLabels = omnivore
//     .topojson('data/10m_lakes_label.topojson')
//     .on("ready", function (e) {
//         drawWaterLines(e.target.toGeoJSON());
//     })
//     .on("error", function (e) {
//         console.log(e.error[0].message);
//     })

// These water polygons kinda suck and don't line up nicely... Keeping the code for right now if I want to use the data (Latin names for lakes, rivers, etc.)

// function drawWaterLines(waterLines) {
//     const water = L.geoJson(waterLines, {
//         style: function (feature) {
//             return {
//                 color: '#00416A',
//                 weight: 0,
//                 fillOpacity: 0,
//                 fillColor: '#00416A',
//             };
//         },
//     }).addTo(map);
// }

//////////////// END of water section





// ////// Slider stuff

////////// Start of function sequenceUI() - Function for event listener for slider
function sequenceUI(girlsLayer, boysLayer) {

    // create Leaflet control for the slider
    const sliderControl = L.control({
        position: 'bottomleft',
    });
    // when control is added
    sliderControl.onAdd = function () {

        // select the current slider with id of 'slider'
        const controls = L.DomUtil.get("slider");
        // disable scroll and click events on map beneath slider
        L.DomEvent.disableScrollPropagation(controls);
        L.DomEvent.disableClickPropagation(controls);
        // return selection to control
        return controls;
    }

    // add it to the map
    sliderControl.addTo(map);

    // create Leaflet control for the current grade output
    const gradeControl = L.control({
        position: 'bottomleft'



    });



    // select the slider
    const slider = document.querySelector("#slider input");
    // select the slider's input and listen for change
    slider.addEventListener("input", function (e) {
        // current value of slider is current grade level
        var currentGrade = e.target.value

        // resize the circles with updated grade level
        resizeCircles(girlsLayer, boysLayer, currentGrade);

        //////// Adding the Grade Indicator for the slider

        document.getElementById("gradeIndicator");
        gradeIndicator.innerHTML = `<span>Grade ${currentGrade}</span>`

        ///////
    });
} // end of function sequenceUI()






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

/* --------------- Toggle on/off legend content ---------------  */
var clickedLegend = false; // start with false condition
function myLegend() {
    // create button that changes color on click
    // create a footer overlay that displays 60% of the current viewport height
    var x = document.getElementById("legend");
    var y = document.getElementById("legend-button");
    if (clickedLegend) {
        y.style.background = "#fff9dfa0";
        y.style.color = "#A91101";
        x.style.display = "block"; // no footer height
    } else {
        y.style.background = "#A91101";
        y.style.color = "#fff9df";
        x.style.display = "none"; // footer 60% of viewport height
    }
    clickedLegend = !clickedLegend;
}
