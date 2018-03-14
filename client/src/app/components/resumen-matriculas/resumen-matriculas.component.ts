import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { ResumenService } from "../../services/resumen.service";
import { ModalComponent } from '../../modal/modal.component';
import { SocketService } from '../../services/socket.service';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { FormateadorService } from '../../services/formateador.service';


//import { Chart } from 'chart.js';

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
  resumen_nuevos = "ñeñe";
  resumen_antiguos = "OPAOPAOPA";
  resumen_total = "KUJKKUKUUK";

  annio_selected;
  sede_selected;
  tipo_carrera_selected;

  ngOnInit() {
    //this.initIoConnection(); //INICIO EL SOCKET
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
        this.resumen_matriculas = data[0];
        this.resumen_nuevos = data[1];

        console.log("resumen_matriculas: ", this.resumen_matriculas);
        console.log("resumen_matriculas_nuevos: ", this.resumen_nuevos);

      })
      .catch(error => console.log(error));

    this.ioConnection = this.socketService.onChange()
      .subscribe((response) => {
        console.log("real time response: ", response)
      })
  }

  constructor(
    private socketService: SocketService,
    private _formateador: FormateadorService
  ) {

    /*
    this.resumen_matriculas = [
      {
        "ANNIO": 2018,
        "SEDES": [
          {
            "SEDE": "TODOS",
            "TIPOS_CARRERA": [
              {
                "TIPO_CARRERA": "TODOS",
                "REGULAR": 111,
                "INGRESO_ESPECIAL": 111,
                "OTROS_INGRESOS": 111,
                "ANTIGUOS": 111
              },
              {
                "TIPO_CARRERA": "PREGRADO",
                "REGULAR": 111,
                "INGRESO_ESPECIAL": 111,
                "OTROS_INGRESOS": 111,
                "ANTIGUOS": 111
              },
              {
                "TIPO_CARRERA": "NO PREGRADO",
                "REGULAR": 111,
                "INGRESO_ESPECIAL": 111,
                "OTROS_INGRESOS": 111,
                "ANTIGUOS": 111
              }
            ]
          },
          {
            "SEDE": "ARICA",
            "TIPOS_CARRERA": [
              {
                "TIPO_CARRERA": "TODOS",
                "REGULAR": 111,
                "INGRESO_ESPECIAL": 111,
                "OTROS_INGRESOS": 111,
                "ANTIGUOS": 111
              },
              {
                "TIPO_CARRERA": "PREGRADO",
                "REGULAR": 111,
                "INGRESO_ESPECIAL": 111,
                "OTROS_INGRESOS": 111,
                "ANTIGUOS": 111
              },
              {
                "TIPO_CARRERA": "NO PREGRADO",
                "REGULAR": 111,
                "INGRESO_ESPECIAL": 111,
                "OTROS_INGRESOS": 111,
                "ANTIGUOS": 111
              }
            ]
          },
          {
            "SEDE": "IQUIQUE",
            "TIPOS_CARRERA": [
              {
                "TIPO_CARRERA": "TODOS",
                "REGULAR": 111,
                "INGRESO_ESPECIAL": 111,
                "OTROS_INGRESOS": 111,
                "ANTIGUOS": 111
              },
              {
                "TIPO_CARRERA": "PREGRADO",
                "REGULAR": 111,
                "INGRESO_ESPECIAL": 111,
                "OTROS_INGRESOS": 111,
                "ANTIGUOS": 111
              },
              {
                "TIPO_CARRERA": "NO PREGRADO",
                "REGULAR": 111,
                "INGRESO_ESPECIAL": 111,
                "OTROS_INGRESOS": 111,
                "ANTIGUOS": 111
              }
            ]
          }
        ]
      },
      {
        "ANNIO": 2017,
        "SEDES": [
          {
            "SEDE": "TODOS",
            "TIPOS_CARRERA": [
              {
                "TIPO_CARRERA": "TODOS",
                "REGULAR": 111,
                "INGRESO_ESPECIAL": 111,
                "OTROS_INGRESOS": 111,
                "ANTIGUOS": 111
              },
              {
                "TIPO_CARRERA": "PREGRADO",
                "REGULAR": 111,
                "INGRESO_ESPECIAL": 111,
                "OTROS_INGRESOS": 111,
                "ANTIGUOS": 111
              },
              {
                "TIPO_CARRERA": "NO PREGRADO",
                "REGULAR": 111,
                "INGRESO_ESPECIAL": 111,
                "OTROS_INGRESOS": 111,
                "ANTIGUOS": 111
              }
            ]
          },
          {
            "SEDE": "ARICA",
            "TIPOS_CARRERA": [
              {
                "TIPO_CARRERA": "TODOS",
                "REGULAR": 111,
                "INGRESO_ESPECIAL": 111,
                "OTROS_INGRESOS": 111,
                "ANTIGUOS": 111
              },
              {
                "TIPO_CARRERA": "PREGRADO",
                "REGULAR": 111,
                "INGRESO_ESPECIAL": 111,
                "OTROS_INGRESOS": 111,
                "ANTIGUOS": 111
              },
              {
                "TIPO_CARRERA": "NO PREGRADO",
                "REGULAR": 111,
                "INGRESO_ESPECIAL": 111,
                "OTROS_INGRESOS": 111,
                "ANTIGUOS": 111
              }
            ]
          },
          {
            "SEDE": "IQUIQUE",
            "TIPOS_CARRERA": [
              {
                "TIPO_CARRERA": "TODOS",
                "REGULAR": 111,
                "INGRESO_ESPECIAL": 111,
                "OTROS_INGRESOS": 111,
                "ANTIGUOS": 111
              },
              {
                "TIPO_CARRERA": "PREGRADO",
                "REGULAR": 111,
                "INGRESO_ESPECIAL": 111,
                "OTROS_INGRESOS": 111,
                "ANTIGUOS": 111
              },
              {
                "TIPO_CARRERA": "NO PREGRADO",
                "REGULAR": 111,
                "INGRESO_ESPECIAL": 111,
                "OTROS_INGRESOS": 111,
                "ANTIGUOS": 111
              }
            ]
          }
        ]
      }
    ];*/

    this.resumen_matriculas = [
      {
        "REGULAR": 1273,
        "INGRESO_ESPECIAL": 352,
        "OTROS_INGRESOS": 106,
        "ANTIGUOS": 5526,
        "ANIO": 2017,
        "SEDE": "ARICA",
        "TIPO_CARRERA": "PREGRADO"
      },
      {
        "REGULAR": 0,
        "INGRESO_ESPECIAL": 10,
        "OTROS_INGRESOS": 93,
        "ANTIGUOS": 213,
        "ANIO": 2017,
        "SEDE": "ARICA",
        "TIPO_CARRERA": "NO PREGRADO"
      },
      {
        "REGULAR": 186,
        "INGRESO_ESPECIAL": 109,
        "OTROS_INGRESOS": 11,
        "ANTIGUOS": 1111,
        "ANIO": 2017,
        "SEDE": "IQUIQUE",
        "TIPO_CARRERA": "PREGRADO"
      },
      {
        "REGULAR": 0,
        "INGRESO_ESPECIAL": 0,
        "OTROS_INGRESOS": 0,
        "ANTIGUOS": 9,
        "ANIO": 2017,
        "SEDE": "IQUIQUE",
        "TIPO_CARRERA": "NO PREGRADO"
      },
      {
        "REGULAR": 1223,
        "INGRESO_ESPECIAL": 348,
        "OTROS_INGRESOS": 136,
        "ANTIGUOS": 5455,
        "ANIO": 2016,
        "SEDE": "ARICA",
        "TIPO_CARRERA": "PREGRADO"
      },
      {
        "REGULAR": 0,
        "INGRESO_ESPECIAL": 0,
        "OTROS_INGRESOS": 531,
        "ANTIGUOS": 613,
        "ANIO": 2016,
        "SEDE": "ARICA",
        "TIPO_CARRERA": "NO PREGRADO"
      },
      {
        "REGULAR": 208,
        "INGRESO_ESPECIAL": 103,
        "OTROS_INGRESOS": 13,
        "ANTIGUOS": 1145,
        "ANIO": 2016,
        "SEDE": "IQUIQUE",
        "TIPO_CARRERA": "PREGRADO"
      },
      {
        "REGULAR": 0,
        "INGRESO_ESPECIAL": 0,
        "OTROS_INGRESOS": 0,
        "ANTIGUOS": 41,
        "ANIO": 2016,
        "SEDE": "IQUIQUE",
        "TIPO_CARRERA": "NO PREGRADO"
      },
      {
        "REGULAR": 1285,
        "INGRESO_ESPECIAL": 193,
        "OTROS_INGRESOS": 139,
        "ANTIGUOS": 5677,
        "ANIO": 2015,
        "SEDE": "ARICA",
        "TIPO_CARRERA": "PREGRADO"
      },
      {
        "REGULAR": 1,
        "INGRESO_ESPECIAL": 17,
        "OTROS_INGRESOS": 797,
        "ANTIGUOS": 942,
        "ANIO": 2015,
        "SEDE": "ARICA",
        "TIPO_CARRERA": "NO PREGRADO"
      },
      {
        "REGULAR": 231,
        "INGRESO_ESPECIAL": 53,
        "OTROS_INGRESOS": 9,
        "ANTIGUOS": 1248,
        "ANIO": 2015,
        "SEDE": "IQUIQUE",
        "TIPO_CARRERA": "PREGRADO"
      },
      {
        "REGULAR": 0,
        "INGRESO_ESPECIAL": 0,
        "OTROS_INGRESOS": 41,
        "ANTIGUOS": 23,
        "ANIO": 2015,
        "SEDE": "IQUIQUE",
        "TIPO_CARRERA": "NO PREGRADO"
      }
    ];

    console.log(this.resumen_matriculas);
    let nov = this._formateador.resumenMatriculas(this.resumen_matriculas);
    console.log(nov);
    

    this.annio_selected = 0;
    this.sede_selected = 0;
    this.tipo_carrera_selected = 0;
  }




}
