// UI
window.addEventListener('load',()=>{
   let long;
   let lat;
   let temperatureDescription = document.querySelector('.temperature-description');
   let temperatureDegree = document.querySelector('.temperature-degree');
   let locationTimezone = document.querySelector('.location-timezone');
   let temperatureSection = document.querySelector('.degree-section');
   const temperatureSpan = document.querySelector('.degree-section span');
  
   if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition(position=>{
        //    console.log(position);

        long = position.coords.longitude;
        lat = position.coords.latitude;

          
         const options = {
            method: 'GET',
            headers: {
               'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
               'X-RapidAPI-Key': '869a8a12a8msha6cbb3ad736292bp192fccjsn24e95859ae3a'
            }
         };
         
         fetch(`https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=${lat}&lon=${long}`, options)
            .then(response => response.json())
            .then(response=>{
               console.log(response);
         
               const temp = response.data[0].temp;
               const icon = response.data[0].weather.icon;
               const {timezone} = response;

               // Set DOM Elements from API
               temperatureDegree.textContent = temp;
               temperatureDescription.textContent = response.data[0].weather.description;
               locationTimezone.textContent  = response.timezone;
                 

               // Formula for celsius
               let celsius = (temp - 32)*(5/9);
               //   setIcon
               setIcons(icon,document.querySelector('.icon'));
               
              
               // Change temperature  to Fahrenheit/Celsius
                 temperatureSection.addEventListener('click',()=>{
                    if(temperatureSpan.textContent === "F"){
                       temperatureSpan.textContent="C";
                      temperatureDegree.textContent = Math.floor(celsius);
                     }else{
                     temperatureSpan.textContent="F";
                     temperatureDegree.textContent = temp;
                    }
                 })
               });      

   });

}

function setIcons(icon,iconID){
     const skycons = new Skycons({"color": "white"});
    
     skycons.add("icon", Skycons.PARTLY_CLOUDY_DAY);
    skycons.play();
    return skycons.set(iconID,Skycons.PARTLY_CLOUDY_DAY);
}

   
});