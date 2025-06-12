// console.log(coordinates);
let [lng,lat]=coordinates;
const map = L.map('map').setView([lat, lng], 11);

L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
//   L.Control.geocoder().addTo(map);
var icon = L.divIcon({
    className: 'custom-icon',
    html: '<i class="bi bi-house-door-fill""></i>',
    iconSize: [32,32],
  });
// console.log(coordinates);
  var marker = L.marker([lat, lng], { icon: icon }).addTo(map);

  var circle = L.circle([lat, lng], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 700
  }).addTo(map);

  // Add a popup
  marker.bindPopup("Exact location provided after booking.").openPopup();