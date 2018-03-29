import { Component, Input, OnInit } from '@angular/core';
import { PdfService } from '../../services/pdf.service';

@Component({
   selector: 'app-matricula-total',
   templateUrl: './matricula-total.component.html'
})
export class MatriculaTotalComponent implements OnInit {
   @Input() total: any;
   @Input() selected: any;
   @Input() canvas_url: any;
   constructor(private pdfService: PdfService) { }

   ngOnInit() { }

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

}
