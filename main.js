function init(){
  //const antananarivo = {longitude : 47.519,
  //                    latitude : 18.862};
  // 38.093568,-0.244480 / 38.090790,-0.250009
  let zoom = 15;

  const map = L.map("map").setView([-0.250009, 38.090790], zoom);
  
  let tile = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  })
  
  tile.addTo(map)

  fetch('./virtual_farm/data.geojson') // need to transfert into an API
.then(response => response.json())
.then(data => {
    L.geoJSON(data, {
        onEachFeature: function (feature, layer) {
            if (feature.properties) {
                var popupContent = "<p><strong>Name:</strong> " + feature.properties.Owner;
                
                if (feature.properties.ID_number) {
                    popupContent += "<br><strong>ID_number:</strong> " + feature.properties.ID_number;
                }

                if (feature.properties.proj_year) {
                  popupContent += "<br><strong>Agroforestry Farm from:</strong> " + feature.properties.proj_year;
                }

                if (feature.properties.trees) {
                  popupContent += "<br><strong>The tree spices are :</strong> " + feature.properties.trees;
                }                

                if (feature.properties.pic) {
                    popupContent += '<br><img src="' + feature.properties.pic + '" alt="Image" style="width:100%;">';
                }
                popupContent += "</p>";
                layer.bindPopup(popupContent);
            }
        }
    }).addTo(map);
});

}
