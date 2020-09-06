import React, { useState, Fragment } from "react";

const apiKey = {
  key: "af21fb71de099414b92fe7470b29503e",
  baseURL: "https://api.openweathermap.org/data/2.5/",
};

const Home = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = async (event) => {
    if (event.key === "Enter") {
      try {
        let res = await fetch(
          `${apiKey.baseURL}weather?q=${query}&units=metric&APPID=${apiKey.key}`
        );
        let result = await res.json();
        setWeather(result);
        setQuery("");
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  const newDate = (n) => {
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dev",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[n.getDay()];
    let numberDate = n.getDate();
    let month = months[n.getMonth()];
    let year = n.getFullYear();

    return `${day} ${numberDate} ${month} ${year}`;
  };

  return (
    <div className="home">
      <div className="search-bar">
        <i className="fa fa-search fa-2x"></i>
        <input
          type="text"
          placeholder="Enter City..."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        />
      </div>
      <div className="output">
        {typeof weather.main != "undefined" ? (
          <Fragment>
            {" "}
            <div className="location">
              {weather.name}, {weather.sys.country}
            </div>
            <div className="date">{newDate(new Date())}</div>
            <div className="weather-box">
              <div className="sky">{weather.weather[0].main}</div>
              <div className="temp">
                {Math.round(weather.main.temp * (9 / 5) + 32)}°F
              </div>
              <div className="important">
                <div className="lat">lat: {weather.coord.lat}</div>
                <div className="lon">lon: {weather.coord.lon}</div>
                <div className="speed">
                  speed: {weather.wind.speed} @ {weather.wind.deg}°
                </div>
              </div>
            </div>
          </Fragment>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Home;
