const currentDayName = document.querySelector(".currentDayName");
const currentDay = document.querySelector(".currentDay");
const clock = document.querySelector(".clock");

const showDay = () => {
	let today = new Date();

	let day = today.toLocaleString("en", { weekday: "long" });
	let dd = String(today.getDate()).padStart(2, "0");
	let mm = String(today.getMonth() + 1).padStart(2, "0");
	let yyyy = today.getFullYear();

	currentDayName.textContent = day;
	currentDay.textContent = dd + "/" + mm + "/" + yyyy;
};

const startTime = () => {
	const today = new Date();
	let h = today.getHours();
	let m = today.getMinutes();
	let s = today.getSeconds();
	m = checkTime(m);
	s = checkTime(s);
	clock.innerHTML = h + ":" + m + ":" + s;
	setTimeout(startTime, 1000);
};

function checkTime(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}

document.addEventListener("DOMContentLoaded", startTime);
document.addEventListener("DOMContentLoaded", showDay);

export * from "./data_hour.js";
