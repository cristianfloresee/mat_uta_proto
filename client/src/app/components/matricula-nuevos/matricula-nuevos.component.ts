import { Component, Input, OnInit } from '@angular/core';

@Component({
   selector: 'app-matricula-nuevos',
   templateUrl: './matricula-nuevos.component.html',
   styleUrls: ['./matricula-nuevos.component.css']
})
export class MatriculaNuevosComponent implements OnInit {
   @Input() nuevos: any;
   @Input() selected: any;

   background_style;
   constructor() { }

   ngOnInit() { }

   cumulativeLength(index) {
      let acc = 0;
      for (let i = 0; i < index; i++) {
         acc += this.nuevos['FACULTADES'][i]['CARRERAS'].length;
      }
      return acc;
   }

   changeBackground(value): any {
      if (value <= 60) return { 'background-color': '#FF0000', 'color': '#F1F1F1' }
      else if (value <= 90) return { 'background-color': '#FF6600', 'color': '#F1F1F1' }
      else if (value <= 99) return { 'background-color': '#FFCC00', 'color': '#F1F1F1' }
      else return { 'background-color': '#006600', 'color': '#F1F1F1' }
   }


}
