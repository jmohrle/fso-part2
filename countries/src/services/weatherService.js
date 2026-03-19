import axios from "axios"

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getForecast = (country) => {

    const lat = country.latlng[0]
    const lon = country.latlng[1]
    const apiKey = import.meta.env.VITE_OWM_KEY

    const request = axios.get(`${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
    return request.then(response => response.data)
}

export default { getForecast }