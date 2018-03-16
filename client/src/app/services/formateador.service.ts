import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class FormateadorService {

   resumenMatriculas(data) {

      let new_data = _(data).groupBy('ANIO')
         .map((value_anio, key_anio) => {

            let suma_total = {
               TIPO_CARRERA: 'TOTAL',
               ANTIGUOS: _.sumBy(value_anio, 'ANTIGUOS'),
               INGRESO_ESPECIAL: _.sumBy(value_anio, 'INGRESO_ESPECIAL'),
               OTROS_INGRESOS: _.sumBy(value_anio, 'OTROS_INGRESOS'),
               REGULAR: _.sumBy(value_anio, 'REGULAR'),
            }
            suma_total['TOTAL_NUEVOS'] = suma_total['INGRESO_ESPECIAL'] + suma_total['OTROS_INGRESOS'] + suma_total['REGULAR'];
            suma_total['TOTAL_MATRICULA'] = suma_total['TOTAL_NUEVOS'] + suma_total['ANTIGUOS'];

            return {
               ANIO: key_anio,
               SEDES: _(value_anio).groupBy('SEDE')
                  .map((value_sede, key_sede) => {
                     return {
                        SEDE: key_sede,
                        TIPOS_CARRERA:
                           _(value_sede)
                              .unshift({
                                 INGRESO_ESPECIAL: _.sumBy(value_sede, 'INGRESO_ESPECIAL'),
                                 OTROS_INGRESOS: _.sumBy(value_sede, 'OTROS_INGRESOS'),
                                 REGULAR: _.sumBy(value_sede, 'REGULAR'),
                                 ANTIGUOS: _.sumBy(value_sede, 'ANTIGUOS'),
                                 TIPO_CARRERA: 'TOTAL',
                              })
                              .map(sede => {
                                 let nuevos = (sede['REGULAR'] + sede['INGRESO_ESPECIAL'] + sede['OTROS_INGRESOS'])
                                 return _.extend({}, sede, { TOTAL_NUEVOS: nuevos, TOTAL_MATRICULA: (nuevos + sede['ANTIGUOS']) })
                              })
                              .value()
                     }
                  })
                  .values()
                  .unshift({
                     SEDE: 'TOTAL',
                     TIPOS_CARRERA:
                        _(value_anio)
                           .groupBy('TIPO_CARRERA')
                           .map((value_carrera, key_carrera) => {
                              let data = {
                                 TIPO_CARRERA: key_carrera,
                                 ANTIGUOS: _.sumBy(value_carrera, 'ANTIGUOS'),
                                 INGRESO_ESPECIAL: _.sumBy(value_carrera, 'INGRESO_ESPECIAL'),
                                 OTROS_INGRESOS: _.sumBy(value_carrera, 'OTROS_INGRESOS'),
                                 REGULAR: _.sumBy(value_carrera, 'REGULAR'),
                              }
                              data['TOTAL_NUEVOS'] = data['INGRESO_ESPECIAL'] + data['OTROS_INGRESOS'] + data['REGULAR'];
                              data['TOTAL_MATRICULA'] = data['TOTAL_NUEVOS'] + data['ANTIGUOS'];
                              return data;
                           })
                           .unshift(suma_total)
                           .value()
                  }).value()
            };
         })
         .values()
         .orderBy('ANIO', 'desc')
         .value();

      return new_data;
   }

   resumenNuevos(data) {

      let new_data = _(data)
         .groupBy('ANIO')
         .map((value_anio, key_anio) => {
            return {
               ANIO: key_anio,
               SEDES: _(value_anio)
                  .groupBy('SEDE')
                  .map((value_sede, key_sede) => {
                     return {
                        SEDE: key_sede,
                        TIPOS_CARRERA: this.formatTipoCarrera(value_sede)
                     }
                  }).values()
                  .unshift({
                     SEDE: 'TOTAL',
                     TIPOS_CARRERA: this.formatTipoCarrera(value_anio)
                  }).value()
            }
         })
         .values()
         .orderBy('ANIO', 'desc')
         .value()

      return new_data
   }

   toPorcentaje(value) {
      if (value % 1 == 0) return parseInt(value)
      else return value.toFixed(2)
   }

   calcPorcentaje(matriculados, vacantes) {
      if (vacantes != 0) return this.toPorcentaje((matriculados * 100) / vacantes)
      else return '-'
   }

   calcTotal(subtotal, value_facultad) {
      subtotal = {
         SELECCIONADOS: _.sumBy(value_facultad, 'SELECCIONADOS'),
         LISTA_ESPERA: _.sumBy(value_facultad, 'LISTA_ESPERA'),
         REPOSTULACION: _.sumBy(value_facultad, 'REPOSTULACION'),
         INGRESO_ESPECIAL: _.sumBy(value_facultad, 'INGRESO_ESPECIAL'),
         VACANTES: _.sumBy(value_facultad, 'VACANTES'),
         OTROS_INGRESOS: _.sumBy(value_facultad, 'OTROS_INGRESOS'),
      }
      subtotal['MATRICULADOS'] = subtotal['SELECCIONADOS'] + subtotal['INGRESO_ESPECIAL'];
      subtotal['MAT_PORCENTAJE'] = this.calcPorcentaje(subtotal['MATRICULADOS'], subtotal['VACANTES']);
      subtotal['MAT_TOTAL'] = subtotal['MATRICULADOS'] + subtotal['OTROS_INGRESOS'];
      return subtotal
   }

   formatTipoCarrera(value) {
      let t_total;
      t_total = this.calcTotal(t_total, value);

      return _(value)
         .groupBy('TIPO_CARRERA')
         .map((value_tipo, key_tipo) => {
            let total;
            total = this.calcTotal(total, value_tipo);
            return {
               TIPO_CARRERA: key_tipo,
               FACULTADES: this.formatFacultad(value_tipo),
               TOTAL: total
            }
         }).values()
         .unshift({
            TIPO_CARRERA: 'TOTAL',
            FACULTADES: this.formatFacultad(value),
            TOTAL: t_total

         }).value()
   }

   formatFacultad(value) {
      return _(value)
         .groupBy('FACULTAD')
         .map((value_facultad, key_facultad) => {
            let subtotal;
            subtotal = this.calcTotal(subtotal, value_facultad);
            return {
               FACULTAD: key_facultad,
               CARRERAS: _(value_facultad)
                  .map(facultad => {
                     let matriculados = (facultad['SELECCIONADOS'] + facultad['INGRESO_ESPECIAL'])
                     let adicional = {
                        MATRICULADOS: matriculados,
                        MAT_TOTAL: matriculados + facultad['OTROS_INGRESOS']
                     }
                     adicional['MAT_PORCENTAJE'] = this.calcPorcentaje(adicional['MATRICULADOS'], facultad['VACANTES'])
                     return _.extend({}, facultad, adicional)
                  }).value(),
               SUBTOTAL: subtotal
            }
         }).value()
   }

}


