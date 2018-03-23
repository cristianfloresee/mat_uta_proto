import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { ResumenService } from "../../services/resumen.service";
import { ModalComponent } from '../../modal/modal.component';
import { SocketService } from '../../services/socket.service';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { FormateadorService } from '../../services/formateador.service';

@Component({
   selector: 'app-resumen-matriculas',
   templateUrl: './resumen-matriculas.component.html',
   styleUrls: ['./resumen-matriculas.component.css'],
   encapsulation: ViewEncapsulation.None,
})
export class ResumenMatriculasComponent implements OnInit {
   @ViewChild('nuevosModal') nuevosModal: ModalComponent;
   @ViewChild('antiguosModal') antiguosModal: ModalComponent;
   @ViewChild('totalModal') totalModal: ModalComponent;

   ioConnection: any;

   resumen_matriculas;
   resumen_nuevos;
   resumen_antiguos;
   resumen_total;

   pieChartLabels: string[];
   pieChartData: number[];
   pieChartType: string;
   pieChartColors: any[];

   obj_selected = {};
   /* 
   pieChartLegend: boolean = true; //NO USADO
   pieChartOptions: any = {
      scaleShowVerticalLines: false,
      responsive: true,
      legend: {
         display: true,
         position: 'left'
      },
      scales: {
         xAxes: [{
            display: false
         }],
         yAxes: [{
            ticks: {
               beginAtZero: true
            }
         }]
      }
   };  //NO USADO
 
*/

   color_map = [
      '#f44336', //red
      '#9c27b0', //purple
      '#3f51b5', //indigo
      '#03a9f4', //light_blue
      '#4caf50', //green
      '#ffc107', //amber
      '#cddc39', //lime
      '#ff5722', //deep_orange
      '#607d8b', //blue_gray
      '#e91e63', //pink
      '#673ab7', //deep_purple
      '#00bcd4', //cyan
      '#8bc34a', //lightgreen
      '#ffeb3b', //yellow
      '#ff9800', //orange
      '#9e9e9e', //gray
      '#2196f3', //blue
      '#009688', //teal
      '#795548'
   ]; //BORRAR

   anio_selected;
   sede_selected;
   tipo_carrera_selected;
   data_selected;

   ready_resumen;
   ready_chart;


   constructor(
      private socketService: SocketService,
      private _formateador: FormateadorService
   ) {

      this.ready_chart = false;
      this.ready_resumen = false;

      this.anio_selected = 0;
      this.sede_selected = 0;
      this.tipo_carrera_selected = 0;

      this.pieChartType = 'pie';
      this.pieChartLabels = ['Ingreso Regular', 'Ingreso Especial', 'Otros Ingresos', 'Antiguos'];
      this.pieChartColors = [{ backgroundColor: ['#f44336', '#9c27b0', '#3f51b5', '#03a9f4'] }];
   }

   ngOnInit() {
      this.initIoConnection(); //INICIO EL SOCKET
   }

   changeValue() {
      this.data_selected = this.resumen_matriculas[this.anio_selected].SEDES[this.sede_selected].TIPOS_CARRERA[this.tipo_carrera_selected];
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

   openNuevos() {
      this.nuevosModal.open();
   }

   openAntiguos() {
      this.antiguosModal.open();
   }

   openTotal() {
      this.totalModal.open();
   }

   private initIoConnection(): void {
      this.socketService.initSocket()

      this.socketService.getMatriculas() //PIDO LOS DATOS AL SERVIDOR
         .then(data => {
            console.log("Data charged ...");

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

   func() {
      console.log("dsdsd");
   }
}
