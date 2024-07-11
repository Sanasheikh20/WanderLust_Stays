mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: listing.geometry.coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
});

const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`<h4><b>${listing.title}</b></h4><p>Exact location after booking.!</p>`);

const marker = new mapboxgl.Marker({ color: "red" })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(popup) // Attach the popup instance to the marker
    .addTo(map);
