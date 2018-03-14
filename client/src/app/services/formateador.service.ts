import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class FormateadorService {

  square(n) {
    return n * n;
  }

  resumenMatriculas(data) {

    let sede_total = {NENE: 11, CACA: 323};
    let new_data = _(data)
      .groupBy('ANIO')
      .map((b1, annio) => {
        return {
          ANNIO: annio,
          SEDES: _(b1).groupBy('SEDE')
            .map((b2, sede) => {

              return {
                SEDE: sede,
                TIPOS_CARRERA: _(b2).map(sub_b2 => {
                  let nuevos = (sub_b2['REGULAR']+sub_b2['INGRESO_ESPECIAL']+sub_b2['OTROS_INGRESOS'])
                  return _.extend({}, sub_b2, {TOTAL_NUEVOS: nuevos, TOTAL_MATRICULA: (nuevos + sub_b2['ANTIGUOS']) })
                })
                .value()
              }
            })
            .values()
            .push({
              SEDE: 'TOTAL',
              TIPOS_CARRERA: [sede_total]
              

            })
            //ACA PODRIA AGREGAR UN VALOR
            .value()
        };
      })
      .values()
      .orderBy('ANNIO', 'desc')
      .value();

    return new_data;
  }

}
