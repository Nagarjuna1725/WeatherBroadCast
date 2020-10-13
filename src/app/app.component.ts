import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private http: HttpClient) { }

  title = 'Weather Broad Cast';
   q: string="Germany";
  appKey: string = "d8c2ddc6e1c315f8ccc1436ebdc1d710";
  timeInfo: any;
  weatherData : any;
  selectedCity: any = "Heidenheim";
  ngOnInit(){
    console.log("In Load");

    this.getWeatherForeCastInfo();

  }

  getWeatherForeCastInfo()
  {
    this.getWeatherInfo();
  }

  onChange(e)
  {
    console.log(e);
    this.getWeatherInfo();
  }
  getWeatherInfo(){
    let nObje = this.http.get("https://api.openweathermap.org/data/2.5/weather?q="+ this.selectedCity +"&appid="+ this.appKey);
    nObje.subscribe((response) => {
      this.weatherData = response;
      console.log(this.weatherData);
      this.loadWeatherInfo()
    })

  }
  loadWeatherInfo(){

    var dateObject = new Date();

    var utcDateObject = new Date( dateObject.getUTCFullYear(), dateObject.getUTCMonth(), dateObject.getUTCDate(), dateObject.getUTCHours(), dateObject.getUTCMinutes(), dateObject.getUTCSeconds() );

    let nTimeOffset = (this.weatherData.timezone / 60) /60 ;

    utcDateObject.setHours(utcDateObject.getHours() + nTimeOffset );
    this.timeInfo = utcDateObject;
  }



}
