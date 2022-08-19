/////////
/*
DATA VARIABLES

Roads/Walls:
Major Roman Roads (class_code "M")
Minor Roman Roads (class_code "n")
Fortifications (class_code "F").

Places:
// type_code description zoom //
*11 Major settlement(capital, colonia, municipium) 6
*17 Major fort(legionary fortress) 6
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

Extent of Empire:
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
    iconSize: [35, 35], // size of the icon
    iconAnchor: [15, 15], // point of the icon which will correspond to marker's location
    popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
});
L.marker([41.9100498, 12.4659593], {
        icon: romeIcon,
        interactive: false,
    })
    .addTo(map)
    // .bindTooltip(
    //     `<img src='images/legionary_globe.png' class='center' style='width: 150px'><br>Geography of the Roman Empire, y'all!`, {
    //         className: "blue-tooltip",
    //         maxWidth: 200,
    //         sticky: true,
    //     }
    // );

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
        //     d: 'data/RomanRoadsWallsIntersect_v5.topojson',
        //     f: 'RomanRoadsWallsIntersect_v5',
        // },
        'empireExtent': {
            d: 'data/CombinedExtentLayers_v6.topojson',
            f: 'CombinedExtentLayers_v6',
            colors: ['#05006f', '#290069', '#3b0062', '#48005c', '#540055', '#5e004f', '#670049', '#6f0042', '#77003c', '#7f0035', '#86002f', '#8d0028', '#940220', '#9b0718', '#a20c0e', '#A91101'],
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
        // console.log(d.out)
        drawMap(d.out)
    })

function drawMap(d) {
    drawGeoLines(d.gratLines)
    drawGeoLines(d.landLines)
    drawExtent(d.empireExtent)
    // drawRoadsWalls(d.romanRoadsWalls)   //// slow render - look at moving this layer to basemap in Mapbox
}
////////////////////////////////////////


function drawGeoLines(geoLines) {
    const lines = L.geoJson(geoLines, {
        style: function (feature) {
            return {
                color: '#000',
                weight: .5,
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
            if (props < 17) {
                return {
                    color: colors[props],
                    weight: 2,
                    fillOpacity: .6,
                    fillColor: colors[props],
                    // interactive: false,
                };
            } else if (props < 0) {

                return {
                    color: '#000',
                    weight: 2,
                    fillOpacity: .6,
                    fillColor: '#000',
                    // interactive: false,
                };
            }
        },
        onEachFeature: function (feature, layer) {
            if (feature.properties.order == 0) {
                makePopups (feature.properties, layer)
            }
            
        }
    }).addTo(map);

    // listen somehow in change in order value
    const order = 0
    extent.eachLayer(function (i) {
        if (i.feature.properties.order > order) {
            i.setStyle({
                opacity: 0,
                fillOpacity: 0
            })
        } else {
            i.setStyle({
                opacity: 0.8,
                weight: 2,
                fillOpacity: 0.6
            })
        }
        i.on('mouseover click', function (e) {
            i.setStyle({
                color: 'yellow',
            })
            i.bringToFront()
        })
        i.on('mouseout', function (e) {
            const props = i.feature.properties.order
            i.setStyle({
                color: colors[props]
            })

        })
    })

    // extent.on('mouseover', function (e) {
        
    //     e.target.setStyle({
    //         color: 'yellow',
    //     })
    // })
    // extent.on('mouseout', function (e) {
        
    //     extent.resetStyle()
    // })
    sequenceUI(extent)
}
///////////////

function makePopups (props, layer) {

    
    const style =
    "margin-left:auto;margin-right:auto;width:100%;height:100%;border-radius:10px;background-color:000;border:1px solid #A91101;";

    const popupContent = `<h2>${props.long_name}</h2><hr>${props.event1}<hr>${props.event2}<hr><h4>Rulers of Rome:</h4>${props.rulers}<br><img src="${props.ruler_image_link}" style="${style}">`
    layer.bindPopup(popupContent, {
        className: "empire-extent-tooltip",
        sticky: true,
        direction: "auto",
        offset: [0, 250],
      });
}




function drawRoadsWalls() {
    // console.log(romanRoadsWalls)
    fetch('data/RomanRoadsWallsIntersect_v6.geojson')
        .then(function (r) {
            return r.json();
        })
        .then(function (r) {
            //     const t = L.glify.layer({
            //         geojson: r,
            //         // paneName: 'foo',
            //         glifyOptions: {
            //             size: 2,
            //             opacity: 0.8,
            //             click (e, feature) {

            //                 console.log({ e, feature });
            //             },
            //             sensitivity: 3,
            //             hover(e, feature) {
            //                 console.log('hover', feature);
            //             }
            //         },
            //         onAdd(){
            //             console.log('onAdd callback');
            //         },
            //         onLayersInit(){
            //             console.log('onLayersInit callback');
            //         },
            //         onRemove(){
            //             console.log('onRemove callback');
            //         },
            //     });
            //     console.log(t)
            //     t.addTo(map)

            const roads = L.geoJson(r, {
                style: function (feature) {
                    return {
                        color: 'magenta',
                        weight: 2,
                    };
                },
            }).addTo(map);

        })


}



// ////////// Start of function sequenceUI() - Function for event listener for slider
function sequenceUI(empireExtent) {

    // create Leaflet control for the slider
    const sliderControl = L.control({
        position: 'bottomleft',
    });
    // when control is added
    sliderControl.onAdd = function () {

        // select the current slider with id of 'year-slider'
        const controls = L.DomUtil.get("slider-div");
        // disable scroll and click events on map beneath slider
        L.DomEvent.disableScrollPropagation(controls);
        L.DomEvent.disableClickPropagation(controls);
        // return selection to control
        return controls;
    }

    // add it to the map
    sliderControl.addTo(map);

    //// START of year_string
    // create Leaflet control for the current year output
    const yearControl = L.control({
        position: 'topleft'
    });
    // select the slider
    const slider = document.querySelector("#yearSlider");
    // select the slider's input and listen for change
    slider.addEventListener("input", function (e) {
        let year = ""
        let longname = ""
        let titleheader = ""
        let firstevent = ""
        let secondevent = ""
        let rulersfull = ""
        let rulersimage = ""

        // current value of slider is year
        var currentYear = e.target.value
        // var currentYear = e.target.year
        empireExtent.eachLayer(function (i) {
            // console.log(i.feature.properties)
            if (i.feature.properties.order == currentYear) {
                year = i.feature.properties.year_string
                longname = i.feature.properties.long_name
                titleheader = i.feature.properties.title_header
                firstevent = i.feature.properties.event1
                secondevent = i.feature.properties.event2
                rulersfull = i.feature.properties.rulers
                rulersimage = i.feature.properties.ruler_image_link

            }
            makePopups (i.feature.properties, i)

            if (i.feature.properties.order > currentYear) {
                i.setStyle({
                    opacity: 0,
                    fillOpacity: 0
                })

                i.unbindPopup()

            } else {

                i.setStyle({
                    opacity: 0.8,
                    weight: 2,
                    fillOpacity: 0.6
                })
            }
        })
        // Adding the Year Indicator for the slider
        document.getElementById("yearIndicator");
        yearIndicator.innerHTML = `<span>${year}</span>`
        // ////////
        document.getElementById("longName");
        // longName.innerHTML = `<span>${longname}</span>`

        document.getElementById("titleHeader");
        titleHeader.innerHTML = `<span>${titleheader}</span>`

        document.getElementById("eventOne");
        eventOne.innerHTML = `<span>${firstevent}</span>`

        document.getElementById("eventTwo");
        eventTwo.innerHTML = `<span>${secondevent}</span>`

        document.getElementById("romeRulers");
        romeRulers.innerHTML = `<span>${rulersfull}</span>`

        document.getElementById("romeRulersImage");
        romeRulersImage.innerHTML = `<span><img src="${rulersimage}"></span>`

        const empireContent = document.getElementById("empire-content");
        empireContent.innerHTML = `<span>${firstevent}</span>
                                   <span><img src="${rulersimage}" class="romeRulersImageStyle"></span>`

    });

} // end of function sequenceUI()


/* --------------- Toggle on/off info footer content ---------------  */
var clickedFooter = false; // start with false condition
function myInfo() {
    // create button that changes color on click
    // create a footer overlay that displays 30% of the current viewport height
    var x = document.getElementById("footer");
    var y = document.getElementById("info-button");
    if (clickedFooter) {
        y.style.background = "#A91101";
        y.style.color = "#fff9df";
        y.innerHTML = "<img src='images/footer_book_icon_off.svg'>"
        // x.style.height = "0px"; // no footer height
        x.style.display = "none"; // no display
    } else {
        y.style.background = "#fff9dfa0";
        y.style.color = "#A91101";
        y.innerHTML = "<img src='images/footer_book_icon_on.svg'>"
        // x.style.height = "30vh"; // footer 30% of viewport height
        x.style.display = "block"; // display
    }
    clickedFooter = !clickedFooter;
}

