import { useEffect, useState } from "react"
import countriesService from "../services/countriesService"


const CountryDetail = ({ name }) => {
    const [country, setCountry] = useState(null)

    useEffect(() => {
        console.log(name);

        countriesService.getCountry(name)
            .then(data => {
                setCountry(data)
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
                            <li>{value}</li>
                        ))}
                    </ul>
                    <img src={country.flags.png} alt={country.flag.alt} />
                </>
            }
        </>

    )

}
export default CountryDetail