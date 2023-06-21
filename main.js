import { getWeatherData } from "./getWeather";
import { convertDateFormat, getCurrentLocation } from "./helper/helper";

const state = {
    data: {},
    status: {}
}

document.getElementById("search").addEventListener("click", async() => {
    document.querySelector('#cel').classList.add("border");
    document.querySelector('#ferh').classList.remove("border");
    showLoader()
    let location = document.getElementById("location").value
    let { data, status } = await getWeatherData(location)
    state.data = data
    state.status = status
    hideLoader()
    if (status === 200) {
        showDataCard()
        setHtmlDataToUi(state.data)
    } else {
        showNoDataCard()
    }
})


document.getElementById("cel").addEventListener("click", () => {
    document.querySelector('#cel').classList.add("border");
    document.querySelector('#ferh').classList.remove("border");
    setHtmlDataToUiCel(state.data.current.feelslike_c)
})
document.getElementById("ferh").addEventListener("click", () => {
    document.querySelector('#cel').classList.remove("border");
    document.querySelector('#ferh').classList.add("border");
    setHtmlDataToUiFer(state.data.current.feelslike_f)
})

const getWeatherDataOnLoad = async() => {
    showLoader()
    let { latitude, longitude } = await getCurrentLocation()
    let { data, status } = await getWeatherData(latitude + " " + longitude)
    state.data = data
    state.status = status
    hideLoader()
    if (status === 200) {
        showDataCard()
        setHtmlDataToUi(state.data)
    } else {
        showNoDataCard()
    }
}

const setHtmlDataToUi = (data) => {
    let { location, current } = data
    document.getElementById("place").innerHTML = location.name + ", " + location.country
    document.getElementById("timezone").innerHTML = convertDateFormat(location.localtime)
    document.getElementById("temp").innerHTML = `${current.temp_c}°C`
    document.getElementById("condition").innerHTML = current.condition.text
    document.getElementById("feelsLike").innerHTML = `Feels like ${current.feelslike_c}°C `
    document.getElementById("conditionIcon").setAttribute("src", current.condition.icon)
    document.getElementById("humidity").innerHTML = "Humidity " + current.humidity + "%"
    document.getElementById("uv").innerHTML = "UV " + current.uv
    document.getElementById("wind_mph").innerHTML = "Wind (mph) " + current.wind_mph
    document.getElementById("wind_kph").innerHTML = "Wind (kph) " + current.wind_kph
    document.getElementById("pressure_mb").innerHTML = "Pressure (mbar) " + current.pressure_mb
}


const setHtmlDataToUiFer = (value) => {
    document.getElementById("temp").innerHTML = `${value}°F`
    document.getElementById("feelsLike").innerHTML = `Feels like ${value}°F `
}
const setHtmlDataToUiCel = (value) => {

    document.getElementById("temp").innerHTML = `${value}°C`
    document.getElementById("feelsLike").innerHTML = `Feels like ${value}°C `
}
const hideLoader = () => {
    var loaderStart = document.querySelector('.loaderStart');
    var waetherCard = document.querySelector('.weather-card');
    loaderStart.classList.remove('loading');
    waetherCard.classList.remove('d-none');
}

const showLoader = () => {
    var loaderStart = document.querySelector('.loaderStart');
    var waetherCard = document.querySelector('.weather-card');
    loaderStart.classList.add('loading');
    waetherCard.classList.add('d-none');
}

const showNoDataCard = () => {
    var noDataCard = document.querySelector('.no-data-card');
    var dataCard = document.querySelector('.data-card');
    noDataCard.classList.remove('d-none');
    dataCard.classList.add('d-none');
}
const showDataCard = () => {
    var noDataCard = document.querySelector('.no-data-card');
    var dataCard = document.querySelector('.data-card');
    noDataCard.classList.add('d-none');
    dataCard.classList.remove('d-none');
}
await getWeatherDataOnLoad()