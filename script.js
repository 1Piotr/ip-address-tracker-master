// array that stores location of ip address
const myLocation= [51.51279, -0.09184]
let map

function myFoo() {
  const userInput = document.getElementById("ipAddress").value
  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_3kjgn6scsppozS40hALKs0eBspSgH&domain=${userInput}`
  console.log(url)
  fetch(url)
  .then((response) => response.json())
  .then((data) => outputHTML(data));
  function outputHTML(apiData) {
    console.log(userInput)
    console.log(apiData)
    let city = apiData.location.city
    document.getElementById('location').innerHTML =`${city}<span id="postcode"></span>`
    let timezone = apiData.location.timezone
    document.getElementById('timezone').innerText =`UTC${timezone}`
    let latitiude = apiData.location.lat 
    myLocation[0]=latitiude
    let longitude = apiData.location.lng
    console.log(longitude)
    myLocation[1]=longitude
    let postcode = apiData.location.postalCode
    if (postcode.length>0){
      document.getElementById('postcode').innerHTML=`, ${postcode}`
    }
    let isp= apiData.isp
    document.getElementById('isp').innerText=isp
    let ip= apiData.ip
    document.getElementById('ip').innerText=ip
    console.log(myLocation)

    map.off
    map.remove()
    createMap()
    
  }

}



function createMap(){
map = L.map('map',{zoomControl: false}).setView(myLocation, 16);
const myIcon = L.icon({
  iconUrl: 'images/icon-location.svg',
  iconSize: [25, 25],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76]
});
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
L.marker(myLocation, {icon: myIcon}).addTo(map);
L.control.zoom({
  position:'bottomleft'
}).addTo(map);
}
//myFoo()
createMap()