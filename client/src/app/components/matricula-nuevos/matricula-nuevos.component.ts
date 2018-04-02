import { Component, Input, OnInit } from '@angular/core';
import { PdfService } from '../../services/pdf.service';
import * as _ from 'lodash';

@Component({
   selector: 'app-matricula-nuevos',
   templateUrl: './matricula-nuevos.component.html',
   styleUrls: ['./matricula-nuevos.component.css']
})
export class MatriculaNuevosComponent implements OnInit {
   @Input() nuevos: any;
   @Input() selected: any;
   @Input() canvas_url: any;

   after_init;
   change_data;
   
   constructor(private pdfService: PdfService) { }

   ngOnInit() { 
      this.initChangeObject();

      setTimeout(() => {
         this.after_init = true;
      }, 1000)
   }

   ngOnChanges(changes) {
      if (this.after_init) {


         for (let i = 0; i < changes.nuevos['currentValue']['FACULTADES'].length; i++) {
            let facultades_iguales = _.isEqual(changes.nuevos['currentValue']['FACULTADES'][i], changes.nuevos['previousValue']['FACULTADES'][i]);
            if (!facultades_iguales) {

               for (let j = 0; j < changes.nuevos['currentValue']['FACULTADES'][i]['CARRERAS'].length; j++) {
                  let carreras_iguales = _.isEqual(changes.nuevos['currentValue']['FACULTADES'][i]['CARRERAS'][j], changes.nuevos['previousValue']['FACULTADES'][i]['CARRERAS'][j]);

                  if (!carreras_iguales) {
                     this.change_data['FACULTADES'][i]['CARRERAS'][j] = 'cambio';
                  }
               }

               this.change_data['FACULTADES'][i]['SUBTOTAL'] = 'cambio';
               console.log("facultades distintas: ", changes.nuevos['currentValue']['FACULTADES'][i]);
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

   pdfNuevos() {
      this.pdfService.generarNuevos(this.nuevos, this.selected, this.canvas_url);
   }

   initChangeObject() {

      this.change_data = {
         FACULTADES: [],
         TOTAL: null
      };
      for (let i = 0; i < this.nuevos['FACULTADES'].length; i++) {


         let carreras = new Array(this.nuevos['FACULTADES'][i]['CARRERAS'].length)

         this.change_data['FACULTADES'].push(
            {
               CARRERAS: carreras,
               SUBTOTAL: null
            }
         );
      }
   }


}
