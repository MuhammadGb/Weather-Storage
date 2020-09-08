let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const postData = async( url = "", data = {}) => {
	const response = await fetch(url, {
		method: "POST", 
		mode: "cors", 
		credentials: "same-origin",
		headers:{
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	try{
		const newData = await response.json();
		console.log(newData)
		return newData
	} catch(error) {
		console.log("error", error);
	}
}


async function results () {
	//event.preventDefault()
	const feelings = document.getElementById("feelings").value;

	(async function openWeather (Url, zip, apiKey) {
		Url = "https://api.openweathermap.org/data/2.5/weather?zip=";
	 	apiKey = "&appid=fa3d9cca8beb454fa620b8c16ec3a442&units=imperial";
	 	zip = document.getElementById("zip").value;

		console.log(`${Url}${zip}${apiKey}`)
	let res = await fetch(`${Url}${zip}${apiKey}`)
	try{
		const data = await res.json();
		//console.log(data)
		return data; 
	} catch(error) {
		console.log("error", error);
	}
})().then(function(data) {
	console.log(data.main.temp)
	postData("http://localhost:8080/weather", {
		temp: data.main.temp,
		date: newDate,
		details: feelings
	}); 
	return data;
}).then(
		updateUI()
	);
}
function lastFunction() {

    document.addEventListener("DOMContentLoaded", () => {

        const Generate = document.getElementById('generate')

        Generate.addEventListener('click', function(event) {
            event.preventDefault()
            results();
        })
    })
}
lastFunction();


const updateUI = async() => {
	const feelings = document.getElementById("feelings").value;
	const date = document.getElementById("date");
	const temperature = document.getElementById("temp");
	const details = document.getElementById("content");

	const request = await fetch("http://localhost:8080/projectData")
	
	try{

		const now = await request.json();
		await localStorage.setItem( 'requested', JSON.stringify(now) );
		//console.log( JSON.parse(localStorage.getItem( 'requested' ) ) );
		const show = await JSON.parse(localStorage.getItem( 'requested' ) )

		if (localStorage.requested){
			date.innerHTML = `Date: ${show.date}`;
			temperature.innerHTML = `Temperature: ${show.temp}°deg`;
			details.innerHTML = show.details;
		}
		else{
			date.innerHTML = `Date: ${now.date}`;
			temperature.innerHTML = `Temperature: ${now.temp}°deg`;
			details.innerHTML = now.details;
		}
	}
	catch(error) {
		console.log("error", error)
	}
}
export {updateUI, postData, lastFunction}
