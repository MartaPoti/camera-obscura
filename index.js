function formatDay(wday){

let days = [
  "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
        
      ]





let day = days[wday.getDay()];

return `${day}`
    }



let now = new Date();
let weekday = document.querySelector("#weekday"); 
weekday.innerHTML = formatDay(now);

//weekday.innerHTML = `${day}`;



function formatHour (time){

let hours = time.getHours();
if (hours < 10) {
    hours = `0${hours}`;
  };
let minutes = time.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
  };

  return `${hours}:${minutes}`
}


let hour = document.querySelector("#hour");
hour.innerHTML=formatHour(now)
//hour.innerHTML=`${hours}:${minutes}`



function showCity(event) {
  event.preventDefault();

  let input = document.querySelector("#city-input");
  let output = document.querySelector("#city-output");
  let apiKey="cd2881e08fe401fc2c4a61b38bb8dd8f"
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`
axios.get(apiUrl).then(showTemperature)

};

let input = document.querySelector("#city-form");
input.addEventListener("submit", showCity);
 

function search (response){
    
    let apiKey="cd2881e08fe401fc2c4a61b38bb8dd8f"
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${response}&appid=${apiKey}&units=metric`
axios.get(apiUrl).then(showTemperature)
}


function showTemperature (response){
    console.log(response.data.main.temp);
    console.log(response.data.name);
    let temp=document.querySelector("#temp")
    let temperature=Math.round(response.data.main.temp)
    temp.innerHTML=`${temperature}`

let output = document.querySelector("#city-output");
output.innerHTML=response.data.name;


document.querySelector("#hum").innerHTML=response.data.weather[0].main.humidity;
document.querySelector("#wind").innerHTML=Math.round(response.data.wind.speed);
document.querySelector("#description").innerHTML=response.data.weather[0].main;

}


function handleCurrentPosition(response){


let lat=response.coords.latitude;
let long=response.coords.longitude;

let apiKey="cd2881e08fe401fc2c4a61b38bb8dd8f"
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`
axios.get(apiUrl).then(showTemperature);
}




function getCurrentPosition (){
navigator.geolocation.getCurrentPosition(handleCurrentPosition)}
;
let currentButton=document.querySelector("#current");
currentButton.addEventListener("click",getCurrentPosition);

search ("Paris");