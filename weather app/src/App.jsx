import { useState } from 'react'
import React from 'react'
import axios from "axios"
import './style.css'



function App() {
  const [data, setData] = useState({})
  const [location,setLocation] = useState('')

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()]
    let year = d.getFullYear();

    return  `${day} ${date} ${month} ${year}`

  
  }

  const api = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=99f0591a5302fc3b51e9686f8c4e7047`
  
  const searchLocation = (event) => {
    if(event.key==="Enter") {
      axios.get(api).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }
  return (
    <div className="app">
      <div className="search">
      <input
        type="text"
        placeholder="Enter Location"
        maxLength={20}
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyDown={searchLocation}
      />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
           <h2>{data.name}</h2>
          </div>
          <div className="temp">
           {data.main ? <h1>{data.main.temp.toFixed()}℃</h1>: null }
          </div>
          <div className="date">
            <p>{dateBuilder(new Date())}</p>
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
            
          </div>
        </div>

        <div className="bottom">
          <div className="feels">
            {data.main ? <p>{data.main.feels_like.toFixed()}℃</p> : ('_')}
            
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <p>{data.main.humidity}%</p> : ('_')}
            
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p>{data.wind.speed}  </p> : ('_') }
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App


