import React, { useState, useEffect } from 'react'

const Weather = () => {

    const apiKey = 'd98ab9f9c5735e067831e9defcff2b28'

    const [data, setData] = useState([])
    const [city, setCity] = useState("")


    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
            .then(response => response.json())
            .then(
                data => {
                    setData(data)
                }
            )
    }, [city])

    // Date
    let d = new Date();
    let date = d.getDate();
    let year = d.getFullYear();
    let month = d.toLocaleString('default', {month:'long'});
    let day = d.toLocaleString('default', {weekday:'long'});

    // Weather Icon
    let weatherIcon = null;
    if(typeof data.main != 'undefined'){
        if(data.weather[0].main == 'Clouds'){weatherIcon = 'fa-cloud'} 
        else if(data.weather[0].main == 'Thunderstorm'){weatherIcon = 'fa-bolt'} 
        else if(data.weather[0].main == 'Drizzle'){weatherIcon = 'fa-cloud-rain'} 
        else if(data.weather[0].main == 'Rain'){weatherIcon = 'fa-cloud-showers-heavy'} 
        else if(data.weather[0].main == 'Snow'){weatherIcon = 'fa-snowflake'} 
        else{weatherIcon = 'fa-smog'}
    }
    // Weather Image
    let weatherImage = null;
    if(typeof data.main != 'undefined'){
        if(data.weather[0].main == 'Clouds'){weatherImage = 'cloud'} 
        else if(data.weather[0].main == 'Thunderstorm'){weatherImage = 'thunderstone'} 
        else if(data.weather[0].main == 'Drizzle'){weatherImage = 'rain'} 
        else if(data.weather[0].main == 'Rain'){weatherImage = 'rain'} 
        else if(data.weather[0].main == 'Snow'){weatherImage = 'snow'} 
        else{weatherImage = 'clear'}
    }
    
    
    return (
        <div className={weatherImage}>
            <div className='wrap'>
                <input 
                    type='search' 
                    placeholder='Search for a City ...' 
                    value={city}
                    onChange={e => setCity(e.target.value)}
                />

                {typeof data.main === 'undefined' ? (
                    <div className='message'>
                        <img src={process.env.PUBLIC_URL + "/weather-icon.png"}/>
                        <h2>Welcome to Weather App, Please Search for a City.</h2>
                    </div>
                ) : (
                    <div className='weather-data'>
                        <p className='city'>{data.name}, {data.sys.country}</p>
                        <p className='date'>{day}, {month} {date}, {year}</p>
                        
                        <hr/>

                        <div className='deg-box'>
                            <i className={`fas ${weatherIcon}`}/>
                            <p className="deg">{Math.round((data.main.temp - 273.15).toFixed(2))}&deg;C</p>
                        </div>
                        
                        <h3>{data.weather[0].main}</h3>
                        <span>{(data.main.temp_min - 273.15).toFixed(2)}&deg;C | {(data.main.temp_max - 273.15).toFixed(2)}&deg;C</span> 
                    </div>
                )}
            </div>
        </div>
    )
}

export default Weather
