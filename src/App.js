import React from 'react';
import Titles from './titles.js';
import Form from './form.js';
import Weather from './weather.js';

const Api_Key = "3c4abfca1e0a6978a4c04f0ddd0f51af";

class App extends React.Component{

  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

 
// app-component

getWeather = async (e) => {

  e.preventDefault();

  const city = e.target.elements.city.value;

  const country = e.target.elements.country.value;

  const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},q=${country}&appid=${Api_Key}`);
  
  const response = await api_call.json();
  
  console.log(response);

  if(city && country){
    this.setState({
      temperature: response.main.temp,
      city: response.name,
      country: response.sys.country,
      humidity: response.main.humidity,
      description: response.weather[0].description,
      error: ""
    });
  }else{
      this.setState({
      error: "Please enter the values..."
  });
  }


 
  
}


render(){
  return(
    <div>
 <div className="wrapper">
  <div className="main">
   <div className="container">
    <div className="row">
      <div className="col-xs-5 title-container">
        <Titles />
      </div>
      <div className="col-xs-7 form-container">
        <Form loadWeather={this.getWeather} />
        <Weather
          temperature={this.state.temperature}
          city={this.state.city}
          country={this.state.country}
          humidity={this.state.humidity}
          description={this.state.description}
          error={this.state.error}
        />
      </div>
     </div>
    </div>
   </div>
  </div>
</div>
  )
}
}

export default App;



