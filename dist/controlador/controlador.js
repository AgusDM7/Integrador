"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarPedidoVenta = exports.modificarPedidoVenta = exports.crearPedidoVenta = exports.buscarPedidoVenta = void 0;
const mysqldb_1 = require("../mysqldb");
// Consultar un pedido de venta por número o por rango de fechas
const buscarPedidoVenta = (req, res) => {
    console.log('Buscando pedidos con parámetros:', req.query);
    const { id, idcliente, fechaPedido, nroComprobante, formaPago, observaciones, totalPedido } = req.query;
    let query = "SELECT * FROM pedido_venta WHERE 1=1";
    let values = [];
    if (nroComprobante) {
        query += " AND nroComprobante = ?";
        values.push(nroComprobante);
    }
    if (idcliente) {
        query += " AND idcliente = ?";
        values.push(idcliente);
    }
    if (id) {
        query += " AND id = ?";
        values.push(id);
    }
    if (fechaPedido) {
        query += " AND fechaPedido = ?";
        values.push(fechaPedido);
    }
    if (formaPago) {
        query += " AND formaPago = ?";
        values.push(formaPago);
    }
    if (observaciones) {
        query += " AND observaciones = ?";
        values.push(observaciones);
    }
    if (totalPedido) {
        query += " AND totalPedido = ?";
        values.push(totalPedido);
    }
    mysqldb_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        connection.query(query, values, (err, results) => {
            connection.release();
            if (err) {
                console.error('Error en la consulta:', err);
                res.status(500).send(err);
            }
            else {
                console.log('Resultados encontrados:', results.length);
                res.json(results);
            }
        });
    });
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
};
exports.buscarPedidoVenta = buscarPedidoVenta;
// Crear un nuevo pedido de venta
const crearPedidoVenta = (req, res) => {
    const { idcliente, fechaPedido, nroComprobante, formaPago, observaciones, totalPedido } = req.body;
    const values = [idcliente, fechaPedido, nroComprobante, formaPago, observaciones, totalPedido];
    mysqldb_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        const sql = "INSERT INTO pedido_venta (idcliente, fechaPedido, nroComprobante, formaPago, observaciones, totalPedido) VALUES (?, ?, ?, ?, ?, ?)";
        connection.query(sql, values, (err, results) => {
            if (err) {
                res.send({ message: "Error al intentar insertar el pedido de venta" });
            }
            else {
                res.json({ message: "Pedido de venta creado con éxito" });
            }
        });
    });
};
exports.crearPedidoVenta = crearPedidoVenta;
// Modificar un pedido de venta
const modificarPedidoVenta = (req, res) => {
    const { id, idcliente, fechaPedido, nroComprobante, formaPago, observaciones, totalPedido } = req.body;
    const values = [idcliente, fechaPedido, nroComprobante, formaPago, observaciones, totalPedido, id];
    mysqldb_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        const sql = "UPDATE pedido_venta SET idcliente = ?, fechaPedido = ?, nroComprobante = ?, formaPago = ?, observaciones = ?, totalPedido = ? WHERE id = ?";
        connection.query(sql, values, (err, results) => {
            if (err) {
                res.send({ message: "Error al intentar modificar el pedido de venta" });
            }
            else {
                res.json({ message: "Pedido de venta modificado con éxito" });
            }
        });
    });
};
exports.modificarPedidoVenta = modificarPedidoVenta;
// Eliminar un pedido de venta
const eliminarPedidoVenta = (req, res) => {
    const idPedido = parseInt(req.params.id);
    mysqldb_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        connection.query("DELETE FROM pedido_venta WHERE id = ?", [idPedido], (err, results) => {
            if (err) {
                res.send({ message: "Error al intentar eliminar el pedido de venta" });
            }
            else {
                res.json({ message: "Pedido de venta eliminado con éxito" });
            }
        });
    });
};
exports.eliminarPedidoVenta = eliminarPedidoVenta;
