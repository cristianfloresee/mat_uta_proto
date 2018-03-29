import { Component, ViewEncapsulation, ViewChild, OnInit, AfterViewChecked } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { SocketService } from '../../services/socket.service';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { FormateadorService } from '../../services/formateador.service';
import { PdfService } from '../../services/pdf.service';

//PLUGIN CHART.JS
import 'chart.piecelabel.js';

@Component({
   selector: 'app-resumen-matriculas',
   templateUrl: './resumen-matriculas.component.html',
   styleUrls: ['./resumen-matriculas.component.css'],
   encapsulation: ViewEncapsulation.None,
})
export class ResumenMatriculasComponent implements OnInit, AfterViewChecked {
   @ViewChild('nuevosModal') nuevosModal: ModalComponent;
   @ViewChild('antiguosModal') antiguosModal: ModalComponent;
   @ViewChild('totalModal') totalModal: ModalComponent;

   ioConnection: any;

   resumen_matriculas;
   resumen_nuevos;
   resumen_antiguos;
   resumen_total;


   pieChartLegend: boolean = true;
   pieChartLabels: string[];
   pieChartData: number[];
   pieChartType: string;
   pieChartColors: any[];
   pieOptions = {
      pieceLabel: {
         render: 'percentage',
         fontColor: '#2D396C',
         fontStyle: 'bold',
         position: 'outside'
      }
   };

   obj_selected = {};

   anio_selected;
   sede_selected;
   tipo_carrera_selected;
   data_selected = {};

   ready_resumen;
   ready_chart;

   canvas_url;
   loading;

   change_data = {};

   constructor(
      private socketService: SocketService,
      private _formateador: FormateadorService,
      private pdfService: PdfService
   ) {
      this.ready_chart = false;
      this.ready_resumen = false;

      this.anio_selected = 0;
      this.sede_selected = 0;
      this.tipo_carrera_selected = 0;

      this.pieChartType = 'pie';
      this.pieChartLabels = ['Ingreso Regular', 'Ingreso Especial', 'Otros Ingresos', 'Antiguos'];
      this.pieChartColors = [{ backgroundColor: ['#DEB01F', '#C9631F', '#678FCA', '#303880'] }];
   }

   ngOnInit() {
      this.initIoConnection(); //INICIO EL SOCKET
   }


   //SE EJECUTA MULTIPLES VECES
   ngAfterViewChecked() {
      this.genCanvas();
      this.canvas_url = this.getCanvasURL();
   }

   changeValue() {
      let new_data = this.resumen_matriculas[this.anio_selected].SEDES[this.sede_selected].TIPOS_CARRERA[this.tipo_carrera_selected];
      console.log(new_data);
      if (new_data['REGULAR'] != this.data_selected['REGULAR']) {
         console.log("cambio estilo");
         this.change_data['TOTAL_MATRICULA'] = 'cambio';
      }
      else if (new_data['INGRESO_ESPECIAL'] != this.data_selected['INGRESO_ESPECIAL']){

      }
      else if (new_data['OTROS_INGRESOS'] != this.data_selected['OTROS_INGRESOS']){

      }
      else if(new_data['TOTAL_MATRICULA'] != this.data_selected['TOTAL_MATRICULA']){
         this.change_data['TOTAL_MATRICULA'] = 'cambio';
      }
      else{
         console.log("cambio estilo");
         this.change_data['TOTAL_MATRICULA'] = 'cambio';
      }

      this.data_selected = new_data;
      this.pieChartData = [
         this.data_selected['REGULAR'],
         this.data_selected['INGRESO_ESPECIAL'],
         this.data_selected['OTROS_INGRESOS'],
         this.data_selected['ANTIGUOS']
      ];

      this.obj_selected = {
         ANIO: this.resumen_matriculas[this.anio_selected].ANIO,
         SEDE: this.resumen_matriculas[this.anio_selected].SEDES[this.sede_selected].SEDE,
         TIPO_CARRERA: this.resumen_matriculas[this.anio_selected].SEDES[this.sede_selected].TIPOS_CARRERA[this.tipo_carrera_selected].TIPO_CARRERA
      }
   }

   /*============= PARA ABRIR LOS MODALS =============*/
   openNuevos() {
      this.nuevosModal.open();
   }

   openAntiguos() {
      this.antiguosModal.open();
   }

   openTotal() {
      this.totalModal.open();
   }

   /*============= PARA ESCUCHAR LOS CAMBIOS EN TIEMPO REAL =============*/
   private initIoConnection(): void {
      this.socketService.initSocket()

      this.socketService.getMatriculas() //PIDO LOS DATOS AL SERVIDOR
         .then(data => {
            this.loading = true;

            this.resumen_matriculas = this._formateador.resumenMatriculas(data[0]);
            this.ready_resumen = true;
            this.changeValue();
            this.ready_chart = true;

            this.resumen_nuevos = this._formateador.resumen(data[1], 1);
            this.resumen_antiguos = this._formateador.resumen(data[2], 2);
            this.resumen_total = this._formateador.resumen(data[3], 3);

         })
         .catch(error => console.log(error));

      this.ioConnection = this.socketService.onChange()
         .subscribe((data) => {

            //RESUMEN
            let clone_temporal: any[] = this.resumen_matriculas;
            clone_temporal.shift(); //LE SACO EL PRIMER ELEMENTO
            let new_data = this._formateador.resumenMatriculas(data[0]); //OBTENGO EL DATO FORMATEADO
            clone_temporal.unshift(new_data[0]); //LO INSERTO COMO PRIMER ELEMENTO
            this.resumen_matriculas = clone_temporal;
            this.changeValue(); //APLICO LOS CAMBIOS EN EL GRAFICO

            //NUEVOS
            clone_temporal = this.resumen_nuevos;
            clone_temporal.shift();
            new_data = this._formateador.resumen(data[1], 1);
            clone_temporal.unshift(new_data[0]);
            this.resumen_nuevos = clone_temporal;

            //ANTIGUOS
            clone_temporal = this.resumen_antiguos;
            clone_temporal.shift();
            new_data = this._formateador.resumen(data[2], 2);
            clone_temporal.unshift(new_data[0]);
            this.resumen_antiguos = clone_temporal;

            //TOTAL
            clone_temporal = this.resumen_total;
            clone_temporal.shift();
            new_data = this._formateador.resumen(data[3], 3);
            clone_temporal.unshift(new_data[0]);
            this.resumen_total = clone_temporal;
         })
   }

   /*============= PARA OBTENER EL CANVAS =============*/
   genCanvas() {
      const c = <HTMLCanvasElement>document.getElementById('logo_uta_canvas');
      const ctx = c.getContext('2d');
      const img: any = document.getElementById('logo-uta');
      c.width = img.width;
      c.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
   }

   //OBTIENE LA URL DEL LOGO UTA
   getCanvasURL() {
      const canvas = <HTMLCanvasElement>document.getElementById('logo_uta_canvas');
      const canvas2Img = canvas.toDataURL('image/png', 1.0);
      return canvas2Img;
   }

   pdfResumen() {
      this.pdfService.generarResumen(this.data_selected, this.obj_selected, this.canvas_url);
   }
  
}
