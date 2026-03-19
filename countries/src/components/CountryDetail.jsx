import { useEffect, useState } from "react"
import weatherService from "../services/weatherService"

const CountryDetail = ({ country }) => {

    const [forecast, setForecast] = useState(null)
    useEffect(() => {

        weatherService.getForecast(country)
            .then(data => {
                setForecast(data)
            })

    }, [])

    return (
        <>
            {country &&
                <>
                    <h1>{country.name.common}</h1>
                    <div>Capital {country.capital[0]}</div>
                    <div>Area {country.area}</div>
                    <h2>Languages</h2>
                    <ul>
                        {Object.entries(country.languages).map(([abrv, value]) => (
                            <li key={abrv}>{value}</li>
                        ))}
                    </ul>
                    <img src={country.flags.png} alt={country.flag.alt} />
                    {forecast &&
                        <>
                            <h2>Weather in {country.capital[0]}</h2>
                            <div>Temperature {forecast.main.temp} Fahrenheit</div>
                            <div><img src={`https://openweathermap.org/payload/api/media/file/${forecast.weather[0].icon}.png`} /></div>
                            <div>Wind {forecast.wind.speed} miles/hour</div>
                        </>
                    }
                </>
            }
        </>

    )

}
export default CountryDetail