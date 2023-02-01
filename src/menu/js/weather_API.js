import { APIweather } from "../../form/js/fetch_API_weather";

const bodyAPI = document.querySelector(".body-API");
const cityPlace = document.querySelector(".city-information h2 ");
const temperature = document.querySelector(".information-temperature h3");
const pressure = document.querySelector(".information-pressure h3");
const weather = document.querySelector(".information-weather h3");
const iconWeather = document.querySelector(".icon-weather i");
const cityValue = localStorage.getItem("city");

let problemWithCodeOrServer = localStorage.getItem("problemWithCodeOrServer");

const checkingAPIerror = () => {
	if (problemWithCodeOrServer === "true") {
		bodyAPI.style.display = "none";
	} else {
		const changeIcon = status => {
			const icon = {
				cloudSun: status.id >= 801,
				sun: status.id >= 800,
				barsStaggered: status.id >= 701 && status.id <= 781,
				snowFlake: status.id >= 600 && status.id <= 622,
				cloudSunRain: status.id >= 500 && status.id <= 531,
				cloudShowersHeavy: status.id >= 300 && status.id <= 321,
				cloudBolt: status.id >= 200 && status.id <= 232,
			};

			const sendClassName = className => {
				iconWeather.className = className;
			};

			if (icon.cloudSun) {
				return sendClassName("fa-solid fa-cloud-sun fa-8x");
			}

			if (icon.sun) {
				return sendClassName("fa-solid fa-sun fa-8x");
			}

			if (icon.barsStaggered) {
				return sendClassName("fa-solid fa-bars-staggered fa-8x");
			}

			if (icon.snowFlake) {
				return sendClassName("fa-solid fa-snowflake fa-8x");
			}

			if (icon.cloudSunRain) {
				return sendClassName("fa-solid fa-cloud-sun-rain fa-8x");
			}

			if (icon.cloudShowersHeavy) {
				return sendClassName("fa-solid fa-cloud-showers-heavy fa-8x");
			}

			if (icon.cloudBolt) {
				return sendClassName("fa-solid fa-cloud-bolt fa-8x");
			}
		};
		
		const getWeather = () => {
			const URL =
				APIweather.API_LINK +
				cityValue +
				APIweather.API_KEY +
				APIweather.API_UNITS;

			axios.get(URL).then(res => {
				const status = Object.assign({}, ...res.data.weather);
				const temp = Math.floor(res.data.main.temp);
				const press = Math.floor(res.data.main.pressure);

				cityPlace.textContent = localStorage.getItem("city");
				weather.textContent = `${status.main}`;
				temperature.textContent = `${temp} °C`;
				pressure.textContent = `${press} bar`;

				changeIcon(status);
			});
		};
		getWeather();
	}
};

checkingAPIerror();

export * from "./weather_API.js";
