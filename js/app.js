/////////
/*
DATA VARIABLES

Roads/Walls:
Major Roman Roads (class_code "M")
Minor Roman Roads (class_code "n")
Fortifications (class_code "F").

Places:
// type_code description zoom //
*11 Major settlement(capital, colonia, municipium)
*17 Major fort(legionary fortress)
*13 Civitas capital(Late Roman Gallia) 8
*12 Settlement(civitas, vicus, other settlement) 8
*18 Fort(castrum, castellum) 8
*53 Fortlet, tower 10
*16 Road or coastal station 8
31 Iron Age(Celtic) Oppidum 9
35 Late Roman Oppidum 9
19 Oasis 9
61 Sanctuary or temple 9
66 Bath 9
32 Tumulus 10
63 Cemetery 10
21 Monastery 10
24 Church 10
14 Villa 10
*57 Mine, quarry or production 10
*49 Pass 10
*51 Bridge 10
*55 Road / milestone 10
*52 Aqueduct / dam / cistern / spring 10
64 Monument 10

From the CombinedExtentLayers_v5.geojson:
    "type": "Feature",
    "properties": {
        "year_string": "500 B.C.",
        "long_name": "Extent of the Roman Republic, 500 B.C.",
        "image_link": "https://en.wikipedia.org/wiki/Roman_Republic#/media/File:Roman_conquest_of_Italy.PNG",
        "rulers": "Manius Tullius Longus; Servius Sulpicius Camerinus Cornutus",
        "event1": "In the face of a potential Sabine invasion, the Senate passed a senatus consultum authorizing the consuls to appoint a dictator, a magistrate who held absolute power during a national emergency.",
        "event2": "",
        "title_header": "Year of the Consulship of Longus and Cornutus",
        "url": "https://en.wikipedia.org/wiki/Timeline_of_Roman_history",
        "order": 0,
        "emperors_short_name": null
    }


*/
/////////
///////// This is just a placeholder for right now //////////////
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
        'romanRoadsWalls': {
            d: 'data/RomanRoadsWallsIntersect_v5.topojson',
            f: 'RomanRoadsWallsIntersect_v5',
        },
        'empireExtent': {
            d: 'data/CombinedExtentLayers_v5.topojson',
            f: 'CombinedExtentLayers_v5',
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



//////// Ask Boyd about this part /////
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
////////////////////////////////////////


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





// ////// Slider stuff (Kenya lesson example)

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
        position: 'topleft'



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





///////// 
///////// Note to self, don't break anything below here since the toggle buttons all work now:

/* --------------- Toggle on/off info footer content ---------------  */
var clickedFooter = false; // start with false condition
function myInfo() {
    // create button that changes color on click
    // create a footer overlay that displays 60% of the current viewport height
    var x = document.getElementById("footer");
    var y = document.getElementById("info-button");
    if (clickedFooter) {
        y.style.background = "#A91101";
        y.style.color = "#fff9df";
        x.style.height = "0px"; // no footer height
    } else {
        y.style.background = "#fff9dfa0";
        y.style.color = "#A91101";
        x.style.height = "60vh"; // footer 60% of viewport height
    }
    clickedFooter = !clickedFooter;
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
        x.style.display = "block"; // display
    } else {
        y.style.background = "#A91101";
        y.style.color = "#fff9df";
        x.style.display = "none"; // no display
    }
    clickedLegend = !clickedLegend;
}