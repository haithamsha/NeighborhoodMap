const client_id = "UPQZJLOV0OI1F152DMA2R42N2HKKLF1H3GOVCCIUNJGSA0L2";
const client_secret = "OVXXHERYSESIFFT5Z2ETLIJDUHDPBXAPW25QJLKVUHKJMDIG";

const mapCenter = {lat: 29.9765634, lng: 31.2252541};

const categories = [
    '4d4b7105d754a06374d81259',
    '4bf58dd8d48988d16d941735',
    '52e81612bcbc57f1066b7a0a'
];    

var map;
function initMap() {
    map = new google.maps.Map(document.getElementById("map"),{
        center:{lat: 29.9765634, lng: 31.2252541},
        zoom:13
    })

 createMarker();
}
function createMarker(ll, title) {
    var marker = new google.maps.Marker({
        position: ll,
        map: map,
        title: title
      });
      console.log(ll);
}




var venuesUl = document.getElementById("venues");

var url =`https://api.foursquare.com/v2/venues/search?ll=${mapCenter.lat},${mapCenter.lng}&client_id=${client_id}&client_secret=${client_secret}&v=20180809&categoryId=${categories}&raduis=500&limit=200`;





fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        let venData = data.response.venues;
        console.log(data.response.venues);
        return venData.map((ven) => {
        let li = document.createElement('li');
        let div = document.createElement('div');
        let h1 = document.createElement('h3');
        let span = document.createElement('span');
        var loc = {lat: ven.location.lat, lng: ven.location.lng};
        h1.innerHTML = ven.name;
        span.innerHTML = ven.location.address;

        div.appendChild(h1);
        div.appendChild(span);
        li.appendChild(div);

        venuesUl.appendChild(li);
        createMarker(loc,ven.name);
        

        })
    })
    .catch(function(err) {
        return err;
    });
