let map;

// Initialize Map
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 26.8467, lng: 80.9462 }, // Lucknow
        zoom: 12,
    });
}

// Fetch Charging Stations
async function fetchChargingStations() {
    const response = await fetch("https://api.openchargemap.io/v3/poi/?output=json&countrycode=IN&maxresults=10");
    const stations = await response.json();

    stations.forEach(station => {
        const marker = new google.maps.Marker({
            position: {
                lat: station.AddressInfo.Latitude,
                lng: station.AddressInfo.Longitude
            },
            map: map,
            title: station.AddressInfo.Title
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `<h5>${station.AddressInfo.Title}</h5>
                      <p>${station.AddressInfo.AddressLine1 || "No address available"}</p>`
        });

        marker.addListener("click", () => {
            infoWindow.open(map, marker);
        });
    });
}

// Button Click
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("search-button").addEventListener("click", () => {
        fetchChargingStations();
    });
});