import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { PdfService } from '../../services/pdf.service';
import * as _ from 'lodash';

@Component({
   selector: 'app-matricula-total',
   templateUrl: './matricula-total.component.html'
})
export class MatriculaTotalComponent implements OnInit, OnChanges {
   @Input() total: any;
   @Input() selected: any;
   @Input() canvas_url: any;

   after_init;
   change_data;
   constructor(private pdfService: PdfService) { }

   ngOnInit() {

      console.log("total: ", this.total);
      this.initChangeObject();

      setTimeout(() => {
         this.after_init = true;
      }, 1000)
   }

   ngOnChanges(changes) {

      if (this.after_init) {

         for (let i = 0; i < changes.total['currentValue']['FACULTADES'].length; i++) {
            let facultades_iguales = _.isEqual(changes.total['currentValue']['FACULTADES'][i], changes.total['previousValue']['FACULTADES'][i]);
            if (!facultades_iguales) {

               for (let j = 0; j < changes.total['currentValue']['FACULTADES'][i]['CARRERAS'].length; j++) {
                  let carreras_iguales = _.isEqual(changes.total['currentValue']['FACULTADES'][i]['CARRERAS'][j], changes.total['previousValue']['FACULTADES'][i]['CARRERAS'][j]);

                  if (!carreras_iguales) {
                     this.change_data['FACULTADES'][i]['CARRERAS'][j] = 'cambio';
                  }
               }

               this.change_data['FACULTADES'][i]['SUBTOTAL'] = 'cambio';
               this.change_data['TOTAL'] = 'cambio';
            }
         }

         setTimeout(() => {
            this.initChangeObject();
         }, 3000)
      }

   }

   cumulativeLength(index) {
      let acc = 0;
      for (let i = 0; i < index; i++) {
         acc += this.total['FACULTADES'][i]['CARRERAS'].length;
      }
      return acc;
   }

   pdfTotal() {
      this.pdfService.generarTotal(this.total, this.selected, this.canvas_url);
   }

   initChangeObject() {

      this.change_data = {
         FACULTADES: [],
         TOTAL: null
      };

      for (let i = 0; i < this.total['FACULTADES'].length; i++) {
         let carreras = new Array(this.total['FACULTADES'][i]['CARRERAS'].length)
         this.change_data['FACULTADES'].push(
            {
               CARRERAS: carreras,
               SUBTOTAL: null
            }
         );
      }
   }
}
