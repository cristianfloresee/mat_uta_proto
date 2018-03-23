'use strict'

var oracledb = require('oracledb');
var pool = require('../database/pool');
var socket = require('../../index');

var object_format = { outFormat: oracledb.OBJECT };

async function getMatriculas(req, res) {
	try {
		let conn = await pool.getPool().getConnection()
		let matriculados, nuevos_matriculados, antiguos_matriculados, total_matriculas;

		if (req.url != '/orcl12c') {
			console.log("consulta API...");
			matriculados = conn.execute(
				'SELECT * FROM V_RESUMEN_MATRICULADOS_FINAL', {}, object_format
			)

			nuevos_matriculados = conn.execute(
				'SELECT * FROM V_RESUMEN_MATRICULADOS_NUEVOS_FINAL', {}, object_format
			)

			antiguos_matriculados = conn.execute(
				'SELECT * FROM V_RESUMEN_MATRICULADOS_ANTIGUOS_FINAL', {}, object_format
			)
			total_matriculas = conn.execute(
				'SELECT * FROM V_RESUMEN_MATRICULADOS_TOTAL_FINAL', {}, object_format
			)
		}
		else {
			console.log("consulta ORACLE...")
			matriculados = conn.execute(
				'SELECT * FROM V_RESUMEN_MATRICULADOS_FINAL WHERE ANIO = 2017', {}, object_format
			)

			nuevos_matriculados = conn.execute(
				'SELECT * FROM V_RESUMEN_MATRICULADOS_NUEVOS_FINAL WHERE ANIO = 2017', {}, object_format
			)

			antiguos_matriculados = conn.execute(
				'SELECT * FROM V_RESUMEN_MATRICULADOS_ANTIGUOS_FINAL WHERE ANIO = 2017', {}, object_format
			)

			total_matriculas = conn.execute(
				'SELECT * FROM V_RESUMEN_MATRICULADOS_TOTAL_FINAL WHERE ANIO = 2017', {}, object_format
			)
		}

		let results = [await matriculados, await nuevos_matriculados, await antiguos_matriculados, await total_matriculas]
		results[0] = results[0].rows;
		results[1] = results[1].rows;
		results[2] = results[2].rows;
		results[3] = results[3].rows;

		let release = await conn.release()

		//ORACLE NOTIFICATION
		if (req.url == '/orcl12c') {
			console.log("Oracle Notificaction...");
			let io = socket.getSocket()
			io.emit('change_matriculas', results) //RESPUESTA AL CLIENTE POR SOCKET
		}

		res.send(results) //RESPUESTA AL CLIENTE O DB
	}
	catch (err) {
		console.log(err)
	}
}

module.exports = {
	getMatriculas
}