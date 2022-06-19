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
        //     d: 'data/RomanRoadsWallsIntersect_v5.topojson',
        //     f: 'RomanRoadsWallsIntersect_v5',
        // },
        'empireExtent': {
            d: 'data/CombinedExtentLayers_v6.topojson',
            f: 'CombinedExtentLayers_v6',
            colors: ['#000000', '#222219', '#444433', '#66664D', '#898966', '#ABAB80', '#CDCD9A', '#F0F0B4', '#E7D49D', '#DEB887', '#D59C70', '#CC805A', '#C36444', '#BA482D', '#B12C17', '#A91101'],
            ruler_image: [
                `<img src='images/#'>`, // 0 - 500 B.C.
                `<img src='images/#'>`, // 1 - 338 B.C.
                `<img src='images/#'>`, // 2 - 298 B.C.
                `<img src='images/#'>`, // 3 - 290 B.C.
                `<img src='images/#'>`, // 4 - 272 B.C.
                `<img src='images/#'>`, // 5 - 264 B.C.
                `<img src='images/#'>`, // 6 - 218 B.C.
                `<img src='images/#'>`, // 7 - 133 B.C.
                `<img src='photos/#'>`, // 8 - 60 B.C. 
                // Julius Caesar / https://www.britannica.com/biography/Julius-Caesar-Roman-ruler
                // 27 BC to AD 14. / Caesar Augustus (aka Octavian) / https://sothebys-md.brightspotcdn.com/e5/38/05562c1d4b0686e692a436815f8d/l20107-bl3pv-8.jpg
                `<img src='photos/#'>`, // 9 - A.D. 16 
                // Tiberius / https://i.pinimg.com/736x/49/c5/12/49c5127adb21f3b012e4aa1b3fa049e1--statue-of-emperor.jpg
                `<img src='photos/#'>`, // 10 - A.D. 47  
                // Claudius / https://live.staticflickr.com/3275/2941754707_29bb037b98_b.jpg
                `<img src='photos/#'>`,         // 11 - A.D. 69 
                // Galba / http://ancientrome.ru/art/img/7/7853.jpg
                // Otho / https://en.wikipedia.org/wiki/Otho#/media/File:Otone_-_foto_di_euthman.jpg
                //  Vitellius / https://www.anticstore.com/DocBD/commerce/antiquaire/galerie-sismann-622/objet/66332/AnticStore-Large-Ref-66332_02.jpg
                // Vespasian / https://upload.wikimedia.org/wikipedia/commons/c/c6/Vespasianus01_pushkin.jpg

                `<img src='photos/#'>`, // 12 - A.D. 84
                // Domitian / https://en.wikipedia.org/wiki/Domitian#/media/File:Domiziano_da_collezione_albani,_fine_del_I_sec._dc._02.JPG
                `<img src='photos/#'>`, // 13 - A.D. 102
                // Trajan / https://en.wikipedia.org/wiki/Trajan#/media/File:Traianus_Glyptothek_Munich_72.jpg
                `<img src='photos/#'>`, // 14 - A.D. 117
                // Hadrian / https://museum.classics.cam.ac.uk/sites/museum.classics.cam.ac.uk/files/casts/531.JPG
                `<img src='photos/#'>`, // 15 - Max Extent
            ]
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
                    fillOpacity: 1,
                    fillColor: colors[props],
                    interactive: false,
                };
            } else if (props < 0) {

                return {
                    color: '#000',
                    weight: 1,
                    fillOpacity: .6,
                    fillColor: '#000',
                    interactive: false,
                };
            }
        },
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
                fillOpacity: 0.6
            })
        }
    })
    sequenceUI(extent)
}
///////////////

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



// // ////// Slider stuff (Kenya lesson example)

// ////////// Start of function sequenceUI() - Function for event listener for slider
function sequenceUI(empireExtent) {

    // create Leaflet control for the slider
    const sliderControl = L.control({
        position: 'bottomleft',
    });
    // when control is added
    sliderControl.onAdd = function () {

        // select the current slider with id of 'year-slider'
        const controls = L.DomUtil.get("yearSlider");
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
            if (i.feature.properties.order > currentYear) {
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
        // Adding the Year Indicator for the slider
        document.getElementById("yearIndicator");
        yearIndicator.innerHTML = `<span>${year}</span>`
        // ////////
        document.getElementById("longName");
        longName.innerHTML = `<span>${longname}</span>`

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



    });





} // end of function sequenceUI()


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