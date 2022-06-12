#### Alpha Version 
updated 12 June 2022

<img src="svg/RomanAquila_AdobeStock_229200876-gold.svg" style=" margin:auto ; width:175px ; text-align:middle; margin-left:50%; margin-right:50%; margin-top:-10px; margin-bottom:-10px; ">

## Mapping the Infrastructure of the Roman Empire:

##### Webpage:
[https://siriusbontea.github.io/roman-empire/](https://siriusbontea.github.io/roman-empire/)

##### Overview:
- This project will attempt to provide an interactive mapping visualisation of Roman territorial expansion from 500 B.C. to A.D. 200. The primary focus is on Roman roads as it correlates to the growth of the empire. The Roman road network directly contributed to commerce, ease of travel, and enabled rapid movement of Roman armies and logistical resupply.

- Why Roman roads anyway? They're longer-lasting than modern roads! Some of these ancient roads didn't see much degradation until tanks rolled over them during World War 2, but even so, the roads were still in decent shape after the fact. Furthermore, Roman roads were marvels in engineering in terms of placement and would give the modern surveyor the run for their money if there was a contest of who could make a straighter road far over the horizon.

- This project was built to meet requirements for Modules 8-10 of the [MAP 673: Design For Interactive Web Mapping](https://newmapsplus.github.io/map673/syllabus/) course at the [University of Kentucky](https://newmapsplus.as.uky.edu/).

##### Methodology and Tools:
- All software tools ran on a basic laptop with the [FreeBSD 13.1-RELEASE](https://freebsdfoundation.org/freebsd-project/what-is-freebsd/) operating system:
```
MSI Pulse GL66 laptop w/ external monitor
CPU: 11th Gen Intel i7-11800H (16) @ 2.304GHz
GPU: GeForce RTX 3070 Mobile / 8192MiB
Memory:  65204MiB
```
- [QGIS 3.24.3-Tisler](https://www.qgis.org/en/site/forusers/alldownloads.html?highlight=FreeBSD#freebsd) performed most of the heavy lifting behind the scenes with vector layer creation, editing, analysis, and processing of data prior to use for web mapping. Georeferencing of raster data, such as scans of hand-drawn maps, will be done with QGIS.

- VS Code - code editing and interaction with GitHub
- GIMP - General editing and processing of raster images 
- Inkscape - General editing of SVGs data
- GeoJSON - file format for most map data
- CSV - file format for some of the map data (to save on file size if necessary)
- HTML, CSS, JS
     - Leaflet - Primary JS library for mapping requirements, user interface, etc.
     - PapaParse and omnivore - JS libraries for processing CSV data for use with Leaflet
     - Bootstrap - JS/CSS library for general layout, theme, and styles
- Github Pages (maybe Mapbox?)
- Adobe Stock Photos (SVGs for map icons, etc.)
- [Convertio](https://convertio.co/) was used to convert Adobe Illustrator (.ai) files to SVG.
- possibly other hosting service for larger data (i.e., map tiles). 

##### Data files:
- <strike>Roman roads, aqueducts, bridges (ShapeFiles) from the [Ancient World Mapping Center](https://awmc.unc.edu/wordpress/map-files/).

- Ultimately, AWMC's [shapefile directory](https://awmc.unc.edu/awmc/map_data/shapefiles/political_shading/) has a decent collection of political maps showing the Roman Empire at various extents (from 60 B.C. to A.D. 200). However, the shapefiles were crude and did not align with shapefiles from Natural Earth's [10m Physical Vectors](https://www.naturalearthdata.com/downloads/10m-physical-vectors/), nor did they align to major natural physical barriers such as large rivers. Furthermore, I was unable to locate vector files for the Early Roman Republic.

- Due to these shortfalls, I used QGIS to create the vector files I needed and align them with the Natural Earth vector files.<sup>1</sup> I referred to the various reference maps (see list below) to create additional vector files for the following time periods:

     - [500 B.C. extent](#) ~~GeoJSON~~
     - [338 B.C. extent](#) ~~GeoJSON~~
     - [298 B.C. extent](#) ~~GeoJSON~~
     - [290 B.C. extent](#) ~~GeoJSON~~
     - [272 B.C. extent](#) ~~GeoJSON~~
     - [264 B.C. extent](#) ~~GeoJSON~~
     - [218 B.C. extent](#) ~~GeoJSON~~
     - [133 B.C. extent](#) ~~GeoJSON~~<sup>2</sup>
     - [60 B.C. extent](#) ~~GeoJSON~~
     - [A.D. 14 extent](#) ~~GeoJSON~~
     - [A.D. 69 extent](#) ~~GeoJSON~~
     - [A.D. 117 extent](#) ~~GeoJSON~~
     - [A.D. 200 extent](#) ~~GeoJSON~~
     - [Max extent](#) ~~GeoJSON~~<sup>3</sup>

*Notes:* 
<br/> <sup>1</sup> Some of these vector files, are still a bit rough (in my opinion), and will be further refined.
<br/> <sup>2</sup> There are inconsistencies for the 133 B.C. maps depending on the source material and will be the highest priority for revision.
<br/> <sup>3</sup> The "Max extent" vector file is *not* to be used to denote a particular time period, but rather to be used for clipping/intersection work within QGIS.  For example, regions in Mesopotamia and Germania Magna were temporary holdings at best or areas of Roman influence due to road/trade networks (and not necessarily Roman conquered territories).</strike>

### UPDATE
###### Maps total revision
- [Combined 500 B.C. through A.D. 117](data/CombinedExtentLayers_v4.geojson) GeoJSON
- [Combined Major/Minor Roads and Fortifications](data/RomanRoadsWallsIntersect_v4.geojson) GeoJSON

- In essence, I built custom polygons because the ones on the web failed to take into account terrain features. Below, we can see the standard shapefile posted all over the interwebs that, unfortunately, don't take into account terrain:

![Old data](images/old_data.png)

- And, here's my interpretation of what the historical Roman boundary should really look like:

![New data](images/new_data.png)
- In the early stages of the Roman Republic's expansion across the Italian peninsula, it is simply not realistic to think that Rome would prefer to gain control of mountainous alpine terrain over the fertile Po river valley. The old map files were an eye sore and badly needed fixing!

- The data I've generated here is released under the [BSD 3-Clause License](LICENSE). So, if there are more fixes to be made, go for it! Or just do whatever you want.  It's BSD. :-)

##### Datasets:

- Roman Roads [data used in this project](data/RomanRoadsWallsIntersect_v4.geojson) is derived primarily from the [Digital Atlas of Roman and Medieval Civilization Dataverse](https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/TI0KAU) but combined with data from [Mercator-E Project](https://fabricadesites.fcsh.unl.pt/mercator-e/) to add to the Hispania region, and [VOL. 4 THE ROADS Fasc. 4.1 NOTES ON THE ITINERARIA](http://library.biaa.ac.uk/cgi-bin/koha/opac-retrieve-file.pl?id=5417eb858dee0a9bdd06f2d8671bbc0c) to add to some of the missing segments in the Asia Minor region. The dataset from [The Roads of Roman Britain](https://roadsofromanbritain.org/index.html) was not incorporated, not because it was lacking — rather the opposite as it had more detail compared to all of the other datasets. If interested in Roman Roads in Britannia specifically, be sure to check out their highly detailed research.

- [Project MERCURY-MINERVA-SIMREC (Computational Modeling in Roman Studies)](https://projectmercury.eu/datasets/)

- [Juxtaposing GIS and Archaeologically Mapped Ancient Road Routes](https://www.mdpi.com/2673-7086/2/1/5/pdf) PDF - Journal article by Paddington Hodza and Kurtis A. Butler at the Wyoming Geographic Information Science Center, the University of Wyoming outlining some of the many challenges with the mapping of archaeological road networks with GIS.

###### Roman Road Network (version 2008):
##### This is the old dataset that inspired me to make a new dataset:

- [Digital Atlas of Roman and Medieval Civilization Dataverse](https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/TI0KAU)

This study provides a portable, digital version of the Roman roads identified in the Barrington Atlas, which users can visualize in combination with their own historical data. (2008) 

- Citation:
     - McCormick, Michael; Huang, Guoping; Zambotti, Giovanni; Lavash, Jessica, 2013, "Roman Road Network (version 2008)", https://doi.org/10.7910/DVN/TI0KAU, Harvard Dataverse, V1


###### Roman roads in Britannia:

- [The Roads of Roman Britain](https://roadsofromanbritain.org/index.html)

- [Roman Roads Research Association](https://www.romanroads.org/)

     - [Roman Roads in Lancashire](https://www.romanroads.org/gazetteer/lancspages.html)

     - [Roman Roads in Cumbria](https://www.romanroads.org/gazetteer/cumbria/cumbriapages.html)

     - [Roman Roads in Cheshire](https://www.romanroads.org/gazetteer/cheshire/cheshire.html)


###### Roman roads in Hispania:

- [Mercator-E Project](https://fabricadesites.fcsh.unl.pt/mercator-e/)

     - [Interactive Map - Roman Roads](https://www.arcgis.com/home/webmap/viewer.html?webmap=0178a2683de44c81b5839aac2b48411e&extent=-10.6672,36.3778,3.5162,43.5015)

###### Roman roads and milestones of Asia Minor:

- [British Institute at Ankara](https://biaa.ac.uk/publication/open-access-electronic-publications/roman-roads/)

     - [VOL. 4 THE ROADS Fasc. 4.1 NOTES ON THE ITINERARIA](http://library.biaa.ac.uk/cgi-bin/koha/opac-retrieve-file.pl?id=5417eb858dee0a9bdd06f2d8671bbc0c)

###### Points of Interest:

- Data from [Klokantech Github](https://github.com/klokantech/roman-empire) which was derived from data from the [Centre for Digital Humanities, University of Gothenburg](https://dh.gu.se/dare/) and made into GeoJSON files:

     - [places_high](data/places_high.geojson) GeoJSON
     - [places_medium](data/places_medium.geojson) GeoJSON
     - [places_low](data/places_low.geojson) GeoJSON
     - [places_subsites](data/places_subsites.geojson) GeoJSON
     - [fortifications](data/fortifications.geojson) GeoJSON
     - [10m_lakes_label](data/10m_lakes_label.geojson) GeoJSON
     - [10m_lakes](data/10m_lakes.geojson) GeoJSON
     - [10m_rivers_lakes_centerlines](data/10m_rivers_lake_centerlines.geojson) GeoJSON

Type Identifier|Description|Zoom 
:---:| ---|:---: 
11 |Major settlement (capital, colonia, municipium) |6
17 |Major fort (legionary fortress) |6
13 |Civitas capital (Late Roman Gallia) |8
12 |Settlement (civitas, vicus, other settlement) |8
18 |Fort (castrum, castellum) |8
53 |Fortlet, tower |10
16 |Road or coastal station |8
31 |Iron Age (Celtic) Oppidum |9
35 |Late Roman Oppidum |9
19 |Oasis |9
61 |Sanctuary or temple |9
66 |Bath |9
32 |Tumulus| 10
63 |Cemetery |10
21 |Monastery |10
24 |Church |10
14 |Villa |10
57 |Mine, quarry or production| 10
49 |Pass |10
51 |Bridge |10
55 |Road/milestone |10
52 |Aqueduct/dam/cistern/spring |10
64 |Monument |10

##### Base Map:

[My "Plain Terrain" Map created with Mapbox](https://api.mapbox.com/styles/v1/siriusbontea/cl41hks5e000x16udd55zcnuj.html?title=view&access_token=pk.eyJ1Ijoic2lyaXVzYm9udGVhIiwiYSI6ImNrd3AzN3BnaDA4eGQycWswYmg2eGd2cjgifQ.7bGCHPM-V8bkUNxlXn9YOg&zoomwheel=true&fresh=true#4.79/45.4/9.88)

###### Base Map (option):

[The Wandering Cartographer (Digital Atlas of the Roman Empire)](https://wanderingcartographer.wordpress.com/2020/01/05/digital-atlas-of-the-roman-empire/) Article on how to add the Digital Atlas of the Roman Empire (DARE) basemap to QGIS.

##### Other Resources:
- Font selection for this project attepts to be as close to authentic Roman inscriptions as possible. The [Trajan font](https://fonts.adobe.com/fonts/trajan#fonts-section) from the [Adobe Font Collection](https://fonts.adobe.com/) is based upon the [carved inscription on the Trajan column](http://codex99.com/typography/21.html) at the Basilica Ulpia in the Forum of Trajan and depicts the Emperor Trajan's own account of his conquest of Emperor Trajan’s own account of his compaigns leading to the conquest of Decebalus (A.D. 101 - 102) and the annexation of Dacia (A.D. 105 - 106).

- Colours are based on the [dyes used by the Romans](https://www.jennydean.co.uk/colours-of-the-romans/) which often had [symobolism](https://ancient-rome.info/ancient-roman-colors-symbolism/) in mind. Additionally, materials such as parchment are normally much brighter when newly made compared to the darker hues we see in museums due to aging. Due to variability in the dyes, pigments, and materials used, its nearly impossible to create a perfect match on a webpage. However, I'll do the best I can to provide a close approximation.

##### User-Interface:
- A mobile-friendly responsive Leaflet map will be means to deliver content.

- The map will use a "time slider" and infrastructure "layers" that can be toggled. This interactivity afforded to the user is to assist in visualisation of these changes (i.e., expansion of Roman infrastructure) and hopefully show the importance of the role of lines of communication and how it correlates with the increase in trade and expansion of the empire.

- Popups over key locations will provide the user with additional information, links, and graphics.

- custom icons will be used to represent key locations (major cities, key terrain), location types (forts, towns), cultural areas (tribal locations), politcal boundaries (provicial areas).

##### Draft Mock-up:
- Link to [draft mock-up](data/outline.pdf) PDF

##### Reference Maps:
- [OmniAtlas (Category: Roman Empire)](https://omniatlas.com/tags/roman-empire/)
- [David Rumsey Map Collection](https://www.davidrumsey.com/luna/servlet/view/search?cat=0&q=roman%20empire&sort=pub_list_no_initialsort%2Cpub_date%2Cpub_list_no%2Cseries_no&os=50)
- [Roman Empire](https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~219527~5504649:Roman-Empire-?sort=pub_list_no_initialsort%2Cpub_date%2Cpub_list_no%2Cseries_no&qvq=q:roman%20empire;sort:pub_list_no_initialsort%2Cpub_date%2Cpub_list_no%2Cseries_no;lc:RUMSEY~8~1&mi=64&trs=492)
- [Tab. XII. Imperium Romanum](https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~307006~90076945:Tab--XII--Imperium-Romanum?sort=pub_list_no_initialsort%2Cpub_date%2Cpub_list_no%2Cseries_no&qvq=q:roman%20empire;sort:pub_list_no_initialsort%2Cpub_date%2Cpub_list_no%2Cseries_no;lc:RUMSEY~8~1&mi=107&trs=492)
- [Map No. 49. Map of Roman Empire at the period of its greatest extent](https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~304434~90075020:Map-No--49--Map-of-Roman-Empire-at-?sort=pub_list_no_initialsort%2Cpub_date%2Cpub_list_no%2Cseries_no&qvq=q:roman%20empire;sort:pub_list_no_initialsort%2Cpub_date%2Cpub_list_no%2Cseries_no;lc:RUMSEY~8~1&mi=334&trs=492)
- [Historical Europe Maps.](https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~307623~90077503:Historical-Europe-Maps-?sort=pub_list_no_initialsort%2Cpub_date%2Cpub_list_no%2Cseries_no&qvq=q:roman%20empire;sort:pub_list_no_initialsort%2Cpub_date%2Cpub_list_no%2Cseries_no;lc:RUMSEY~8~1&mi=358&trs=492)
- [Map of the Roman Empire](https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~255170~5519645:Map-of-the-Roman-Empire?sort=pub_list_no_initialsort%2Cpub_date%2Cpub_list_no%2Cseries_no&qvq=q:roman%20empire;sort:pub_list_no_initialsort%2Cpub_date%2Cpub_list_no%2Cseries_no;lc:RUMSEY~8~1&mi=419&trs=492)
- [Roman Empire at the Time of Christ.](https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~35560~1200914:Roman-Empire-at-the-Time-of-Christ-?sort=pub_list_no_initialsort%2Cpub_date%2Cpub_list_no%2Cseries_no&qvq=q:roman%20empire;sort:pub_list_no_initialsort%2Cpub_date%2Cpub_list_no%2Cseries_no;lc:RUMSEY~8~1&mi=431&trs=492)
- [L'Empire Roman sous Theodose.](https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~202234~3001004:L-Empire-Roman-sous-Theodose-?sort=pub_list_no_initialsort%2Cpub_date%2Cpub_list_no%2Cseries_no&qvq=q:roman%20empire;sort:pub_list_no_initialsort%2Cpub_date%2Cpub_list_no%2Cseries_no;lc:RUMSEY~8~1&mi=434&trs=492)
- [Old Maps Online](https://www.oldmapsonline.org/map/mzk/2619269167)
- [vici.org - Archaeological Atlas of Antiquity](https://vici.org/#10/41.67243943468705,12.654305574768694/11350)
- [Historical Maps of Ancient Rome](https://www.heritage-history.com/index.php?c=resources&s=study-page&h=ancient_rome&f=historical_maps)
- [Maps of Ancient Rome](https://www.heritage-history.com/ssl/cds/ancient_rome/html/guide_maps.html)
- [Roman Empire at its greatest extent, A.D. 200](https://www.heritage-history.com/ssl/cds/ancient_rome/maps/ancient/class016.jpg)
- [Development of the Roman Empire, A.D. 180](https://www.heritage-history.com/ssl/cds/ancient_rome/maps/dow/dow003.jpg)
- [Territorial Expansion of Rome, A.D. 200](https://www.heritage-history.com/ssl/cds/ancient_rome/maps/shepherd/shep034-035.jpg)
- [The Rhine country in Roman times, A.D. 200](https://www.heritage-history.com/ssl/cds/ancient_rome/maps/shepherd/shep039b.jpg)
- [Gallia, A.D. 200](https://www.heritage-history.com/ssl/cds/ancient_rome/maps/ancient/class046.jpg)
- [Germania, A.D. 200](https://www.heritage-history.com/ssl/cds/ancient_rome/maps/ancient/class048.jpg)
- [Roman Empire on the eve of the Barbarian Irruptions, A.D. 400](https://www.heritage-history.com/ssl/cds/ancient_rome/maps/philips/phil001.jpg)
- [Reference Map of the European Provinces of the Roman Empire, A.D. 100](https://www.heritage-history.com/ssl/cds/ancient_rome/maps/shepherd/shep038-039.jpg)
- [Economic Map of the Ancient World, A.D. 200](https://www.heritage-history.com/ssl/cds/ancient_rome/maps/shepherd/shep044.jpg)
- [Growth of Roman Power in Asia Minor, before the outbreak of the Mithridatic Wars, 90 B.C.](https://www.heritage-history.com/ssl/cds/ancient_rome/maps/shepherd/shep033b.jpg)
- [The Growth of Roman Power in Italy to 218 B.C.](https://www.heritage-history.com/ssl/cds/ancient_rome/maps/shepherd/shep029.jpg)
- [Reference Map of Asia Minor under the Greeks and Romans, B.C. 100](https://www.heritage-history.com/ssl/cds/ancient_rome/maps/shepherd/shep020.jpg)
- [Growth of Roman Power in Asia Minor, as organized by Pompey, 63 B.C.](https://www.heritage-history.com/ssl/cds/ancient_rome/maps/shepherd/shep033c.jpg)
- [Country about the lower Danube in Roman times, A.D. 200](https://www.heritage-history.com/ssl/cds/ancient_rome/maps/shepherd/shep039c.jpg)
- [Growth of Roman Power in Asia Minor, as organized by Pompey, 63 B.C.](https://www.heritage-history.com/ssl/cds/ancient_rome/maps/shepherd/shep033c.jpg)
- [Map of the Roman Empire under Hadrian (ruled 117–138 AD)](https://en.wikipedia.org/wiki/File:Roman_Empire_125.png)
- [The Roman Empire in A.D. 117 at its greatest extent, at the time of Trajan's death](https://en.wikipedia.org/wiki/Roman_Empire#/media/File:Roman_Empire_Trajan_117AD.png)

##### Additional References (general information, inspiration for colours, fonts, etc.):

- [What Did Ancient Rome Look Like? (Cinematic Animation)](https://www.youtube.com/watch?v=5XxA4CX_Ip8) - YouTube
- [Tabula Peutingeriana" (Codex Vindobonensis 324)](https://www.tabula-peutingeriana.de/) - The Tabula Peutingeriana is a copy of an old roadmap of ancient Roman road network called *cursus publicus*.
- [How Did the Ancient Romans Manage to Build Perfectly Straight, Ultra Durable Roads?](https://www.youtube.com/watch?v=IqbAkAjOw5s) - YouTube
- [Ancient Rome's Road System: The Rise and Fall of Rome](https://www.youtube.com/watch?v=Ak29JrNbxuU) - YouTube
- [Were Roman Roads more Durable than Modern Highways?](https://www.youtube.com/watch?v=4egCVU3arVk) - YouTube
- [Did the Roman Empire Invade Ireland?](https://www.thecollector.com/did-the-roman-empire-invade-ireland/)
- [Roman Roads](https://en.wikipedia.org/wiki/Roman_roads) - Wikipedia
- [Milliarium of Aiton](https://en.wikipedia.org/wiki/Milliarium_of_Aiton) Milliarium of Aiton is an ancient Roman milestone (milliarium) near Cluj-Napoca, Romania, and dates to A.D. 108. Roman Millarium provided metadata long before providing metadata was cool.

##### Web resources:

- Attribution for some icons:
     - [Rome icons created by Freepik - Flaticon](https://www.flaticon.com/free-icons/rome)
