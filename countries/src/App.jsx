import { useState, useEffect } from "react"
import countriesService from "./services/countriesService"
import Countries from './components/Countries'
import CountryDetail from "./components/CountryDetail"

function App() {

  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')
  const [country, setCountry] = useState(null)
  const [countryName, setCountryName] = useState(null)

  const filteredCountries = countryFilter === ''
    ? countries
    : countries.filter(country =>
      country.name.common.toLowerCase().includes(countryFilter.toLowerCase())
    )

  useEffect(() => {
    countriesService.getCountries()
      .then(data => {
        setCountries(data)
      })
  }, [])

  useEffect(() => {
    if (filteredCountries.length === 1) {
      setCountryName(filteredCountries[0].name.common)
    } else {
      setCountryName(null)
      setCountry(null)
    }
  }, [filteredCountries.length])

  useEffect(() => {
    if (!countryName) return
    countriesService.getCountry(countryName)
      .then(data => {
        setCountry(data)
      })

  }, [countryName])

  const handleCountryChange = (event) => {
    setCountryFilter(event.target.value)
  }

  const handleCountryShow = (event) => {
    setCountryName(event.target.value)
  }

  let countryList;

  if (filteredCountries.length > 10) {
    countryList = <p>Too many matches, specify another filter</p>;
  } else {
    if (filteredCountries.length !== 1) {

      countryList = <Countries filteredCountries={filteredCountries} onCountryShowClick={handleCountryShow} />
    }
  }
  return (

    <>
      find countries <input value={countryFilter} onChange={handleCountryChange}></input>

      {countryList}

      {country && <CountryDetail country={country} />}
    </>
  )
}

export default App
