import { Component, Input, OnInit } from '@angular/core';
import { PdfService } from '../../services/pdf.service';

@Component({
   selector: 'app-matricula-antiguos',
   templateUrl: './matricula-antiguos.component.html'
})
export class MatriculaAntiguosComponent implements OnInit {
   @Input() antiguos: any;
   @Input() selected: any;
   @Input() canvas_url: any;

   constructor(private pdfService: PdfService) { }

   ngOnInit() { }

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

}
