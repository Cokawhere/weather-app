// notes
//1)run علي ال chrome plz عشات layout

window.addEventListener("load",()=>{
    let search =document.querySelector("#main-screen_header-searchbar");

    window.localStorage.getItem("lastCity");
    search.value=localStorage.lastCity;
    getWeatherData(localStorage.lastCity)
    search.addEventListener("change",()=>{
        let cityName= search.value.trim();
        if (cityName!=""){
            getWeatherData(cityName)
            console.log(cityName);
            window.localStorage.setItem("lastCity",search.value);
        }
    });
    function getWeatherData(cityName) {
        let apiKey = "9756bdef1101473cb9754824250205";
        let getDataUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=7&aqi=no&alerts=no`;
    
        let DataRequest = new XMLHttpRequest();
        DataRequest.open("GET", getDataUrl);
        DataRequest.send(); 

        DataRequest.onload = function () {
            if (DataRequest.status === 200) {
                let weatherData = JSON.parse(DataRequest.responseText);
                console.log(weatherData);
                domMain(weatherData);
            } else {
                document.querySelector(".Noresultsfound-message").style.display = "block";
                document.querySelector(".main-screen-sec1-2-3-4").style.opacity = "0";
            }
            DataRequest.onerror = function () {
                document.querySelector(".Noresultsfound-message").style.display = "block";
                document.querySelector(".Noresultsfound-message").innerText = "Network error: Please check your internet connection.";
                document.querySelector(".main-screen-sec1-2-3-4").style.opacity = "0";
            };
        }; 


    }
    function  domMain(weatherData) {
        document.querySelector(".main-screen-sec1-2-3-4").style.opacity = "1";
                            //  section1
        let currentDate = new Date(weatherData.location.localtime);
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
        let day = currentDate.getDate();
        let month = months[currentDate.getMonth()];
        let weekday = days[currentDate.getDay()];
    
        let suffix = (day == 1 || day == 21 || day == 31) ? 'st' : (day == 2 || day == 22) ? 'nd' : (day == 3 || day == 23) ? 'rd' : 'th';
    
        let formattedDate = `${day}${suffix} ${month}, ${weekday}`;
        
        console.log(formattedDate); 
        
        
        document.querySelector(".main-screen_section1-date").innerText = formattedDate;
        let currentCity= weatherData.location.name;
        document.querySelector(".main-screen_section1-city").innerText = currentCity;
        let tempC = weatherData.current.temp_c;
        let tempf = weatherData.current.temp_f;
        document.querySelector(".main-screen_section1-deg").innerText=`${tempC}°/${tempf}°`
        

        let condition = weatherData.current.condition.text;
        let weatherImg = document.querySelector(".main-screen_section1-img");
        
        if (condition.includes("sunny") || condition.includes("clear")) {
            weatherImg.src = "Assets/mostly-sunny.svg";
        } else if (condition.includes("cloud") || condition.includes("Partly Cloudy")) {
            weatherImg.src = "Assets/partly-cloudy.svg";
        } else if (condition.includes("rain")) {
            weatherImg.src = "Assets/rainy.svg";
        } else if (condition.includes("snow")) {
            weatherImg.src = "Assets/snowy.svg";
        } else if (condition.includes("thunder")) {
            weatherImg.src = "Assets/stromy (1).svg";
        } else {
            weatherImg.src = "Assets/Night.svg";
        }
                                    // end section1

                                     // section2
        for (let i = 1; i <= 12; i++) {
        let hourData = weatherData.forecast.forecastday[0].hour[i];
        let temp = hourData.temp_c;
        let tempElement = document.querySelector(`.hour-temp-${i}`);
        if (tempElement) {
        tempElement.innerText = `${temp}°`;
        }
    }


        for (let i = 1; i <= 12; i++) {
            let hoursData = weatherData.forecast.forecastday[0].hour[i];
            const hourcondition=hoursData.condition.text;
            const hourimg = document.querySelector(`.hour${i}condition`);

            let iconSrc = "";
            if (hourcondition.includes("Sunny") || hourcondition.includes("Clear")) {
                iconSrc = "Assets/mostly-sunny (1).svg";
            } else if (hourcondition.includes("Cloud") || hourcondition.includes("Partly Cloudy")) {
                iconSrc = "Assets/partly-cloudy.svg";
            } else if (hourcondition.includes("Rain")) {
                iconSrc = "Assets/rainy.svg";
            } else if (hourcondition.includes("Snow")) {
                iconSrc = "Assets/snowy.svg";
            } else if (hourcondition.includes("Thundery")) {
                iconSrc = "Assets/stromy (1).svg";
            } else {
                iconSrc = "Assets/Night.svg";
            }
            hourimg.src = iconSrc;
        }

                                      // end section2


                                   //  section3//

        let sunset= weatherData.forecast.forecastday[0].astro.sunset;
        let sunrise= weatherData.forecast.forecastday[0].astro.sunrise;
        let Rain = weatherData.forecast.forecastday[0].day.daily_chance_of_rain;
        let windSpeed = weatherData.current.wind_kph;
        let feelsLike = weatherData.current.feelslike_c;
        let uvIndex = weatherData.current.uv;
        document.querySelector(".sunrise").innerText=sunrise;
        document.querySelector(".sunset").innerText=sunset;
        document.querySelector(".rain").innerText=`${Rain}%`;
        document.querySelector(".wind").innerText=`${windSpeed}km/h`;
        document.querySelector(".felllike").innerText=`${feelsLike}°`;
        document.querySelector(".uv").innerText=`${uvIndex} of 10`;
                                   // end section3

                                   //  section4
        const forecastDayss = weatherData.forecast.forecastday; 
        const dayss = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const monthss = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const forecastRows = document.querySelectorAll(".main-screen_section4-row-cards");

    forecastDayss.forEach((dayDataa, index) => {
    if (index < forecastRows.length) { 
        const datee = new Date(dayDataa.date);
        const dayy = datee.getDate();
        const monthh = monthss[datee.getMonth()];
        const weekdayy = dayss[datee.getDay()];
        const letters = (dayy == 1 || dayy == 21 || dayy == 31) ? 'st' : (dayy == 2 || dayy == 22) ? 'nd' : (dayy == 3 || dayy == 23) ? 'rd' : 'th';
        const formattedDatee = `${dayy}${letters} ${monthh}`;

        
        forecastRows[index].querySelector(".main-screen_section4-row-cards-date p:first-child").innerText = formattedDatee;
        forecastRows[index].querySelector(".main-screen_section4-row-cards-date p:last-child").innerText = weekdayy;

        
        const conditionn = dayDataa.day.condition.text;
        const conditionElement = forecastRows[index].querySelector(".main-screen_section4-row-cards-feel p");
        const iconElement = forecastRows[index].querySelector(".main-screen_section4-row-cards-feel img");
        conditionElement.innerText = conditionn;

        let iconSrcc = "";
        if (conditionn.includes("Sunny") || conditionn.includes("Clear")) {
            iconSrcc = "Assets/mostly-sunny (1).svg";
        } 
        else if (conditionn.includes("Cloud") || conditionn.includes("Partly Cloudy")) {
            iconSrcc = "Assets/partly-cloudy.svg";
        } 
        else if (conditionn.includes("Rain") || conditionn.includes("Patchy rain nearby")) {
            iconSrcc = "Assets/rainy.svg";
        } 
        else if (conditionn.includes("Snow")) {
            iconSrcc = "Assets/snowy.svg";
        } 
        else if (conditionn.includes("Thundery")) {
            iconSrcc = "Assets/stromy (1).svg";
        }
        else {
            iconSrcc = "Assets/Night.svg";
        }
        iconElement.src = iconSrcc;


        const maxTempC = dayDataa.day.maxtemp_c;
        const minTempC = dayDataa.day.mintemp_c;
        forecastRows[index].querySelector(".main-screen_section4-row-cards-deg p").innerText = `${maxTempC}°/${minTempC}°`;
    }
});
    
        
                                   // end section4



        document.querySelector(".Noresultsfound-message").style.display = "none";
        search.value=""; 

    }
})