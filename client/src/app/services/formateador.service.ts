import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class FormateadorService {

   toPorcentaje(value) {
      return parseInt(value)
   }

   calcPorcentaje(matriculados, vacantes) {
      if (vacantes != 0) return this.toPorcentaje((matriculados * 100) / vacantes)
      else return '-'
   }

   /**
    * Función para formatear resumen nuevos, antiguos y total:
    * Ejemplo: resumen(data, 1) donde 1: Resumen Nuevo, 2: Resumen Antiguos, 3: Resumen Total
    */
   resumen(data, type) {
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
                        TIPOS_CARRERA: this.formatTipoCarrera(value_sede, type)
                     }
                  })
                  .values()
                  .unshift({
                     SEDE: 'TODAS',
                     TIPOS_CARRERA: this.formatTipoCarrera(value_anio, type)
                  })
                  .value()
            }
         })
         .values()
         .orderBy('ANIO', 'desc')
         .value()
      return new_data;
   }

   resumenMatriculas(data) {

      let new_data = _(data).groupBy('ANIO')
         .map((value_anio, key_anio) => {

            let suma_total = {
               TIPO_CARRERA: 'TODAS',
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
                                 TIPO_CARRERA: 'TODAS',
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
                     SEDE: 'TODAS',
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

   formatTipoCarrera(value, type) {
      let t_total;
      t_total = this.suma(value, type);

      return _(value)
         .groupBy('TIPO_CARRERA')
         .map((value_tipo, key_tipo) => {
            let total;
            total = this.suma(value_tipo, type);

            return {
               TIPO_CARRERA: key_tipo,
               FACULTADES: this.formatFacultad(value_tipo, type),
               TOTAL: total
            }
         })
         .values()
         .unshift({
            TIPO_CARRERA: 'TODAS',
            FACULTADES: this.formatFacultad(value, type),
            TOTAL: t_total
         })
         .value()
   }

   formatFacultad(value, type) {
      return _(value)
         .groupBy('FACULTAD')
         .map((value_facultad, key_facultad) => {

            let subtotal;
            subtotal = this.suma(value_facultad, type)

            if ((type === 2) || (type === 3)) {
               return {
                  FACULTAD: key_facultad,
                  CARRERAS: _(value_facultad).orderBy('CC', 'asc')
                  .value(),
                  SUBTOTAL: subtotal
               }
            }
            else {
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
                     }).values()
                     .orderBy('CC', 'asc')
                     .value(),
                  SUBTOTAL: subtotal
               }
            }
         }).value()
   }


   /**
    * Suma el Total o Subtotal
    * @param value 
    * @param type 
    */
   suma(value, type: number) {
      if (type === 1) {
         let resultado = {
            SELECCIONADOS: _.sumBy(value, 'SELECCIONADOS'),
            LISTA_ESPERA: _.sumBy(value, 'LISTA_ESPERA'),
            REPOSTULACION: _.sumBy(value, 'REPOSTULACION'),
            INGRESO_ESPECIAL: _.sumBy(value, 'INGRESO_ESPECIAL'),
            VACANTES: _.sumBy(value, 'VACANTES'),
            OTROS_INGRESOS: _.sumBy(value, 'OTROS_INGRESOS'),
         }
         resultado['MATRICULADOS'] = resultado['SELECCIONADOS'] + resultado['INGRESO_ESPECIAL'];
         resultado['MAT_PORCENTAJE'] = this.calcPorcentaje(resultado['MATRICULADOS'], resultado['VACANTES']);
         resultado['MAT_TOTAL'] = resultado['MATRICULADOS'] + resultado['OTROS_INGRESOS'];
         return resultado;
      }
      else if (type === 2) {
         return {
            ANTIGUOS: _.sumBy(value, 'ANTIGUOS'),
            ESPERADOS: _.sumBy(value, 'ESPERADOS')
         }
      }
      else {
         return {
            INGRESO_ADMISION: _.sumBy(value, 'INGRESO_ADMISION'),
            OTROS_INGRESOS: _.sumBy(value, 'OTROS_INGRESOS'),
            TOTAL_NUEVOS: _.sumBy(value, 'TOTAL_NUEVOS'),
            ANTIGUOS: _.sumBy(value, 'ANTIGUOS'),
            TOTAL: _.sumBy(value, 'TOTAL'),
         }
      }
   }

}


