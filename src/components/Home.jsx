import searchIcon from "../assets/images/searchIcon.png";
import clouds from "../assets/images/cloudy.png";
import wind from "../assets/images/wind.png";
import rain from "../assets/images/heavy-rain.png";
import drizzle from "../assets/images/drizzle.png";
import clear from "../assets/images/sun.png";
import mist from "../assets/images/mist.png";

import humidity from "../assets/images/weather.png";
import { useState } from "react";
import axios from "axios";

function Home() {
  const [data, setData] = useState({
    celcius: 10,
    name: "London",
    humidity: 10,
    speed: 2,
    image: "",
  });
  const [name, setName] = useState();
  const [error, setError] = useState("");

  const handleClick = async () => {
    if (name !== "") {
      const ApiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=c14ad0bacc4640dffb63e2f90ca8042c&&units=metric`;
      try {
        const res = await axios.get(ApiUrl);
        let imagePath = "";
        console.log(res.data);
        switch (res.data.weather[0].main) {
          case "Clouds":
            imagePath = clouds;
            break;
          case "Clear":
            imagePath = clear;
            break;
          case "Rain":
            imagePath = rain;
            break;
          case "Drizzle":
            imagePath = drizzle;
            break;
          case "Mist":
            imagePath = mist;
            break;

          default:
            imagePath = clouds;
            break;
        }

        setData({
          ...data,
          name: res.data.name,
          celcius: res.data.main.temp,
          humidity: res.data.main.humidity,
          speed: res.data.wind.speed,
          image: imagePath,
        });
      } catch (err) {
        if (err.response.status === 404) {
          setError("Invalid city name");
        } else {
          setError("");
        }
        console.error("Failed to fetch api", error);
      }
    }
  };
  return (
    <div className="container w-full h-screen bg-blue-500 pt-12">
      <div className="weather w-96 p-8 rounded-xl text-center text-white bg-blue-900 mx-auto my-12">
        {/* Search Section */}
        <div className="search flex items-center justify-between">
          <input
            type="text"
            id="search"
            placeholder="Enter City Name"
            className="flex-1 outline-none w-full h-12 mr-3 rounded-full px-5 text-md text-black"
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white"
            onClick={handleClick}
          >
            <img src={searchIcon} alt="search" className="w-12 h-12" />
          </button>
        </div>
        {/* {error} */}
        <div>
          {error && (
            <p className="text-red-400 mt-4 text-sm font-medium">{error}</p>
          )}
        </div>

        {/* Weather Info */}
        <div className="winfo mx-auto mt-8 flex flex-col items-center">
          <img src={data.image} alt="clouds" className="w-32 h-32 mb-2" />
          <h1 className="text-3xl font-semibold">{data.celcius}°C</h1>
          <h2 className="text-xl mt-1">{data.name}</h2>

          {/* Details */}
          <div className="details flex items-center justify-between px-5 mt-10 w-full">
            <div className="col flex items-center gap-2">
              <img src={humidity} alt="humidity" className="w-10 h-10" />
              <div className="humidity text-left">
                <p>{Math.round(data.humidity)}%</p>
                <p className="text-sm text-gray-300">Humidity</p>
              </div>
            </div>

            <div className="col flex items-center gap-2">
              <img src={wind} alt="wind" className="w-10 h-10" />
              <div className="wind text-left">
                <p>{data.speed} km/h</p>
                <p className="text-sm text-gray-300">Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
