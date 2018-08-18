const client_id = "UPQZJLOV0OI1F152DMA2R42N2HKKLF1H3GOVCCIUNJGSA0L2";
const client_secret = "OVXXHERYSESIFFT5Z2ETLIJDUHDPBXAPW25QJLKVUHKJMDIG";

export const mapCenter = {lat: 29.9765634, lng: 31.2252541};

const categories = [
    // '4d4b7105d754a06374d81259',
    // '4bf58dd8d48988d16d941735',
    // '52e81612bcbc57f1066b7a0a',
    '4bf58dd8d48988d10a951735'
];    

export const getVenues = () => {
// var venuesUl = document.getElementById("venues");

var url =`https://api.foursquare.com/v2/venues/search?ll=${mapCenter.lat},${mapCenter.lng}&client_id=${client_id}&client_secret=${client_secret}&v=20180809&categoryId=${categories}&raduis=500&limit=200`;

return fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        return data.response.venues
    })
    .catch(function(err) {
        return err;
    });

}

