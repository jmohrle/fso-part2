import { useState, useEffect } from "react"
import countriesService from "./services/countriesService"
import Countries from './components/Countries'
import CountryDetail from "./components/CountryDetail"

function App() {

  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')


  useEffect(() => {
    countriesService.getCountries()
      .then(data => {
        setCountries(data)
      })
  }, [])


  const filteredCountries = countryFilter === ''
    ? countries
    : countries.filter(country =>
      country.name.common.toLowerCase().includes(countryFilter.toLowerCase())
    )


  const handleCountryChange = (event) => {
    setCountryFilter(event.target.value)
  }

  let countryContent;

  if (filteredCountries.length > 10) {
    countryContent = <p>Too many matches, specify another filter</p>;
  } else {
    if (filteredCountries.length === 1) {
      countryContent = <CountryDetail name={filteredCountries[0].name.common} />
    }
    else{
      countryContent = <Countries filteredCountries={filteredCountries} />
    }
  }
  return (

    <>
      find countries <input value={countryFilter} onChange={handleCountryChange}></input>

      {countryContent}

    </>
  )
}

export default App
