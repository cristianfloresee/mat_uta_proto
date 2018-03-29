import { Component, Input, OnInit } from '@angular/core';

@Component({
   selector: 'app-matricula-antiguos',
   templateUrl: './matricula-antiguos.component.html'
})
export class MatriculaAntiguosComponent implements OnInit {
   @Input() antiguos: any;
   @Input() selected: any;

   constructor() { }

   ngOnInit() { }

   cumulativeLength(index) {
      let acc = 0;
      for (let i = 0; i < index; i++) {
         acc += this.antiguos['FACULTADES'][i]['CARRERAS'].length;
      }
      return acc;
   }

}
