import axios from 'axios';

export const getWeatherData = async(location) => {
    let apiUrl = "https://api.weatherapi.com/v1/current.json?q=" +
        location + "&lang=en&key=3aa6f923acf947a7b3a175416231906"
    try {
        const response = await axios.get(apiUrl);
        return response
    } catch (error) {
        return error
    }
}