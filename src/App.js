import "./App.css";
import {useEffect, useState} from 'react'
import Countries from './countries.json';
import Cities from './cities.json';


function App() {

  const [cities, setCities] = useState([])

  const [formData, setFormData] = useState({
    country: Countries[0],
    phone: '',
    city: {},
  })
  
  useEffect(() => {
    const countryCities = Cities.filter(city => city.countryCode === Countries[0].isoCode)
    setCities(countryCities)
  }, [])

  /**
   * 
   * @param {Event} event 
   */
  const handleCountryChange = (event) => {
    const country = Countries[parseInt(event.target.value)]
    setFormData({ ...formData, country, city: {} })
    const countryCities = Cities.filter(city => city.countryCode === country.isoCode)
    setCities(countryCities)
  }

  /**
   * 
   * @param {Event} event 
   */
  const handleCityChange = (event) => {
    const city = Cities[parseInt(event.target.value)]
    setFormData({ ...formData, city })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('formData', formData)
    alert('Please check console for data')
  }

  return (
    <form className="App" onSubmit={onSubmit}>
      <div>
        <div className="phonePicker">
          <label>Choose Phone:</label>
          <select id="Countries" onChange={handleCountryChange}>
            {Countries.map((country, index) => (
              <option value={index} key={index}>
                {!country.phonecode.startsWith('+') ? '+': ''}{country.phonecode}
              </option>
            ))}
          </select>
          <input 
            id="phone"
            type="number"
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
            maxLength={12}
          />
        </div>
      </div>
      <div>
        <label>Choose City:</label>
        <select id="cities" onChange={handleCityChange}>
          <option value="N/A">Choose City</option>
          {cities.map((city, index) => (
            <option value={index} key={index}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
      <button style={{marginTop: '20px'}}>Submit</button>
    </form>
  );
}

export default App;
