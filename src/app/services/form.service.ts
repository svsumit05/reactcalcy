import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  formUser: any;
  formList: any[] = [];

  constructor() { }

  onAddForm(data) {
    console.log(data);
    
    this.formUser = data;
    this.formList.push(data);
    console.log(this.formList);
  }

  onFetchForm() {
    return this.formList;
  }
}