// /* --------------- Toggle on/off legend content ---------------  */
// var clickedLegend = false; // start with false condition
// function myLegend() {
//     // create button that changes color on click
//     var x = document.getElementById("legend");
//     var y = document.getElementById("legend-button");
//     if (clickedLegend) {
//         y.style.background = "#A91101";
//         y.style.color = "#fff9df";
//         y.innerHTML = "<img src='images/map_legend_icon_off.png'>"
//         x.style.display = "none"; // no display
//     } else {
//         y.style.background = "#fff9dfa0";
//         y.style.color = "#A91101";
//         y.innerHTML = "<img src='images/map_legend_icon_on.png'>"
//         x.style.display = "block"; // display
//     }
//     clickedLegend = !clickedLegend;
// }

// /* --------------- Toggle on/off events panel content ---------------  */
// var clickedEventsPanel = false; // start with false condition
// function myEventsPanel() {
//     var x = document.getElementById("events-panel");
//     var y = document.getElementById("events-panel-button");
//     if (clickedEventsPanel) {
//         y.style.background = "#A91101";
//         y.style.color = "#fff9df";
//         y.innerHTML = "<img src='images/sundial_events_icon_off.png'>"
//         x.style.display = "none";
//     } else {
//         y.style.background = "#fff9dfa0";
//         y.style.color = "#A91101";
//         y.innerHTML = "<img src='images/sundial_events_icon_on.png'>"
//         x.style.display = "block";
//     }
//     clickedEventsPanel = !clickedEventsPanel;
// }

