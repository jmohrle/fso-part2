const Countries = ({ filteredCountries, onCountryShowClick }) => (
    filteredCountries.map((country) => (
        <li key={country.name.common}>{country.name.common} <button value={country.name.common} onClick={onCountryShowClick}>Show</button>
        </li>
    )))

export default Countries