require([
  "esri/Map",
  "esri/views/SceneView",
  "esri/widgets/Home",
  "esri/layers/FeatureLayer",
  "esri/widgets/Search",
  "esri/symbols/SimpleFillSymbol",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/Color",
  "dojo/domReady!"
], function(Map, SceneView, Home, FeatureLayer, Search, SimpleFillSymbol, SimpleMarkerSymbol, Color) {

  const map = new Map({
    basemap: "gray" // Change the basemap to light gray canvas
  });

  const view = new SceneView({
    container: "viewDiv",
    map: map,
    center: [-90.1994, 38.6270], // Center the map more on the city
    zoom: 12 // Zoom out more to show more of the city
  });

  const schoolSymbol = new SimpleMarkerSymbol({
    style: "circle",
    color: "#000080", // Dark blue color
    outline: {
      color: [0, 0, 0, 1], // Black outline
      width: 1
    }
  });

  const parkSymbol = new SimpleFillSymbol({
    color: new Color([0, 100, 0, 0.5]), // Dark green color with transparency
    outline: {
      color: new Color([0, 50, 0]), // Darker green outline
      width: 1
    }
  });

  const schoolLayer = new FeatureLayer({
    url: "https://services5.arcgis.com/vElyTHUSDMtSHSgT/arcgis/rest/services/St_Louis_Public_Schools/FeatureServer/0",
    outFields: ["*"],
    renderer: {
      type: "simple",
      symbol: schoolSymbol
    },
    popupTemplate: {
      title: "{SCHOOL_NAM}",
      content: "School Name: {SCHOOL_NAM}<br>Address: {ADDRESS}"
    }
  });

  const parkLayer = new FeatureLayer({
    url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/arcgis/rest/services/STL_parks_TBP/FeatureServer/0",
    outFields: ["*"],
    renderer: {
      type: "simple",
      symbol: parkSymbol
    },
    popupTemplate: {
      title: "{TEXT_}",
      content: "Park Name: {TEXT_}<br>Area: {ACRES} acres"
    }
  });

  map.addMany([schoolLayer, parkLayer]);

  // Create and add the Search widget
  const searchWidget = new Search({
    view: view
  });
  view.ui.add(searchWidget, {
    position: "top-right"
  });

  // Create and add the Home widget
  const homeWidget = new Home({
    view: view
  });
  view.ui.add(homeWidget, {
    position: "top-left"
  });

});