/* --------------- Toggle on/off rulers panel content ---------------  */
var clickedRulersPanel = false; // start with false condition
function myRulerPanel() {
    var x = document.getElementById("rulersPanel");
    var y = document.getElementById("rulers-panel-button");
    if (clickedRulersPanel) {
        y.style.backgroundColor = "#A91101";
        y.style.color = "#fff9df";
        y.innerHTML = "<img src='images/ruler_icon_off.svg'>"
        x.style.display = "none";
    } else {

        y.style.backgroundColor = "#fff9dfa0";
        y.style.color = "#A91101";
        y.innerHTML = "<img src='images/ruler_icon_on.svg'>"
        x.style.display = "block";
    }
    clickedRulersPanel = !clickedRulersPanel;
}

// /* --------------- Toggle on/off carousel panel content ---------------  */
// var clickedCarouselPanel = false; // start with false condition
// function myCarouselPanel() {
//     var x = document.getElementById("carouselPanel");
//     var y = document.getElementById("carousel-panel-button");
//     if (clickedCarouselPanel) {
//         y.style.backgroundColor = "#A91101";
//         y.style.color = "#fff9df";
//         y.innerHTML = "<img src='images/carousel_icon_off.svg'>"
//         x.style.display = "none";
//     } else {

//         y.style.backgroundColor = "#fff9dfa0";
//         y.style.color = "#A91101";
//         y.innerHTML = "<img src='images/carousel_icon_on.svg'>"
//         x.style.display = "block";
//     }
//     clickedCarouselPanel = !clickedCarouselPanel;
// }


// Carsousel 
