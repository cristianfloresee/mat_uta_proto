import { Component, Input, OnInit } from '@angular/core';

@Component({
   selector: 'app-matricula-total',
   templateUrl: './matricula-total.component.html'
})
export class MatriculaTotalComponent implements OnInit {
   @Input() total: any;
   @Input() selected: any;

   constructor() { }

   ngOnInit() { }

   cumulativeLength(index) {
      let acc = 0;
      for (let i = 0; i < index; i++) {
         acc += this.total['FACULTADES'][i]['CARRERAS'].length;
      }
      return acc;
   }

}
