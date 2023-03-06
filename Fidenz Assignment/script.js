var cityCode;
var timeZone; 
const API_KEY = "49cc8c821cd2aff9af04c9f98c36eb74";

var json = '{"List":[{"CityCode":"1248991","CityName":"Colombo","Temp":"33.0","Status":"Clouds"},{"CityCode":"1850147","CityName":"Tokyo","Temp":"8.6","Status":"Clear"},{"CityCode":"2644210","CityName":"Liverpool","Temp":"16.5","Status":"Rain"},{"CityCode":"2988507","CityName":"Paris","Temp":"22.4","Status":"Clear"},{"CityCode":"2147714","CityName":"Sydney","Temp":"27.3","Status":"Rain"},{"CityCode":"4930956","CityName":"Boston","Temp":"4.2","Status":"Mist"},{"CityCode":"1796236","CityName":"Shanghai","Temp":"10.1","Status":"Clouds"},{"CityCode":"3143244","CityName":"Oslo","Temp":"-3.9","Status":"Clear"}]}';
var obj = JSON.parse(json);
var text = "";
var text1 = "";
var citycodes = [];
var citynames = [];
for (let i in obj.List) {
    text = obj.List[i].CityCode;
    text1 = obj.List[i].cityName;
    citycodes.push(text);
    citynames.push(text1);
}

var timeZones = ["Asia/Colombo","Asia/Tokyo","Europe/London","Europe/Paris","Australia/Sydney","EST","Asia/Shanghai","Europe/Oslo"];


function updateData(){
    for(let i=0; i<timeZones.length; i++){
        cityCode = citycodes[i];
        timeZone = timeZones[i];
        getWeatherData(i,cityCode,timeZone);

    }
}

setInterval(updateData, 1000);

function getWeatherData (count,cityCode1,timeZone1) {

    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityCode1}&appid=${API_KEY}`).then(res => res.json()).then(data => {

    displayData(data, count, timeZone1);
    })
}

function displayData(data1, value1, timeZone1){

    let cityName = document.getElementById(`city${value1+1}-name`);
    let cityTemp = document.getElementById(`city${value1+1}-temp`);
    let cityTempMin = document.getElementById(`city${value1+1}-min-temp`);
    let cityTempMax = document.getElementById(`city${value1+1}-max-temp`);
    let cityDateTime = document.getElementById(`city${value1+1}-time`);
    let cityPressure = document.getElementById(`city${value1+1}-pressure`);
    let cityHumidity = document.getElementById(`city${value1+1}-humidity`);
    let cityVisibility = document.getElementById(`city${value1+1}-visibility`);
    let citySpeedDeg = document.getElementById(`city${value1+1}-location`);
    let citySunRise = document.getElementById(`city${value1+1}-sunrise`);
    let citySunSet = document.getElementById(`city${value1+1}-sunset`);
    let cityWeather = document.getElementById(`weather${value1+1}-status`);
    let image = document.getElementById(`weather${value1+1}-icon`);

    cityName.innerHTML = data1.name;
    cityTemp.innerHTML = `${Math.round(data1.main.temp-273.15)}&#176;C`;
    cityTempMin.innerHTML = `Temp Min : ${Math.round(data1.main.temp_min-273.15)}&#176;C`;
    cityTempMax.innerHTML = `Temp Max : ${Math.round(data1.main.temp_max-273.15)}&#176;C`;
    cityDateTime.innerHTML = `${getDateTime(data1.dt,timeZone1)}`;
    cityPressure.innerHTML = `Pressure : ${Math.round(data1.main.pressure)} hPa`;
    cityHumidity.innerHTML = `Humidity : ${Math.round(data1.main.humidity)} %`;
    cityVisibility.innerHTML = `Visibility : ${(data1.visibility/1000).toFixed(1)} km`;
    citySpeedDeg.innerHTML = `${Math.round(data1.wind.speed)}m/s ${Math.round(data1.wind.deg)} Degree`;
    citySunRise.innerHTML = `Sunrise : ${timeRiseSet(data1.sys.sunrise,timeZone1)}`;
    citySunSet.innerHTML = `Sunset : ${timeRiseSet(data1.sys.sunset,timeZone1)}`;
    cityWeather.innerHTML = `${getWeatherstatus(data1)}`;
    image.src = `http://openweathermap.org/img/wn/${data1.weather[0].icon}@2x.png`;
}

function getWeatherstatus(data1){

    const weatherStatus = data1.weather[0].description;
    const capitalizedWeather = weatherStatus.split(" ").map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(" ");

    return capitalizedWeather;
}

function getDateTime(timeStamp, timeZone){

    const unixTimestamp = timeStamp;
    const date = new Date(unixTimestamp * 1000);
    var newDate = date.toLocaleString('en-US', { timeZone: `${timeZone}` });

    const originalDate = new Date(`${newDate}`);

    const hours = originalDate.getHours();
    const minutes = originalDate.getMinutes();

    let suffix = 'am';
    let displayHours = hours;
    if (hours >= 12) {
    suffix = 'pm';
    displayHours = hours === 12 ? 12 : hours - 12;
    }

    const displayDate = originalDate.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric'
    });

    const displayString = `${displayHours}.${minutes < 10? '0'+minutes: minutes} ${suffix}, ${displayDate}`;

    return displayString; 
}

