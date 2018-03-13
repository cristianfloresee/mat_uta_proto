import { Component, OnInit } from '@angular/core';
import { ResumenService } from "../../services/resumen.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-resumen-matriculas',
  templateUrl: './resumen-matriculas.component.html',
  styleUrls: ['./resumen-matriculas.component.css']
})
export class ResumenMatriculasComponent implements OnInit {

  resumen_matriculados;
  resumen_matriculados_nuevos;


  annio_selected;
  sede_selected;
  tipo_carrera_selected;

  constructor(
    private data: ResumenService,
    private formBuilder: FormBuilder
  ) {

    this.resumen_matriculados = [
      {
        "ANNIO": 2018,
        "SEDES": [
          {
            "SEDE": "ARICA",
            "REGULAR": 111,
            "INGRESO_ESPECIAL": 111,
            "OTROS_INGRESOS": 111,
            "ANTIGUOS": 111
          },
          {
            "SEDE": "IQUIQUE",
            "REGULAR": 111,
            "INGRESO_ESPECIAL": 111,
            "OTROS_INGRESOS": 111,
            "ANTIGUOS": 111
          }
        ]


      },
      {
        "ANNIO": 2017,
        "SEDES": [
          {
            "SEDE": "TACNA",
            "REGULAR": 222,
            "INGRESO_ESPECIAL": 222,
            "OTROS_INGRESOS": 222,
            "ANTIGUOS": 222
          },
          {
            "SEDE": "LIMA",
            "REGULAR": 222,
            "INGRESO_ESPECIAL": 222,
            "OTROS_INGRESOS": 222,
            "ANTIGUOS": 222
          }
        ]
      }
    ];

    this.annio_selected = -1;
    this.sede_selected = -1;

    console.log("sede_selected: ", this.sede_selected)
  }

  ngOnInit() {
    //this.data.current_resumen.subscribe(resumen => this.resumen_matriculados = resumen)
    //this.data.current_annio.subscribe(annio => this.annio_selected = annio)
    //this.data.current_sede.subscribe(sede => this.sede_selected = sede)
  }

  shuffle() {
    this.resumen_matriculados = [
      {
        "ANNIO": 2018,
        "SEDES": [
          {
            "SEDE": "ARICA",
            "REGULAR": Math.floor(Math.random() * 10000),
            "INGRESO_ESPECIAL": Math.floor(Math.random() * 10000),
            "OTROS_INGRESOS": Math.floor(Math.random() * 10000),
            "ANTIGUOS": Math.floor(Math.random() * 10000)
          },
          {
            "SEDE": "IQUIQUE",
            "REGULAR": Math.floor(Math.random() * 10000),
            "INGRESO_ESPECIAL": Math.floor(Math.random() * 10000),
            "OTROS_INGRESOS": Math.floor(Math.random() * 10000),
            "ANTIGUOS": Math.floor(Math.random() * 10000)
          }
        ]


      },
      {
        "ANNIO": 2017,
        "SEDES": [
          {
            "SEDE": "TACNA",
            "REGULAR": Math.floor(Math.random() * 10000),
            "INGRESO_ESPECIAL": Math.floor(Math.random() * 10000),
            "OTROS_INGRESOS": Math.floor(Math.random() * 10000),
            "ANTIGUOS": Math.floor(Math.random() * 10000)
          },
          {
            "SEDE": "LIMA",
            "REGULAR": Math.floor(Math.random() * 10000),
            "INGRESO_ESPECIAL": Math.floor(Math.random() * 10000),
            "OTROS_INGRESOS": Math.floor(Math.random() * 10000),
            "ANTIGUOS": Math.floor(Math.random() * 10000)
          }
        ]
      }
    ];
  }

  changeAnnio() {

  }

  changeSede() {

  }

}
