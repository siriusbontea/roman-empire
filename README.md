## Alpha Version
## 🚀Mapping the Infrastructure of the Roman Empire
#### updated 30 May 2022

##### Webpage:
[https://siriusbontea.github.io/roman-empire/](https://siriusbontea.github.io/roman-empire/)

##### Overview:
- This project will attempt to provide an interactive mapping visualisation of Roman territorial expansion from 500 B.C. to A.D. 200. The primary focus is on Roman roads as it correlates to the growth of the empire. The Roman road network directly contributed to commerce, ease of travel, and enabled rapid movement of Roman armies and logistical resupply.

- Why Roman roads anyway? They're longer lasting than modern roads! Some of these ancient roads didn't see much degradation until tanks rolled over them during World War 2, but even so, the roads were still in decent shape after the fact. Furthermore, Roman roads were marvels in engineering in terms of placement and would give the modern surveyor the run for their money if there was a contest of who could make a straighter road far over the horizon.

- This project was built to meet requirements for Modules 8-10 of the [MAP 673: Design For Interactive Web Mapping](https://newmapsplus.github.io/map673/syllabus/) course at the [University of Kentucky](https://newmapsplus.as.uky.edu/).

##### Anticipated Technology Requirements:
- QGIS - Most of the heavy lifting behind the scenes is with QGIS for vector layer creation, editing, analysis, and processing of data prior to use for web mapping. Georeferencing of raster data, such as scans of hand drawn maps, will be done with QGIS.
- VS Code - code editing and interaction with GitHub
- GIMP - General editing and processing of raster images 
- Inkscape - General editing of SVGs data
- GeoJSON - file format for most map data
- CSV - file format for some of the map data (to save on file size if necessary)
- HTML, CSS, JS
     - Leaflet - Primary JS library for mapping requirements, user-interface, etc.
     - PapaParse and omnivore - JS libraries for processing CSV data for use with Leaflet
     - Bootstrap - JS/CSS library for general layout, theme, and styles
- Github Pages (maybe Mapbox?)
- Adobe Stock Photos (SVGs for map icons, etc.)
- possibly other hosting service for larger data (i.e., map tiles). 

##### Data files:
- Roman roads, aqueducts, bridges (ShapeFiles) from the [Ancient World Mapping Center](https://awmc.unc.edu/wordpress/map-files/).

- Ultimately, AWMC's [shapefile directory](https://awmc.unc.edu/awmc/map_data/shapefiles/political_shading/) has a decent collection of politcal maps showing the Roman Empire at various extents (from 60 B.C. to A.D. 200). However, the shapefiles were crude and did not align with shapefiles from Natural Earth's [10m Physical Vectors](https://www.naturalearthdata.com/downloads/10m-physical-vectors/), nor did they align to major natural physical barriers such as large rivers. Furthermore, I was unable to locate and vector files for the Early Roman Republic.

- Due to these shortfalls, I used QGIS to create the vector files I needed and align them with the Natural Earth vector files.<sup>1</sup> I referred to the various reference maps (see list below) to create additional vector files for the following time periods:

     - [500 B.C. extent](FinalProjectProposal/500BC_extent_intersection.geojson) GeoJSON
     - [338 B.C. extent](FinalProjectProposal/338BC_extent_intersection.geojson) GeoJSON
     - [298 B.C. extent](FinalProjectProposal/298BC_extent_intersection.geojson) GeoJSON
     - [290 B.C. extent](FinalProjectProposal/290BC_extent_intersection.geojson) GeoJSON
     - [272 B.C. extent](FinalProjectProposal/272BC_extent_intersection.geojson) GeoJSON
     - [264 B.C. extent](FinalProjectProposal/264BC_extent_intersection.geojson) GeoJSON
     - [218 B.C. extent](FinalProjectProposal/218BC_extent_intersection.geojson) GeoJSON
     - [133 B.C. extemt](FinalProjectProposal/133BC_extent_intersection.geojson) GeoJSON<sup>2</sup>
     - [60 B.C. extent](FinalProjectProposal/60BC_extent_intersection.geojson) GeoJSON
     - [A.D. 14 extent](FinalProjectProposal/AD14_extent_intersection.geojson) GeoJSON
     - [A.D. 69 extent](FinalProjectProposal/AD69_extent_intersection.geojson) GeoJSON
     - [A.D. 117 extent](FinalProjectProposal/AD117_extent_intersection.geojson) GeoJSON
     - [A.D. 200 extent](FinalProjectProposal/AD200_extent_intersection.geojson) GeoJSON
     - [Max extent](FinalProjectProposal/max_extent_intersection.geojson) GeoJSON<sup>3</sup>

*Notes:* 
<br/> <sup>1</sup> Some of these vector files, are still a bit rough (in my opinion), and will be further refined.
<br/> <sup>2</sup> There are inconsistencies for the 133 B.C. maps depending on the source material and will be the highest priority for revision.
<br/> <sup>3</sup> The "Max extent" vector file is *not* to be used denote a particular time period, but rather to be used for clipping/intersection work within QGIS.  For example, regions in Mesopotamia and Germania Magna were temporary holdings at best or areas of Roman influence due to road/trade networks (and not necessarily Roman conquered territories).

##### User-Interface:
- A mobile-friendly responsive Leaflet map will be means to deliver content.

- The map will use a "time slider" and infrastructure "layers" that can be toggled. This interactivity afforded to the user is to assist in visualisation of these changes (i.e., expansion of Roman infrastructure) and hopefully show the importance of the role of lines of communication and how it correlates with the increase in trade and expansion of the empire.

- Popups over key locations will provide the user with additional information, links, and graphics.

- custom icons will be used to represent key locations (major cities, key terrain), location types (forts, towns), cultural areas (tribal locations), politcal boundaries (provicial areas).

##### Draft Mock-up
- Link to [draft mock-up](FinalProjectProposal/outline.pdf) PDF

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

##### Additional References (general information, inspiration for colours, fonts, etc).

- [What Did Ancient Rome Look Like? (Cinematic Animation)](https://www.youtube.com/watch?v=5XxA4CX_Ip8) - YouTube
- [Tabula Peutingeriana" (Codex Vindobonensis 324)](https://www.tabula-peutingeriana.de/) - The Tabula Peutingeriana is a copy of an old roadmap of ancient Roman road network called *cursus publicus*.
- [How Did the Ancient Romans Manage to Build Perfectly Straight, Ultra Durable Roads?](https://www.youtube.com/watch?v=IqbAkAjOw5s) - YouTube
- [Ancient Rome's Road System: The Rise and Fall of Rome](https://www.youtube.com/watch?v=Ak29JrNbxuU) - YouTube
- [Were Roman Roads more Durable than Modern Highways?](https://www.youtube.com/watch?v=4egCVU3arVk) - YouTube
- [Did the Roman Empire Invade Ireland?](https://www.thecollector.com/did-the-roman-empire-invade-ireland/)
- [Roman Roads](https://en.wikipedia.org/wiki/Roman_roads) - Wikipedia
- [Milliarium of Aiton](https://en.wikipedia.org/wiki/Milliarium_of_Aiton) Milliarium of Aiton is an ancient Roman milestone (milliarium) near Cluj-Napoca, Romania, and dates to A.D. 108. Roman Millarium provided metadata long before providing metadata was cool.

