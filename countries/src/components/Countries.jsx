const Countries = ({ filteredCountries }) => (
    filteredCountries.map((country) => (
        <li key={country.name.common}>{country.name.common}</li>
    )))

export default Countries