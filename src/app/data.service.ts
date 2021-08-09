import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private json: string = '';

  constructor(private http: HttpClient ) {
   }

   getResponse() {

  return this.http.get(`http://localhost:3000`);

  }

  getList() {
    console.log(this.json + ' getList()');
    return this.json;
  }
}
