import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { PdfService } from '../../services/pdf.service';
import * as _ from 'lodash';

@Component({
   selector: 'app-matricula-antiguos',
   templateUrl: './matricula-antiguos.component.html'
})
export class MatriculaAntiguosComponent implements OnInit, OnChanges {
   @Input() antiguos: any;
   @Input() selected: any;
   @Input() canvas_url: any;

   after_init;
   change_data;

   constructor(private pdfService: PdfService) {}

   ngOnInit() {

      this.initChangeObject();

      setTimeout(() => {
         this.after_init = true;
      }, 1000)
   }

   cumulativeLength(index) {

      let acc = 0;
      for (let i = 0; i < index; i++) {
         acc += this.antiguos['FACULTADES'][i]['CARRERAS'].length;
      }
      return acc;
   }


   pdfAntiguos() {
      this.pdfService.generarAntiguos(this.antiguos, this.selected, this.canvas_url);
   }

   ngOnChanges(changes) {
      if (this.after_init) {


         for (let i = 0; i < changes.antiguos['currentValue']['FACULTADES'].length; i++) {
            let facultades_iguales = _.isEqual(changes.antiguos['currentValue']['FACULTADES'][i], changes.antiguos['previousValue']['FACULTADES'][i]);
            if (!facultades_iguales) {

               for (let j = 0; j < changes.antiguos['currentValue']['FACULTADES'][i]['CARRERAS'].length; j++) {
                  let carreras_iguales = _.isEqual(changes.antiguos['currentValue']['FACULTADES'][i]['CARRERAS'][j], changes.antiguos['previousValue']['FACULTADES'][i]['CARRERAS'][j]);

                  if (!carreras_iguales) {
                     this.change_data['FACULTADES'][i]['CARRERAS'][j] = 'cambio';
                  }
               }

               this.change_data['FACULTADES'][i]['SUBTOTAL'] = 'cambio';
               console.log("facultades distintas: ", changes.antiguos['currentValue']['FACULTADES'][i]);
               this.change_data['TOTAL'] = 'cambio';
            }
         }

         setTimeout(() => {
            this.initChangeObject();
         }, 3000)
      }

      // changes.prop contains the old and the new value...
   }

   initChangeObject() {

      this.change_data = {
         FACULTADES: [],
         TOTAL: null
      };
      for (let i = 0; i < this.antiguos['FACULTADES'].length; i++) {


         let carreras = new Array(this.antiguos['FACULTADES'][i]['CARRERAS'].length)

         this.change_data['FACULTADES'].push(
            {
               CARRERAS: carreras,
               SUBTOTAL: null
            }
         );
      }
   }

}
