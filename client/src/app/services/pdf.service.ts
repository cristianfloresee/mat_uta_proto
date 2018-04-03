import { Injectable } from '@angular/core';
//LIBS PARA PDF-MAKE
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class PdfService {

   generarResumen(data, selected, canvas_url) {

      // gráfico a imagen
      const canvas2 = <HTMLCanvasElement>document.querySelector('#cool-canvas');
      const canvas2Img = canvas2.toDataURL('image/png');

      const headers = {
         fila_0: {
            col_1: { text: '#', style: 'tableHeader' },
            col_2: { text: 'TIPO DE INGRESO', style: 'tableHeader' },
            col_3: { text: 'MATRICULADOS', style: 'tableHeader' }
         }
      };

      const rows = {
         fila_0: {
            col_1: { text: 'ALUMNOS NUEVOS', style: ['fila_left', 'tam_10', 'bg_celeste'], colSpan: 3 }
         },
         fila_1: {
            col_1: { text: '1', style: ['numeros', 'tam_10', 'bg_azul'] },
            col_2: { text: 'INGRESO REGULAR', style: ['tam_10', 'zebra'] },
            col_3: { text: data.REGULAR, style: ['numeros', 'tam_10', 'zebra'] }
         },
         fila_2: {
            col_1: { text: '2', style: ['numeros', 'tam_10', 'bg_azul'] },
            col_2: { text: 'INGRESO ESPECIAL', style: ['tam_10'] },
            col_3: { text: data.INGRESO_ESPECIAL, style: ['numeros', 'tam_10'] }
         },
         fila_3: {
            col_1: { text: '3', style: ['numeros', 'tam_10', 'bg_azul'] },
            col_2: { text: 'OTROS INGRESOS', style: ['tam_10', 'zebra'] },
            col_3: { text: data.OTROS_INGRESOS, style: ['numeros', 'tam_10', 'zebra'] }
         },
         fila_4: {
            col_1: { text: 'TOTAL ALUMNOS NUEVOS', style: ['subTotal', 'bg_azul'], colSpan: 2 },
            col_3: { text: data.TOTAL_NUEVOS, style: ['numeros', 'bold', 'tam_10', 'bg_azul'] }
         },
         fila_5: {
            col_1: { text: 'ALUMNOS ANTIGUOS', style: ['fila_left', 'tam_10', 'bg_celeste'], colSpan: 3 }
         },
         fila_6: {
            col_1: { text: 'TOTAL ALUMNOS ANTIGUOS', style: ['subTotal', 'bg_azul'], colSpan: 2 },
            col_3: { text: data.ANTIGUOS, style: ['numeros', 'bold', 'tam_10', 'bg_azul'] }
         },
         fila_7: {
            col_1: { text: 'MATRICULA TOTAL', style: ['total', 'tam_10', 'bg_celeste'], colSpan: 2 },
            col_3: { text: data.TOTAL_MATRICULA, style: ['numeros', 'bold', 'tam_10', 'bg_celeste'] }
         },
         fila_8: {
            col_1: { text: ' ', style: ['tableFooter'], colSpan: 3 }
         }
      };

      const body = [];

      for (var key in headers) {
         if (headers.hasOwnProperty(key)) {
            const header = headers[key];
            var row = new Array();
            row.push(header.col_1);
            row.push(header.col_2);
            row.push(header.col_3);
            body.push(row);
         }
      }

      for (var key in rows) {
         if (rows.hasOwnProperty(key)) {
            const data = rows[key];
            var row = new Array();
            row.push(data.col_1);
            row.push(data.col_2);
            row.push(data.col_3);
            body.push(row);
         }
      }

      var anio_th: any = selected['ANIO'];
      var sede_th: any = selected['SEDE'];
      var carrera_th: any = selected['TIPO_CARRERA'];
      var canvas_th: any = canvas_url;

      var today: any = new Date();

      var dd_th: any = today.getDate();
      var mm_th: any = today.getMonth() + 1; //January is 0!
      var yyyy_th: any = today.getFullYear();

      var h_th: any = today.getHours();
      var m_th: any = today.getMinutes();
      var s_th: any = today.getSeconds();

      if (dd_th < 10) {
         dd_th = '0' + dd_th;
      }
      if (mm_th < 10) {
         mm_th = '0' + mm_th;
      }
      if (h_th < 10) {
         h_th = '0' + h_th;
      }
      if (m_th < 10) {
         m_th = '0' + m_th;
      }
      if (s_th < 10) {
         s_th = '0' + s_th;
      }

      var fecha_th: any = dd_th + '-' + mm_th + '-' + yyyy_th;
      var hora_th: any = h_th + ":" + m_th + ":" + s_th;

      const dd = {
         pageMargins: [20, 170, 20, 20],
         pageSize: 'LETTER',
         pageOrientation: 'landscape',
         header: function (currentPage, pageCount) {

            return {

               table: {
                  widths: [10, '*', 10, '*', '*', '*', '*', 10, '*', 10], // ancho de las columnas
                  body: [
                     [
                        { text: ' ', border: [true, true, false, false] },
                        { image: canvas_th, rowSpan: 7, margin: [10, 12, 0, 0], border: [false, true, false, true] },
                        { text: ' ', border: [false, true, false, false] },
                        { text: ' ', border: [false, true, false, false] },
                        { text: ' ', border: [false, true, false, false] },
                        { text: ' ', border: [false, true, false, false] },
                        { text: ' ', border: [false, true, false, false] },
                        { text: ' ', border: [false, true, false, false] },
                        { text: ' ', border: [false, true, false, false] },
                        { text: ' ', border: [false, true, true, false] }
                     ],
                     [
                        { text: ' ', border: [true, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, true, false] },
                     ],
                     [
                        { text: ' ', border: [true, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: 'Matrícula General de Alumnos', colSpan: 4, rowSpan: 2, style: ['center'], fontSize: 20, margin: [0, 5, 0, 0], border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: 'Página: ' + currentPage.toString() + ' de ' + pageCount, style: ['tam_10'], border: [false, false, false, false] },
                        { text: ' ', border: [false, false, true, false] }
                     ],
                     [
                        { text: ' ', border: [true, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: 'Fecha: ' + fecha_th, style: ['tam_10'], border: [false, false, false, false] },
                        { text: ' ', border: [false, false, true, false] }
                     ],
                     [
                        { text: ' ', border: [true, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: 'Año: ' + anio_th + ', Sede: ' + sede_th + ', Tipo de Carrera: ' + carrera_th, colSpan: 4, style: ['center'], border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: 'Hora: ' + hora_th, style: ['tam_10'], border: [false, false, false, false] },
                        { text: ' ', border: [false, false, true, false] }
                     ],
                     [
                        { text: ' ', border: [true, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, true, false] }
                     ],
                     [
                        { text: ' ', border: [true, false, false, true] },
                        { text: ' ', border: [false, false, false, true] },
                        { text: ' ', border: [false, false, false, true] },
                        { text: ' ', border: [false, false, false, true] },
                        { text: ' ', border: [false, false, false, true] },
                        { text: ' ', border: [false, false, false, true] },
                        { text: ' ', border: [false, false, false, true] },
                        { text: ' ', border: [false, false, false, true] },
                        { text: ' ', border: [false, false, false, true] },
                        { text: ' ', border: [false, false, true, true] }
                     ]
                  ]
               },
               style: 'bodyHeader'
            }
         },
         content: [
            { // tabla
               table: {
                  widths: [20, 150, 100], // ancho de las columnas
                  headerRows: 1,
                  body: body,
               },
               style: 'tabla'
            },
            { // imagen
               image: canvas2Img,
               width: 450,
               height: 225,
               margin: [150, 0, 0, 0]
            }

         ],
         styles: {

            tableHeader: {
               fontSize: 10,
               bold: true,
               alignment: 'center',
               fillColor: '#96A8B9',
               margin: [0, 0, 0, 0]
            },
            bodyHeader: {
               fillColor: '',
               margin: [20, 20, 20, 0]
            },
            tableFooter: {
               fontSize: 10,
               alignment: 'center',
               fillColor: '#96A8B9',
               margin: [0, 0, 0, 0]
            },
            fila_left: {
               fontSize: 11,
               bold: true,
               margin: [5, 0, 0, 0],
               alignment: 'left'
            },
            numeros: {
               alignment: 'center',
               margin: [0, 0, 0, 0]
            },
            bold: {
               bold: true
            },
            subTotal: {
               fontSize: 10,
               bold: true,
               margin: [0, 0, 5, 0],
               alignment: 'right'
            },
            total: {
               fontSize: 10,
               bold: true,
               margin: [5, 0, 0, 0],
               alignment: 'left'
            },
            tam_10: {
               fontSize: 10
            },
            tam_11: {
               fontSize: 11
            },
            tam_12: {
               fontSize: 12
            },
            left: {
               alignment: 'left'
            },
            center: {
               alignment: 'center'
            },
            justify: {
               alignment: 'justify'
            },
            right: {
               alignment: 'right'
            },
            background: {
               fillColor: '#FF0000'
            },
            titulo: {
               fontSize: 20,
               bold: true,
               alignment: 'center',
               margin: [0, 20, 0, 20]
            },
            tabla: {
               margin: [220, 0, 0, 20]
            },
            bg_azul: {
               fillColor: '#96A8B9'
            },
            bg_celeste: {
               fillColor: '#C7D1DA'
            },
            zebra: {
               fillColor: '#E5EDFA'
            },
            subheader: {
               fontSize: 12,
               bold: true,
               alignment: 'center',
               margin: [0, 0, 0, 0]
            }
         }
      };

      pdfMake.createPdf(dd).download('MatriculaGeneral.pdf');

   }

   generarNuevos(data, selected, canvas_url) {

      const headers = {
         fila_0: {
            col_1: { text: '#', rowSpan: 2, style: 'tableHeader' },
            col_2: { text: 'CARRERA', rowSpan: 2, style: 'tableHeader' },
            col_3: { text: 'SELECCIONADOS', rowSpan: 2, style: 'tableHeader' },
            col_4: { text: 'LISTA ESPERA', rowSpan: 2, style: 'tableHeader' },
            col_5: { text: 'REPOSTULACIÓN', rowSpan: 2, style: 'tableHeader' },
            col_6: { text: 'INGRESO ESPECIAL', rowSpan: 2, style: 'tableHeader' },
            col_7: { text: 'MATRICULA ADMISIÓN', colSpan: 3, style: 'tableHeader' },
            col_10: { text: 'OTROS INGRESOS', rowSpan: 2, style: 'tableHeader' },
            col_11: { text: 'MATRICULA TOTAL', rowSpan: 2, style: 'tableHeader' },
         },
         fila_1: {
            col_1: { text: '1' },
            col_2: { text: '2' },
            col_3: { text: '3' },
            col_4: { text: '4' },
            col_5: { text: '5' },
            col_6: { text: '6' },
            col_7: { text: 'VACANTES', style: 'tableHeader' },
            col_8: { text: 'MATRICULADOS', style: 'tableHeader' },
            col_9: { text: '%', style: 'tableHeader' },
            col_10: { text: '10' },
            col_11: { text: '11' }
         }
      };

      const body = [];

      //meter los headers al body
      for (var key in headers) {
         if (headers.hasOwnProperty(key)) {
            const header = headers[key];
            var row = new Array();
            row.push(header.col_1);
            row.push(header.col_2);
            row.push(header.col_3);
            row.push(header.col_4);
            row.push(header.col_5);
            row.push(header.col_6);
            row.push(header.col_7);
            row.push(header.col_8);
            row.push(header.col_9);
            row.push(header.col_10);
            row.push(header.col_11);
            body.push(row);
         }
      }

      var col_1;
      var col_2;
      var col_3;
      var col_4;
      var col_5;
      var col_6;
      var col_7;
      var col_8;
      var col_9;
      var col_10;
      var col_11;

      var nombre_facultad;

      var numero;
      var carrera;
      var seleccionados;
      var lista_espera;
      var repostulacion;
      var ingreso_especial;
      var vacantes;
      var matriculados;
      var porcentaje;
      var otros_ingresos;
      var matricula_total;

      var st_seleccionados;
      var st_lista_espera;
      var st_repostulacion;
      var st_ingreso_especial;
      var st_vacantes;
      var st_matriculados;
      var st_porcentaje;
      var st_otros_ingresos;
      var st_matricula_total;

      var t_seleccionados;
      var t_lista_espera;
      var t_repostulacion;
      var t_ingreso_especial;
      var t_vacantes;
      var t_matriculados;
      var t_porcentaje;
      var t_otros_ingresos;
      var t_matricula_total;

      var i = 1;

      //ITERAR FACULTADES
      data['FACULTADES'].forEach((element) => {

         //console.log('NOMBRE FAC: ', element.FACULTAD);
         nombre_facultad = element.FACULTAD;

         col_1 = { text: nombre_facultad, style: ['tam_10', 'bold', 'bg_celeste'], colSpan: 11 };

         const row1 = new Array();

         row1.push(col_1);
         row1.push(col_2);
         row1.push(col_3);
         row1.push(col_4);
         row1.push(col_5);
         row1.push(col_6);
         row1.push(col_7);
         row1.push(col_8);
         row1.push(col_9);
         row1.push(col_10);
         row1.push(col_11);
         body.push(row1);

         // iterar carreras
         element.CARRERAS.forEach((ele) => {

            /* console.log(i);
            console.log('CARRERA: ', ele.CC + ' - ' + ele.CARRERA);
            console.log('SELECCIONADOS: ', ele.SELECCIONADOS);
            console.log('LISTA ESPERA: ', ele.LISTA_ESPERA);
            console.log('REPOSTULACION: ', ele.REPOSTULACION);
            console.log('INGRESO ESPECIAL: ', ele.INGRESO_ESPECIAL);
            console.log('VACANTES: ', ele.VACANTES);
            console.log('MATRICULADOS: ', ele.MATRICULADOS);
            console.log('%: ', ele.MAT_PORCENTAJE);
            console.log('OTROS INGRESOS: ', ele.OTROS_INGRESOS);
            console.log('MATRICULA TOTAL: ', ele.MAT_TOTAL); */


            numero = i;
            carrera = ele.CC + ' - ' + ele.CARRERA;
            seleccionados = ele.SELECCIONADOS;
            lista_espera = ele.LISTA_ESPERA;
            repostulacion = ele.REPOSTULACION;
            ingreso_especial = ele.INGRESO_ESPECIAL;
            vacantes = ele.VACANTES;
            matriculados = ele.MATRICULADOS;

            if (ele.MAT_PORCENTAJE != '-') {
               const c_p = Number(ele.MAT_PORCENTAJE);
               porcentaje = c_p.toFixed(0);
            }

            else {
               porcentaje = ele.MAT_PORCENTAJE;
            }

            // porcentaje = ele.MAT_PORCENTAJE;
            otros_ingresos = ele.OTROS_INGRESOS;
            matricula_total = ele.MAT_TOTAL;

            col_1 = { text: numero, style: ['numeros', 'bg_azul'] };

            if (i % 2 == 1) {
               col_2 = { text: carrera, style: ['tam_10', 'left', 'zebra'] };
               col_3 = { text: seleccionados, style: ['numeros', 'zebra'] };
               col_4 = { text: lista_espera, style: ['numeros', 'zebra'] };
               col_5 = { text: repostulacion, style: ['numeros', 'zebra'] };
               col_6 = { text: ingreso_especial, style: ['numeros', 'zebra'] };
               col_7 = { text: vacantes, style: ['numeros', 'zebra'] };
               col_8 = { text: matriculados, style: ['numeros', 'zebra'] };

               if (porcentaje != '-') {
                  if (porcentaje <= 60) {
                     col_9 = { text: porcentaje + '%', style: ['numeros', 'red', 'white'] };
                  }
                  else if (porcentaje <= 90) {
                     col_9 = { text: porcentaje + '%', style: ['numeros', 'orange', 'white'] };
                  }
                  else if (porcentaje <= 99) {
                     col_9 = { text: porcentaje + '%', style: ['numeros', 'yellow', 'white'] };
                  }
                  else {
                     col_9 = { text: porcentaje + '%', style: ['numeros', 'green', 'white'] };
                  }
               }
               else {
                  col_9 = { text: porcentaje, style: ['numeros', 'zebra'] };
               }

               col_10 = { text: otros_ingresos, style: ['numeros', 'zebra'] };
               col_11 = { text: matricula_total, style: ['numeros', 'zebra'] };

            }

            else {

               col_2 = { text: carrera, style: ['tam_10', 'left'] };
               col_3 = { text: seleccionados, style: ['numeros'] };
               col_4 = { text: lista_espera, style: ['numeros'] };
               col_5 = { text: repostulacion, style: ['numeros'] };
               col_6 = { text: ingreso_especial, style: ['numeros'] };
               col_7 = { text: vacantes, style: ['numeros'] };
               col_8 = { text: matriculados, style: ['numeros'] };

               if (porcentaje != '-') {
                  if (porcentaje <= 60) {
                     col_9 = { text: porcentaje + '%', style: ['numeros', 'red', 'white'] };
                  }
                  else if (porcentaje <= 90) {
                     col_9 = { text: porcentaje + '%', style: ['numeros', 'orange', 'white'] };
                  }
                  else if (porcentaje <= 99) {
                     col_9 = { text: porcentaje + '%', style: ['numeros', 'yellow', 'white'] };
                  }
                  else {
                     col_9 = { text: porcentaje + '%', style: ['numeros', 'green', 'white'] };
                  }
               }
               else {
                  col_9 = { text: porcentaje, style: ['numeros'] };
               }

               col_10 = { text: otros_ingresos, style: ['numeros'] };
               col_11 = { text: matricula_total, style: ['numeros'] };

            }

            i++;

            const row2 = new Array();

            row2.push(col_1);
            row2.push(col_2);
            row2.push(col_3);
            row2.push(col_4);
            row2.push(col_5);
            row2.push(col_6);
            row2.push(col_7);
            row2.push(col_8);
            row2.push(col_9);
            row2.push(col_10);
            row2.push(col_11);
            body.push(row2);

         });

         // SUBTOTAL de cada facultad
         /* console.log('ST SELECCIONADOS: ', element.SUBTOTAL.SELECCIONADOS);
         console.log('ST LISTA ESPERA: ', element.SUBTOTAL.LISTA_ESPERA);
         console.log('ST REPOSTULACION: ', element.SUBTOTAL.REPOSTULACION);
         console.log('ST INGRESO ESPECIAL: ', element.SUBTOTAL.INGRESO_ESPECIAL);
         console.log('ST VACANTES: ', element.SUBTOTAL.VACANTES);
         console.log('ST MATRICULADOS: ', element.SUBTOTAL.MATRICULADOS);
         console.log('ST %: ', element.SUBTOTAL.MAT_PORCENTAJE);
         console.log('ST OTROS INGRESOS: ', element.SUBTOTAL.OTROS_INGRESOS);
         console.log('ST MATRICULA TOTAL: ', element.SUBTOTAL.MAT_TOTAL); */

         st_seleccionados = element.SUBTOTAL.SELECCIONADOS;
         st_lista_espera = element.SUBTOTAL.LISTA_ESPERA;
         st_repostulacion = element.SUBTOTAL.REPOSTULACION;
         st_ingreso_especial = element.SUBTOTAL.INGRESO_ESPECIAL;
         st_vacantes = element.SUBTOTAL.VACANTES;
         st_matriculados = element.SUBTOTAL.MATRICULADOS;


         if (element.SUBTOTAL.MAT_PORCENTAJE != '-') {
            const st_p = Number(element.SUBTOTAL.MAT_PORCENTAJE);
            st_porcentaje = st_p.toFixed(0) + '%';
         }
         else {
            st_porcentaje = element.SUBTOTAL.MAT_PORCENTAJE;
         }

         // st_porcentaje = element.SUBTOTAL.MAT_PORCENTAJE;
         st_otros_ingresos = element.SUBTOTAL.OTROS_INGRESOS;
         st_matricula_total = element.SUBTOTAL.MAT_TOTAL;

         col_1 = { text: 'SUBTOTAL', style: ['tam_10', 'bold', 'right', 'bg_celeste'], colSpan: 2 };
         col_3 = { text: st_seleccionados, style: ['numeros', 'bold', 'bg_celeste'] };
         col_4 = { text: st_lista_espera, style: ['numeros', 'bold', 'bg_celeste'] };
         col_5 = { text: st_repostulacion, style: ['numeros', 'bold', 'bg_celeste'] };
         col_6 = { text: st_ingreso_especial, style: ['numeros', 'bold', 'bg_celeste'] };
         col_7 = { text: st_vacantes, style: ['numeros', 'bold', 'bg_celeste'] };
         col_8 = { text: st_matriculados, style: ['numeros', 'bold', 'bg_celeste'] };
         col_9 = { text: st_porcentaje, style: ['numeros', 'bold', 'bg_celeste'] };
         col_10 = { text: st_otros_ingresos, style: ['numeros', 'bold', 'bg_celeste'] };
         col_11 = { text: st_matricula_total, style: ['numeros', 'bold', 'bg_celeste'] };

         const row3 = new Array();

         row3.push(col_1);
         row3.push(col_2);
         row3.push(col_3);
         row3.push(col_4);
         row3.push(col_5);
         row3.push(col_6);
         row3.push(col_7);
         row3.push(col_8);
         row3.push(col_9);
         row3.push(col_10);
         row3.push(col_11);
         body.push(row3);

      });


      // console.log("array total:? ", data)

      // TOTAL

      /*
      console.log('T SELECCIONADOS :', data['TOTAL'].SELECCIONADOS);
      console.log('T LISTA ESPERA :', data['TOTAL'].LISTA_ESPERA);
      console.log('T REPOSTULACION :', data['TOTAL'].REPOSTULACION);
      console.log('T INGRESO ESPECIAL :', data['TOTAL'].INGRESO_ESPECIAL);
      console.log('T VACANTES :', data['TOTAL'].VACANTES);
      console.log('T MATRICULADOS :', data['TOTAL'].MATRICULADOS);
      console.log('T % :', data['TOTAL'].MAT_PORCENTAJE);
      console.log('T OTROS INGRESOS :', data['TOTAL'].OTROS_INGRESOS);
      console.log('T MATRICULA TOTAL :', data['TOTAL'].MAT_TOTAL);
      */


      t_seleccionados = data['TOTAL'].SELECCIONADOS;
      t_lista_espera = data['TOTAL'].LISTA_ESPERA;
      t_repostulacion = data['TOTAL'].REPOSTULACION;
      t_ingreso_especial = data['TOTAL'].INGRESO_ESPECIAL;
      t_vacantes = data['TOTAL'].VACANTES;
      t_matriculados = data['TOTAL'].MATRICULADOS;

      const t_p = Number(data['TOTAL'].MAT_PORCENTAJE);
      t_porcentaje = t_p.toFixed(0) + '%';
      t_otros_ingresos = data['TOTAL'].OTROS_INGRESOS;
      t_matricula_total = data['TOTAL'].MAT_TOTAL;

      col_1 = { text: 'TOTAL', style: ['tam_10', 'bold', 'right', 'bg_azul'], colSpan: 2 };
      col_3 = { text: t_seleccionados, style: ['numeros', 'bold', 'bg_azul'] };
      col_4 = { text: t_lista_espera, style: ['numeros', 'bold', 'bg_azul'] };
      col_5 = { text: t_repostulacion, style: ['numeros', 'bold', 'bg_azul'] };
      col_6 = { text: t_ingreso_especial, style: ['numeros', 'bold', 'bg_azul'] };
      col_7 = { text: t_vacantes, style: ['numeros', 'bold', 'bg_azul'] };
      col_8 = { text: t_matriculados, style: ['numeros', 'bold', 'bg_azul'] };
      col_9 = { text: t_porcentaje, style: ['numeros', 'bold', 'bg_azul'] };
      col_10 = { text: t_otros_ingresos, style: ['numeros', 'bold', 'bg_azul'] };
      col_11 = { text: t_matricula_total, style: ['numeros', 'bold', 'bg_azul'] };

      const row4 = new Array();

      row4.push(col_1);
      row4.push(col_2);
      row4.push(col_3);
      row4.push(col_4);
      row4.push(col_5);
      row4.push(col_6);
      row4.push(col_7);
      row4.push(col_8);
      row4.push(col_9);
      row4.push(col_10);
      row4.push(col_11);
      body.push(row4);

      var anio_th: any = selected['ANIO'];
      var sede_th: any = selected['SEDE'];
      var carrera_th: any = selected['TIPO_CARRERA'];
      var canvas_th: any = canvas_url;

      var today: any = new Date();

      var dd_th: any = today.getDate();
      var mm_th: any = today.getMonth() + 1; //January is 0!
      var yyyy_th: any = today.getFullYear();

      var h_th: any = today.getHours();
      var m_th: any = today.getMinutes();
      var s_th: any = today.getSeconds();

      if (dd_th < 10) {
         dd_th = '0' + dd_th;
      }
      if (mm_th < 10) {
         mm_th = '0' + mm_th;
      }
      if (h_th < 10) {
         h_th = '0' + h_th;
      }
      if (m_th < 10) {
         m_th = '0' + m_th;
      }
      if (s_th < 10) {
         s_th = '0' + s_th;
      }

      var fecha_th: any = dd_th + '-' + mm_th + '-' + yyyy_th;
      var hora_th: any = h_th + ":" + m_th + ":" + s_th;

      // console.log(fecha_th);
      // console.log(hora_th);

      const dd = {
         pageMargins: [20, 170, 20, 20],
         pageSize: 'LETTER',
         pageOrientation: 'landscape',
         header: function (currentPage, pageCount) {

            return {

               table: {
                  // '100, 500, 132'
                  widths: [10, '*', 10, '*', '*', '*', '*', 10, '*', 10], // ancho de las columnas
                  body: [
                     [
                        { text: ' ', border: [true, true, false, false] },
                        { image: canvas_th, rowSpan: 7, margin: [10, 12, 0, 0], border: [false, true, false, true] },
                        { text: ' ', border: [false, true, false, false] },
                        { text: ' ', border: [false, true, false, false] },
                        { text: ' ', border: [false, true, false, false] },
                        { text: ' ', border: [false, true, false, false] },
                        { text: ' ', border: [false, true, false, false] },
                        { text: ' ', border: [false, true, false, false] },
                        { text: ' ', border: [false, true, false, false] },
                        { text: ' ', border: [false, true, true, false] }
                     ],
                     [
                        { text: ' ', border: [true, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, true, false] },
                     ],
                     [
                        { text: ' ', border: [true, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: 'Matrícula de Alumnos Nuevos', colSpan: 4, rowSpan: 2, style: ['center'], fontSize: 20, margin: [0, 5, 0, 0], border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: 'Página: ' + currentPage.toString() + ' de ' + pageCount, style: ['tam_10'], border: [false, false, false, false] },
                        { text: ' ', border: [false, false, true, false] }
                     ],
                     [
                        { text: ' ', border: [true, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: 'Fecha: ' + fecha_th, style: ['tam_10'], border: [false, false, false, false] },
                        { text: ' ', border: [false, false, true, false] }
                     ],
                     [
                        { text: ' ', border: [true, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: 'Año: ' + anio_th + ', Sede: ' + sede_th + ', Tipo de Carrera: ' + carrera_th, colSpan: 4, style: ['center'], border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: 'Hora: ' + hora_th, style: ['tam_10'], border: [false, false, false, false] },
                        { text: ' ', border: [false, false, true, false] }
                     ],
                     [
                        { text: ' ', border: [true, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, true, false] }
                     ],
                     [
                        { text: ' ', border: [true, false, false, true] },
                        { text: ' ', border: [false, false, false, true] },
                        { text: ' ', border: [false, false, false, true] },
                        { text: ' ', border: [false, false, false, true] },
                        { text: ' ', border: [false, false, false, true] },
                        { text: ' ', border: [false, false, false, true] },
                        { text: ' ', border: [false, false, false, true] },
                        { text: ' ', border: [false, false, false, true] },
                        { text: ' ', border: [false, false, false, true] },
                        { text: ' ', border: [false, false, true, true] }
                     ]
                  ]
               },
               style: 'bodyHeader'
            }
         },
         content: [
            { // tabla
               table: {
                  widths: [20, 98, 80, 50, 80, 50, 60, 80, 30, 50, 54], // ancho de las columnas
                  headerRows: 2,
                  dontBreakRows: true,
                  body: body,
               },
               style: 'tabla'
            }
         ],
         styles: {

            tableHeader: {
               fontSize: 10,
               bold: true,
               alignment: 'center',
               fillColor: '#96A8B9',
               margin: [0, 0, 0, 0]
            },
            bodyHeader: {
               fillColor: '',
               margin: [20, 20, 20, 0]
            },
            tabla: {
               margin: [0, 0, 0, 0]
            },
            titulo: {
               fontSize: 20,
               bold: true,
               alignment: 'center',
               margin: [0, 20, 0, 20]
            },
            numeros: {
               fontSize: 10,
               alignment: 'center',
               margin: [0, 0, 0, 0]
            },
            tam_10: {
               fontSize: 10
            },
            left: {
               alignment: 'left'
            },
            center: {
               alignment: 'center'
            },
            justify: {
               alignment: 'justify'
            },
            right: {
               alignment: 'right'
            },
            tfoot: {
               margin: [20, 0, 0, 0]
            },
            bold: {
               bold: true
            },
            bg_azul: {
               fillColor: '#96A8B9'
            },
            bg_celeste: {
               fillColor: '#C7D1DA'
            },
            zebra: {
               fillColor: '#E5EDFA'
            },
            subheader: {
               fontSize: 12,
               bold: true,
               alignment: 'center',
               margin: [0, 0, 0, 0]
            },
            red: {
               fillColor: '#FF0000'
            },
            orange: {
               fillColor: '#FF6600'
            },
            yellow: {
               fillColor: '#FFCC00'
            },
            green: {
               fillColor: '#006600'
            },
            white: {
               color: 'white'
            }
         }
      };

      pdfMake.createPdf(dd).download('MatriculaNuevos.pdf');

   }

   generarAntiguos(data, selected, canvas_url) {

      const headers = {
         fila_0: {
            col_1: { text: '#', style: 'tableHeader' },
            col_2: { text: 'CARRERA', style: 'tableHeader' },
            col_3: { text: 'ANTIGUOS', style: 'tableHeader' },
            col_4: { text: 'ESPERADOS', style: 'tableHeader' },
         }
      };

      const body = [];

      //meter los headers al body
      for (var key in headers) {
         if (headers.hasOwnProperty(key)) {
            const header = headers[key];
            var row = new Array();
            row.push(header.col_1);
            row.push(header.col_2);
            row.push(header.col_3);
            row.push(header.col_4);
            body.push(row);
         }
      }

      var col_1;
      var col_2;
      var col_3;
      var col_4;

      var nombre_facultad;

      var numero;
      var carrera;
      var antiguos;
      var esperados;

      var st_antiguos;
      var st_esperados;

      var t_antiguos;
      var t_esperados;

      var i = 1;

      // iterar facultades
      data['FACULTADES'].forEach((element) => {

         // console.log('NOMBRE FAC: ', element.FACULTAD);
         nombre_facultad = element.FACULTAD;

         col_1 = { text: nombre_facultad, style: ['tam_10', 'bold', 'bg_celeste'], colSpan: 4 };

         const row1 = new Array();

         row1.push(col_1);
         row1.push(col_2);
         row1.push(col_3);
         row1.push(col_4);
         body.push(row1);

         // iterar carreras
         element.CARRERAS.forEach((ele) => {

            /*
            console.log(i);
            console.log('CARRERA: ', ele.CC + ' - ' + ele.CARRERA);
            console.log('ANTIGUOS: ', ele.ANTIGUOS);
            console.log('ESPERADOS: ', ele.ESPERADOS);
            */

            numero = i;
            carrera = ele.CC + ' - ' + ele.CARRERA;
            antiguos = ele.ANTIGUOS;
            esperados = ele.ESPERADOS;

            col_1 = { text: numero, style: ['numeros', 'bg_azul'] };

            if (i % 2 == 1) {
               col_2 = { text: carrera, style: ['tam_10', 'left', 'zebra'] };
               col_3 = { text: antiguos, style: ['numeros', 'zebra'] };
               col_4 = { text: esperados, style: ['numeros', 'zebra'] };
            }
            else {
               col_2 = { text: carrera, style: ['tam_10', 'left'] };
               col_3 = { text: antiguos, style: ['numeros'] };
               col_4 = { text: esperados, style: ['numeros'] };
            }

            i++;

            const row2 = new Array();

            row2.push(col_1);
            row2.push(col_2);
            row2.push(col_3);
            row2.push(col_4);
            body.push(row2);

         });

         // SUBTOTAL de cada facultad
         /*
         console.log('ST ANTIGUOS: ', element.SUBTOTAL.ANTIGUOS);
         console.log('ST ESPERADOS: ', element.SUBTOTAL.ESPERADOS);
         */

         st_antiguos = element.SUBTOTAL.ANTIGUOS;
         st_esperados = element.SUBTOTAL.ESPERADOS;

         col_1 = { text: 'SUBTOTAL', style: ['tam_10', 'bold', 'right', 'bg_celeste'], colSpan: 2 };
         col_3 = { text: st_antiguos, style: ['numeros', 'bold', 'bg_celeste'] };
         col_4 = { text: st_esperados, style: ['numeros', 'bold', 'bg_celeste'] };

         const row3 = new Array();

         row3.push(col_1);
         row3.push(col_2);
         row3.push(col_3);
         row3.push(col_4);
         body.push(row3);

      });

      // TOTAL
      /*
      console.log('T ANTIGUOS :', data['TOTAL'].ANTIGUOS);
      console.log('T ESPERADOS:', data['TOTAL'].ESPERADOS);
      */

      t_antiguos = data['TOTAL'].ANTIGUOS;
      t_esperados = data['TOTAL'].ESPERADOS;

      col_1 = { text: 'TOTAL', style: ['tam_10', 'bold', 'right', 'bg_azul'], colSpan: 2 };
      col_3 = { text: t_antiguos, style: ['numeros', 'bold', 'bg_azul'] };
      col_4 = { text: t_esperados, style: ['numeros', 'bold', 'bg_azul'] };

      const row4 = new Array();

      row4.push(col_1);
      row4.push(col_2);
      row4.push(col_3);
      row4.push(col_4);
      body.push(row4);

      var anio_th: any = selected['ANIO'];
      var sede_th: any = selected['SEDE'];
      var carrera_th: any = selected['TIPO_CARRERA'];
      var canvas_th: any = canvas_url;

      var today: any = new Date();

      var dd_th: any = today.getDate();
      var mm_th: any = today.getMonth() + 1; //January is 0!
      var yyyy_th: any = today.getFullYear();

      var h_th: any = today.getHours();
      var m_th: any = today.getMinutes();
      var s_th: any = today.getSeconds();

      if (dd_th < 10) {
         dd_th = '0' + dd_th;
      }
      if (mm_th < 10) {
         mm_th = '0' + mm_th;
      }
      if (h_th < 10) {
         h_th = '0' + h_th;
      }
      if (m_th < 10) {
         m_th = '0' + m_th;
      }
      if (s_th < 10) {
         s_th = '0' + s_th;
      }

      var fecha_th: any = dd_th + '-' + mm_th + '-' + yyyy_th;
      var hora_th: any = h_th + ":" + m_th + ":" + s_th;

      // console.log(fecha_th);
      // console.log(hora_th);


      const dd = {
         pageMargins: [20, 170, 20, 20],
         pageSize: 'LETTER',
         pageOrientation: 'landscape',
         header: function (currentPage, pageCount) {

            return {

               table: {
                  // '100, 500, 132'
                  widths: [10, '*', 10, '*', '*', '*', '*', 10, '*', 10], // ancho de las columnas
                  body: [
                     [
                        { text: ' ', border: [true, true, false, false] },
                        { image: canvas_th, rowSpan: 7, margin: [10, 12, 0, 0], border: [false, true, false, true] },
                        { text: ' ', border: [false, true, false, false] },
                        { text: ' ', border: [false, true, false, false] },
                        { text: ' ', border: [false, true, false, false] },
                        { text: ' ', border: [false, true, false, false] },
                        { text: ' ', border: [false, true, false, false] },
                        { text: ' ', border: [false, true, false, false] },
                        { text: ' ', border: [false, true, false, false] },
                        { text: ' ', border: [false, true, true, false] }
                     ],
                     [
                        { text: ' ', border: [true, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, true, false] },
                     ],
                     [
                        { text: ' ', border: [true, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: 'Matrícula de Alumnos Antiguos', colSpan: 4, rowSpan: 2, style: ['center'], fontSize: 20, margin: [0, 5, 0, 0], border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: 'Página: ' + currentPage.toString() + ' de ' + pageCount, style: ['tam_10'], border: [false, false, false, false] },
                        { text: ' ', border: [false, false, true, false] }
                     ],
                     [
                        { text: ' ', border: [true, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: 'Fecha: ' + fecha_th, style: ['tam_10'], border: [false, false, false, false] },
                        { text: ' ', border: [false, false, true, false] }
                     ],
                     [
                        { text: ' ', border: [true, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: 'Año: ' + anio_th + ', Sede: ' + sede_th + ', Tipo de Carrera: ' + carrera_th, colSpan: 4, style: ['center'], border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: 'Hora: ' + hora_th, style: ['tam_10'], border: [false, false, false, false] },
                        { text: ' ', border: [false, false, true, false] }
                     ],
                     [
                        { text: ' ', border: [true, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, true, false] }
                     ],
                     [
                        { text: ' ', border: [true, false, false, true] },
                        { text: ' ', border: [false, false, false, true] },
                        { text: ' ', border: [false, false, false, true] },
                        { text: ' ', border: [false, false, false, true] },
                        { text: ' ', border: [false, false, false, true] },
                        { text: ' ', border: [false, false, false, true] },
                        { text: ' ', border: [false, false, false, true] },
                        { text: ' ', border: [false, false, false, true] },
                        { text: ' ', border: [false, false, false, true] },
                        { text: ' ', border: [false, false, true, true] }
                     ]
                  ]
               },
               style: 'bodyHeader'
            }
         },
         content: [
            { // tabla
               table: {
                  widths: [20, 455, 120, 120], // ancho de las columnas
                  headerRows: 1,
                  dontBreakRows: true,
                  body: body,
               },
               style: 'tabla'
            }
         ],
         styles: {

            tableHeader: {
               fontSize: 10,
               bold: true,
               alignment: 'center',
               fillColor: '#96A8B9',
               margin: [0, 0, 0, 0]
            },
            bodyHeader: {
               fillColor: '',
               margin: [20, 20, 20, 0]
            },
            tabla: {
               margin: [0, 0, 0, 0]
            },
            titulo: {
               fontSize: 20,
               bold: true,
               alignment: 'center',
               margin: [0, 20, 0, 20]
            },
            numeros: {
               fontSize: 10,
               alignment: 'center',
               margin: [0, 0, 0, 0]
            },
            tam_10: {
               fontSize: 10
            },
            left: {
               alignment: 'left'
            },
            center: {
               alignment: 'center'
            },
            justify: {
               alignment: 'justify'
            },
            right: {
               alignment: 'right'
            },
            tfoot: {
               margin: [20, 0, 0, 0]
            },
            bold: {
               bold: true
            },
            bg_azul: {
               fillColor: '#96A8B9'
            },
            bg_celeste: {
               fillColor: '#C7D1DA'
            },
            zebra: {
               fillColor: '#E5EDFA'
            },
            subheader: {
               fontSize: 12,
               bold: true,
               alignment: 'center',
               margin: [0, 0, 0, 0]
            }
         }
      };

      pdfMake.createPdf(dd).download('MatriculaAntiguos.pdf');
   }

   generarTotal(data, selected, canvas_url) {

      const headers = {
         fila_0: {
            col_1: { text: '#', rowSpan: 2, style: 'tableHeader' },
            col_2: { text: 'CARRERA', rowSpan: 2, style: 'tableHeader' },
            col_3: { text: 'NUEVOS', colSpan: 3, style: 'tableHeader' },
            col_6: { text: 'ANTIGUOS', rowSpan: 2, style: 'tableHeader' },
            col_7: { text: 'MATRICULA TOTAL', rowSpan: 2, style: 'tableHeader' }
         },
         fila_1: {
            col_1: { text: '1' },
            col_2: { text: '2' },
            col_3: { text: 'INGRESO ADMISION', style: 'tableHeader' },
            col_4: { text: 'OTROS INGRESOS', style: 'tableHeader' },
            col_5: { text: 'TOTAL', style: 'tableHeader' },
            col_6: { text: '6' },
            col_7: { text: '7' }
         }
      };

      const body = [];

      //meter los headers al body
      for (var key in headers) {
         if (headers.hasOwnProperty(key)) {
            const header = headers[key];
            var row = new Array();
            row.push(header.col_1);
            row.push(header.col_2);
            row.push(header.col_3);
            row.push(header.col_4);
            row.push(header.col_5);
            row.push(header.col_6);
            row.push(header.col_7);
            body.push(row);
         }
      }

      var col_1;
      var col_2;
      var col_3;
      var col_4;
      var col_5;
      var col_6;
      var col_7;

      var nombre_facultad;

      var numero;
      var carrera;
      var ingreso_admision;
      var otros_ingresos;
      var total;
      var antiguos;
      var matricula_total;

      var st_ingreso_admision;
      var st_otros_ingresos;
      var st_total;
      var st_antiguos;
      var st_matricula_total;

      var t_ingreso_admision;
      var t_otros_ingresos;
      var t_total;
      var t_antiguos;
      var t_matricula_total;

      var i = 1;

      // iterar facultades
      data['FACULTADES'].forEach((element) => {

         // console.log('NOMBRE FAC: ', element.FACULTAD);
         nombre_facultad = element.FACULTAD;

         col_1 = { text: nombre_facultad, style: ['tam_10', 'bold', 'bg_celeste'], colSpan: 7 };

         const row1 = new Array();

         row1.push(col_1);
         row1.push(col_2);
         row1.push(col_3);
         row1.push(col_4);
         row1.push(col_5);
         row1.push(col_6);
         row1.push(col_7);
         body.push(row1);

         // iterar carreras
         element.CARRERAS.forEach((ele) => {

            /*
            console.log(i);
            console.log('CARRERA: ', ele.CC + ' - ' + ele.CARRERA);
            console.log('INGRESO ADMISION: ', ele.INGRESO_ADMISION);
            console.log('OTROS INGRESOS: ', ele.OTROS_INGRESOS);
            console.log('TOTAL: ', ele.TOTAL_NUEVOS);
            console.log('ANTIGUOS: ', ele.ANTIGUOS);
            console.log('MATRICULA TOTAL: ', ele.TOTAL);
            */

            numero = i;
            carrera = ele.CC + ' - ' + ele.CARRERA;
            ingreso_admision = ele.INGRESO_ADMISION;
            otros_ingresos = ele.OTROS_INGRESOS;
            total = ele.TOTAL_NUEVOS;
            antiguos = ele.ANTIGUOS;
            matricula_total = ele.TOTAL;

            col_1 = { text: numero, style: ['numeros', 'bg_azul'] };

            if (i % 2 == 1) {

               col_2 = { text: carrera, style: ['tam_10', 'left', 'zebra'] };
               col_3 = { text: ingreso_admision, style: ['numeros', 'zebra'] };
               col_4 = { text: otros_ingresos, style: ['numeros', 'zebra'] };
               col_5 = { text: total, style: ['numeros', 'zebra'] };
               col_6 = { text: antiguos, style: ['numeros', 'zebra'] };
               col_7 = { text: matricula_total, style: ['numeros', 'zebra'] };

            }

            else {
               col_2 = { text: carrera, style: ['tam_10', 'left'] };
               col_3 = { text: ingreso_admision, style: ['numeros'] };
               col_4 = { text: otros_ingresos, style: ['numeros'] };
               col_5 = { text: total, style: ['numeros'] };
               col_6 = { text: antiguos, style: ['numeros'] };
               col_7 = { text: matricula_total, style: ['numeros'] };
            }

            i++;

            const row2 = new Array();

            row2.push(col_1);
            row2.push(col_2);
            row2.push(col_3);
            row2.push(col_4);
            row2.push(col_5);
            row2.push(col_6);
            row2.push(col_7);
            body.push(row2);


         });

         // SUBTOTAL de cada facultad
         /*
         console.log('ST INGRESO ADMISION: ', element.SUBTOTAL.INGRESO_ADMISION);
         console.log('ST OTROS INGRESOS: ', element.SUBTOTAL.OTROS_INGRESOS);
         console.log('ST TOTAL: ', element.SUBTOTAL.TOTAL_NUEVOS);
         console.log('ST ANTIGUOS: ', element.SUBTOTAL.ANTIGUOS);
         console.log('ST MATRICULA TOTAL: ', element.SUBTOTAL.TOTAL);
         */

         st_ingreso_admision = element.SUBTOTAL.INGRESO_ADMISION;
         st_otros_ingresos = element.SUBTOTAL.OTROS_INGRESOS;
         st_total = element.SUBTOTAL.TOTAL_NUEVOS;
         st_antiguos = element.SUBTOTAL.ANTIGUOS;
         st_matricula_total = element.SUBTOTAL.TOTAL;

         col_1 = { text: 'SUBTOTAL', style: ['tam_10', 'bold', 'right', 'bg_celeste'], colSpan: 2 };
         col_3 = { text: st_ingreso_admision, style: ['numeros', 'bold', 'bg_celeste'] };
         col_4 = { text: st_otros_ingresos, style: ['numeros', 'bold', 'bg_celeste'] };
         col_5 = { text: st_total, style: ['numeros', 'bold', 'bg_celeste'] };
         col_6 = { text: st_antiguos, style: ['numeros', 'bold', 'bg_celeste'] };
         col_7 = { text: st_matricula_total, style: ['numeros', 'bold', 'bg_celeste'] };

         const row3 = new Array();

         row3.push(col_1);
         row3.push(col_2);
         row3.push(col_3);
         row3.push(col_4);
         row3.push(col_5);
         row3.push(col_6);
         row3.push(col_7);
         body.push(row3);

      });

      // TOTAL
      /*
      console.log('T INGRESO ADMISION :', data['TOTAL'].INGRESO_ADMISION);
      console.log('T OTROS INGRESOS :', data['TOTAL'].OTROS_INGRESOS);
      console.log('T TOTAL :', data['TOTAL'].TOTAL_NUEVOS);
      console.log('T ANTIGUOS :', data['TOTAL'].ANTIGUOS);
      console.log('T MATRICULA TOTAL :', data['TOTAL'].TOTAL);
      */

      t_ingreso_admision = data['TOTAL'].INGRESO_ADMISION;
      t_otros_ingresos = data['TOTAL'].OTROS_INGRESOS;
      t_total = data['TOTAL'].TOTAL_NUEVOS;
      t_antiguos = data['TOTAL'].ANTIGUOS;
      t_matricula_total = data['TOTAL'].TOTAL;

      col_1 = { text: 'TOTAL', style: ['tam_10', 'bold', 'right', 'bg_azul'], colSpan: 2 };
      col_3 = { text: t_ingreso_admision, style: ['numeros', 'bold', 'bg_azul'] };
      col_4 = { text: t_otros_ingresos, style: ['numeros', 'bold', 'bg_azul'] };
      col_5 = { text: t_total, style: ['numeros', 'bold', 'bg_azul'] };
      col_6 = { text: t_antiguos, style: ['numeros', 'bold', 'bg_azul'] };
      col_7 = { text: t_matricula_total, style: ['numeros', 'bold', 'bg_azul'] };

      const row4 = new Array();

      row4.push(col_1);
      row4.push(col_2);
      row4.push(col_3);
      row4.push(col_4);
      row4.push(col_5);
      row4.push(col_6);
      row4.push(col_7);
      body.push(row4);

      var anio_th: any = selected['ANIO'];
      var sede_th: any = selected['SEDE'];
      var carrera_th: any = selected['TIPO_CARRERA'];
      var canvas_th: any = canvas_url;

      var today: any = new Date();

      var dd_th: any = today.getDate();
      var mm_th: any = today.getMonth() + 1; //January is 0!
      var yyyy_th: any = today.getFullYear();

      var h_th: any = today.getHours();
      var m_th: any = today.getMinutes();
      var s_th: any = today.getSeconds();

      if (dd_th < 10) {
         dd_th = '0' + dd_th;
      }
      if (mm_th < 10) {
         mm_th = '0' + mm_th;
      }
      if (h_th < 10) {
         h_th = '0' + h_th;
      }
      if (m_th < 10) {
         m_th = '0' + m_th;
      }
      if (s_th < 10) {
         s_th = '0' + s_th;
      }

      var fecha_th: any = dd_th + '-' + mm_th + '-' + yyyy_th;
      var hora_th: any = h_th + ":" + m_th + ":" + s_th;

      // console.log(fecha_th);
      // console.log(hora_th);


      const dd = {
         pageMargins: [20, 170, 20, 20],
         pageSize: 'LETTER',
         pageOrientation: 'landscape',
         header: function (currentPage, pageCount) {

            return {

               table: {
                  // '100, 500, 132'
                  widths: [10, '*', 10, '*', '*', '*', '*', 10, '*', 10], // ancho de las columnas
                  body: [
                     [
                        { text: ' ', border: [true, true, false, false] },
                        { image: canvas_th, rowSpan: 7, margin: [10, 12, 0, 0], border: [false, true, false, true] },
                        { text: ' ', border: [false, true, false, false] },
                        { text: ' ', border: [false, true, false, false] },
                        { text: ' ', border: [false, true, false, false] },
                        { text: ' ', border: [false, true, false, false] },
                        { text: ' ', border: [false, true, false, false] },
                        { text: ' ', border: [false, true, false, false] },
                        { text: ' ', border: [false, true, false, false] },
                        { text: ' ', border: [false, true, true, false] }
                     ],
                     [
                        { text: ' ', border: [true, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, true, false] },
                     ],
                     [
                        { text: ' ', border: [true, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: 'Matrícula Total de Alumnos', colSpan: 4, rowSpan: 2, style: ['center'], fontSize: 20, margin: [0, 5, 0, 0], border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: 'Página: ' + currentPage.toString() + ' de ' + pageCount, style: ['tam_10'], border: [false, false, false, false] },
                        { text: ' ', border: [false, false, true, false] }
                     ],
                     [
                        { text: ' ', border: [true, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: 'Fecha: ' + fecha_th, style: ['tam_10'], border: [false, false, false, false] },
                        { text: ' ', border: [false, false, true, false] }
                     ],
                     [
                        { text: ' ', border: [true, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: 'Año: ' + anio_th + ', Sede: ' + sede_th + ', Tipo de Carrera: ' + carrera_th, colSpan: 4, style: ['center'], border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: 'Hora: ' + hora_th, style: ['tam_10'], border: [false, false, false, false] },
                        { text: ' ', border: [false, false, true, false] }
                     ],
                     [
                        { text: ' ', border: [true, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, false, false] },
                        { text: ' ', border: [false, false, true, false] }
                     ],
                     [
                        { text: ' ', border: [true, false, false, true] },
                        { text: ' ', border: [false, false, false, true] },
                        { text: ' ', border: [false, false, false, true] },
                        { text: ' ', border: [false, false, false, true] },
                        { text: ' ', border: [false, false, false, true] },
                        { text: ' ', border: [false, false, false, true] },
                        { text: ' ', border: [false, false, false, true] },
                        { text: ' ', border: [false, false, false, true] },
                        { text: ' ', border: [false, false, false, true] },
                        { text: ' ', border: [false, false, true, true] }
                     ]
                  ]
               },
               style: 'bodyHeader'
            }
         },
         content: [
            { // tabla
               table: {
                  widths: [20, 267, 100, 100, 50, 50, 100], // ancho de las columnas
                  headerRows: 2,
                  dontBreakRows: true,
                  body: body,
               },
               style: 'tabla'
            }
         ],
         styles: {

            tableHeader: {
               fontSize: 10,
               bold: true,
               alignment: 'center',
               fillColor: '#96A8B9',
               margin: [0, 0, 0, 0]
            },
            bodyHeader: {
               fillColor: '',
               margin: [20, 20, 20, 0]
            },
            tabla: {
               margin: [0, 0, 0, 0]
            },
            titulo: {
               fontSize: 20,
               bold: true,
               alignment: 'center',
               margin: [0, 20, 0, 20]
            },
            numeros: {
               fontSize: 10,
               alignment: 'center',
               margin: [0, 0, 0, 0]
            },
            tam_10: {
               fontSize: 10
            },
            left: {
               alignment: 'left'
            },
            center: {
               alignment: 'center'
            },
            justify: {
               alignment: 'justify'
            },
            right: {
               alignment: 'right'
            },
            tfoot: {
               margin: [20, 0, 0, 0]
            },
            bold: {
               bold: true
            },
            bg_azul: {
               fillColor: '#96A8B9'
            },
            bg_celeste: {
               fillColor: '#C7D1DA'
            },
            zebra: {
               fillColor: '#E5EDFA'
            },
            subheader: {
               fontSize: 12,
               bold: true,
               alignment: 'center',
               margin: [0, 0, 0, 0]
            }
         }
      };

      pdfMake.createPdf(dd).download('MatriculaTotal.pdf');
   }

}
