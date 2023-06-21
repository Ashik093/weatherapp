import { getWeatherData } from "./getWeather";
import { convertDateFormat, getCurrentLocation } from "./helper/helper";

let { latitude, longitude } = await getCurrentLocation()
let { data, status } = await getWeatherData(latitude + " " + longitude)
if (status === 200) {
    var loaderStart = document.querySelector('.loaderStart');
    var waetherCard = document.querySelector('.weather-card');

    loaderStart.classList.add('loading');

    loaderStart.classList.remove('loading');
    waetherCard.classList.remove('d-none');

    let { location, current } = data
    document.getElementById("place").innerHTML = location.name + ", " + location.country
    document.getElementById("timezone").innerHTML = convertDateFormat(location.localtime)
    document.getElementById("temp").innerHTML = `${current.temp_c}°C`
    document.getElementById("condition").innerHTML = current.condition.text
    document.getElementById("feelsLike").innerHTML = `Feels like ${current.feelslike_c}°C `
    document.getElementById("conditionIcon").setAttribute("src", current.condition.icon)
    document.getElementById("place").innerHTML = location.name + "," + location.country
    document.getElementById("place").innerHTML = location.name + "," + location.country
} else {
    console.log("Something went wromng")
}

document.getElementById("search").addEventListener("click", async() => {


    let location = document.getElementById("location").value
    let { data, status } = await getWeatherData(location)
    if (status === 200) {

        var loaderStart = document.querySelector('.loaderStart');
        var waetherCard = document.querySelector('.weather-card');

        loaderStart.classList.add('loading');

        loaderStart.classList.remove('loading');
        waetherCard.classList.remove('d-none');



        let { location, current } = data
        document.getElementById("place").innerHTML = location.name + ", " + location.country
        document.getElementById("timezone").innerHTML = convertDateFormat(location.localtime)
        document.getElementById("temp").innerHTML = `${current.temp_c}°C`
        document.getElementById("condition").innerHTML = current.condition.text
        document.getElementById("feelsLike").innerHTML = `Feels like ${current.feelslike_c}°C `
        document.getElementById("conditionIcon").setAttribute("src", current.condition.icon)
        document.getElementById("place").innerHTML = location.name + "," + location.country
        document.getElementById("place").innerHTML = location.name + "," + location.country
    } else {
        console.log("Something went wromng")
    }
})