function timeRiseSet(timeStamp, timeZone){

    const unixTimestamp = timeStamp;
    const date = new Date(unixTimestamp * 1000);
    var newDate = date.toLocaleString('en-US', { timeZone: `${timeZone}` });

    const originalDate = new Date(`${newDate}`);

    const hours = originalDate.getHours();
    const minutes = originalDate.getMinutes();

    let suffix = 'am';
    let displayHours = hours;
    if (hours >= 12) {
    suffix = 'pm';
    displayHours = hours === 12 ? 12 : hours - 12;
    }

    const displayString = `${displayHours}.${minutes < 10? '0'+minutes: minutes} ${suffix}`;

    return displayString;
}

var weatherInfo = document.getElementById("weather-info-container");
var bgColor = document.getElementById("weather-info");

var viewTimeZone;
function showWeatherDetails(viewCity){
    switch(viewCity){
        case "Colombo":
            viewTimeZone = "Asia/Colombo";
            bgColor.style.backgroundImage = "url('bg1.jpeg')";
            break;
        case "Tokyo":
            viewTimeZone = "Asia/Tokyo";
            bgColor.style.backgroundImage = "url('bg2.jpeg')";
            break;
        case "Liverpool":
            viewTimeZone = "Europe/London";
            bgColor.style.backgroundImage = "url('bg3.jpeg')";
            break;
        case "Paris":
            viewTimeZone = "Asia/Paris";
            bgColor.style.backgroundImage = "url('bg4.jpeg')";
            break;
        case "Sydney":
            viewTimeZone = "Australia/Sydney";
            bgColor.style.backgroundImage = "url('bg5.jpeg')";
            break;
        case "Boston":
            viewTimeZone = "EST";
            bgColor.style.backgroundImage = "url('bg6.jpeg')";
            break;
        case "Shanghai":
            viewTimeZone = "Asia/Shanghai";
            bgColor.style.backgroundImage = "url('bg7.jpeg')";
            break;
        case "Oslo":
            viewTimeZone = "Europe/Oslo";
            bgColor.style.backgroundImage = "url('bg8.jpeg')";
            break;
    }

    getCurrentWeatherData(viewCity, viewTimeZone);

    weatherInfo.style.display = "block";
}

function getCurrentWeatherData(viewCity, viewTimeZone){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${viewCity}&appid=${API_KEY}`).then(res => res.json()).then(newdata => {

    viewCurrentData(newdata,  viewTimeZone);
    })

}

function viewCurrentData(newdata,viewTimeZone){
    let currentCityName = document.getElementById(`city-name`);
    let currentCityTemp = document.getElementById(`city-temp`);
    let currentCityTempMin = document.getElementById(`city-min-temp`);
    let currentCityTempMax = document.getElementById(`city-max-temp`);
    let currentCityDateTime = document.getElementById(`city-time`);
    let currentCityPressure = document.getElementById(`city-pressure`);
    let currentCityHumidity = document.getElementById(`city-humidity`);
    let currentCityVisibility = document.getElementById(`city-visibility`);
    let currentCitySpeedDeg = document.getElementById(`city-location`);
    let currentCitySunRise = document.getElementById(`city-sunrise`);
    let currentCitySunSet = document.getElementById(`city-sunset`);
    let currentCityWeather = document.getElementById(`weather-status`);
    let currentImage = document.getElementById(`weather-icon`);

    currentCityName.innerHTML = newdata.name;
    currentCityTemp.innerHTML = `${Math.round(newdata.main.temp-273.15)}&#176;C`;
    currentCityTempMin.innerHTML = `Temp Min : ${Math.round(newdata.main.temp_min-273.15)}&#176;C`;
    currentCityTempMax.innerHTML = `Temp Max : ${Math.round(newdata.main.temp_max-273.15)}&#176;C`;
    currentCityDateTime.innerHTML = `${getDateTime(newdata.dt,viewTimeZone)}`;
    currentCityPressure.innerHTML = `Pressure : ${Math.round(newdata.main.pressure)} hPa`;
    currentCityHumidity.innerHTML = `Humidity : ${Math.round(newdata.main.humidity)} %`;
    currentCityVisibility.innerHTML = `Visibility : ${(newdata.visibility/1000).toFixed(1)} km`;
    currentCitySpeedDeg.innerHTML = `${Math.round(newdata.wind.speed)}m/s ${Math.round(newdata.wind.deg)} Degree`;
    currentCitySunRise.innerHTML = `Sunrise : ${timeRiseSet(newdata.sys.sunrise,viewTimeZone)}`;
    currentCitySunSet.innerHTML = `Sunset : ${timeRiseSet(newdata.sys.sunset,viewTimeZone)}`;
    currentCityWeather.innerHTML = `${getWeatherstatus(newdata)}`;
    currentImage.src = `http://openweathermap.org/img/wn/${newdata.weather[0].icon}@2x.png`;

}

function hideWeatherDetails(){
    weatherInfo.style.display = "none";
}





