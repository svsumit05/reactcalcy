import { FormService } from './services/form.service';
import { Component, OnInit } from '@angular/core';
import { log } from 'util';
import { Observable, from } from 'rxjs';
import * as Rx from 'rxjs/Rx';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';

export interface Filler {
  name: string;
  country: any;
  state: any;
  city: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
   private arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

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
  ];

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
  ];
   
  dataIndex: any;
  button = 'submit';

  filler: Filler;
  fillers: Filler[] = [];

  private selectedCountrysStates: any; // used to store filtered states
  private selectedStatesCities: any ; // used to store filtered cities

  constructor(private formService: FormService) {}

  ngOnInit() {
    this.filler = this.filler ? this.filler : <Filler>{};
  }
  // country JSON
  
  // used to filter selected country on countryId from state JSON 
  chooseCountry() {
    Rx.Observable.from(this.states)
      .filter(a => this.filler.country == a.countryId)
      .toArray()
      .subscribe(res => {
        this.selectedCountrysStates = res;
      })
  }

  // used to filter selected state on stateId from city JSON 
  chooseState() {
    Rx.Observable.from(this.cities)
      .filter(a => this.filler.state == a.stateId)
      .toArray()
      .subscribe(res => {
        this.selectedStatesCities = res;
      })
  }

  onSubmit(form: NgForm) {
    console.log(form);
    const filterCountry = this.countries.find((country) => {
      return country.countryId == this.filler.country;
    });
    const filterState = this.states.find((state) => {
      return state.stateId == this.filler.state;
    });
    const filterCity = this.cities.find((city) => {
      return city.cityId == this.filler.city;
    });
    this.filler.country = filterCountry;
    this.filler.state = filterState;
    this.filler.city = filterCity;
    // this.formService.onAddForm(this.filler);
    // console.log(this.filler);
    // this.fillers = this.formService.onFetchForm();
    // this.fillers.push(this.filler);
     if (this.dataIndex) {
       this.fillers.splice(this.dataIndex, 1, this.filler);
     } else  {
       this.fillers.unshift(this.filler);
     }
    console.log(this.filler);
    this.filler = <Filler>{};
  }

  onEdit(data, index) {
    this.dataIndex = index;
    this.filler.name = data.name;
    this.filler.country = data.country.countryId;
    this.filler.state = data.state.stateId;
    this.filler.city = data.city.cityId;
    this.chooseCountry();
    this.chooseState();
  }

  onDelete(index) {
    this.fillers.splice(index, 1);
  }
}


