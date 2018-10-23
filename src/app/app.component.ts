import { Component } from '@angular/core';
import { log } from 'util';
import { Observable, from } from 'rxjs';
import * as Rx from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private countries = [
    {
      countryId: 1,
      countryName: 'India',
    },
    {
      countryId: 2,
      countryName: 'Turkey',
    },
    {
      countryId: 3,
      countryName: 'Egypt',
    }
  ]

  // state JSON
  private states = [
    {
      stateId: 1,
      countryId: 1,
      stateName: 'Maharashtra'
    },
    {
      stateId: 2,
      countryId: 1,
      stateName: 'Delhi'
    },
    {
      stateId: 3,
      countryId: 1,
      stateName: 'Karnataka'
    },
    {
      stateId: 4,
      countryId: 2,
      stateName: 'Aegean Region'
    },
    {
      stateId: 5,
      countryId: 2,
      stateName: 'Marmara'
    },
    {
      stateId: 6,
      countryId: 3,
      stateName: 'Benha'
    }
  ];

  // city JSON
  private cities = [
    {
      cityId: 1,
      stateId: 1,
      countryId: 1,
      cityName: 'Mumbai'
    },
    {
      cityId: 2,
      stateId: 1,
      countryId: 1,
      cityName: 'Pune'
    },
    {
      cityId: 3,
      stateId: 2,
      countryId: 1,
      cityName: 'JaiPur'
    },
    {
      cityId: 4,
      stateId: 3,
      countryId: 1,
      cityName: 'Nipani'
    },
    {
      cityId: 5,
      stateId: 4,
      countryId: 2,
      cityName: 'Izmir'
    },
    {
      cityId: 6,
      stateId: 6,
      countryId: 3,
      cityName: 'Qalyubia'
    }
  ]

  private selectedCountrysStates: any; //used to store filtered states
  private selectedStatesCities: any  // used to store filtered cities

  // country JSON
  
  // used to filter selected country on countryId from state JSON 
  chooseCountry(data) {
    Rx.Observable.from(this.states)
      .filter(a => data.target.value == a.countryId)
      .toArray()
      .subscribe(res => {
        this.selectedCountrysStates = res;
      })
  }

  // used to filter selected state on stateId from city JSON 
  chooseState(data) {
    Rx.Observable.from(this.cities)
      .filter(a => data.target.value == a.stateId)
      .toArray()
      .subscribe(res => {
        this.selectedStatesCities = res;
      })
  }

}
