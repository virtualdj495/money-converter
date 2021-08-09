import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

import {find} from 'lodash';

const EXCHANGE = `
<svg id="Layer_1" enable-background="new 0 0 504.711 504.711" height="512" viewBox="0 0 504.711 504.711" width="512" xmlns="http://www.w3.org/2000/svg">
<path d="m310.94 213.523v-104.196c0-8.836-7.163-16-16-16h-140.049v-51.586c0-14.117-17.038-21.321-27.163-11.462l-122.893 119.683c-6.454 6.285-6.439 16.654 0 22.925l122.893 119.685c10.112 9.847 27.163 2.669 27.163-11.462v-51.586h140.049c8.837-.001 16-7.165 16-16.001z"/>
<path d="m499.876 331.841-122.892-119.685c-10.112-9.847-27.163-2.669-27.163 11.462v51.586h-140.049c-8.837 0-16 7.164-16 16v104.196c0 8.836 7.163 16 16 16h140.049v51.586c0 14.161 17.098 21.263 27.163 11.462l122.893-119.684c6.454-6.284 6.439-16.652-.001-22.923z"/>
</svg>
`;

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {

  json?: any;
  listOfCurrency: Array<string> = [];
  value1: number = 0;
  changedValue1 : boolean = false;
  value2: number = 0;
  currency2: string = '';

  constructor(
    private dataService: DataService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIconLiteral('exchange', sanitizer.bypassSecurityTrustHtml(EXCHANGE));
   }

  ngOnInit(): void {
    this.dataService.getResponse().subscribe(
      data => {
        this.json = data;
        this.getListOfCurrency();

      }
    );
  }

  getListOfCurrency(): void {
    for (let currency of this.json){
      this.listOfCurrency.push(currency.$.currency);
    }
  }

  startConversion(): void {

    let multiplier = 1;
    if (this.currency2 === '') {
      return;
    }
    if (this.value1 === 0 && this.value2  === 0) {
      return;
    }
     let rate= <number>find(this.json, obj => obj.$.currency === this.currency2)._;
     let aux=find(this.json, obj => obj.$.currency === this.currency2).$.multiplier;
     if  (aux !== undefined) {
      multiplier = aux;
    }
     if ( this.changedValue1 === true) {
      this.value2 = this.value1 / rate / multiplier;
      return;
     }
      this.value1 = this.value2 * rate * multiplier;
  }

  changeInput(input : boolean): void {
    if( input === true ) {
      this.changedValue1 = true
    }
    if( input === false ) {
      this.changedValue1 = false;
    }
    this.startConversion();
  }
}
