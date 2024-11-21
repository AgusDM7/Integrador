import { Request, Response } from "express";
import path from "path";

import { cxMysql } from "../mysqldb";

// Consultar un pedido de venta por número o por rango de fechas
export const buscarPedidoVenta = (req: Request, res: Response) => {
    const { id, idcliente,fechaPedido,nroComprobante,formaPago, observaciones, totalPedido} = req.query;
    let query = "SELECT * FROM pedido_venta WHERE 1=1";
    let values: Array<any> = [];

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
        values.push(id);
    }
    if (formaPago) {
        query += " AND formaPago = ?";
        values.push(id);
    }
    if (observaciones) {
        query += " AND observaciones = ?";
        values.push(id);
    }
    if (totalPedido) {
        query += " AND totalPedido = ?";
        values.push(id);
    }

    cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        connection.query(query, values, (err, results) => {
            if (err) {
                res.send(err);
            } else {
                res.json(results);
            }
        });
    });
};


// Crear un nuevo pedido de venta
export const crearPedidoVenta = (req: Request, res: Response) => {
    const { idcliente, fechaPedido, nroComprobante, formaPago, observaciones, totalPedido } = req.body;
    const values = [idcliente, fechaPedido, nroComprobante, formaPago, observaciones, totalPedido];

    cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        const sql = "INSERT INTO pedido_venta (idcliente, fechaPedido, nroComprobante, formaPago, observaciones, totalPedido) VALUES (?, ?, ?, ?, ?, ?)";
        connection.query(sql, values, (err, results) => {
            if (err) {
                res.send({ message: "Error al intentar insertar el pedido de venta" });
            } else {
                res.json({ message: "Pedido de venta creado con éxito" });
            }
        });
    });
};

// Modificar un pedido de venta
export const modificarPedidoVenta = (req: Request, res: Response) => {
    const { id, idcliente, fechaPedido, nroComprobante, formaPago, observaciones, totalPedido } = req.body;
    const values = [idcliente, fechaPedido, nroComprobante, formaPago, observaciones, totalPedido, id];

    cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        const sql = "UPDATE pedido_venta SET idcliente = ?, fechaPedido = ?, nroComprobante = ?, formaPago = ?, observaciones = ?, totalPedido = ? WHERE id = ?";
        connection.query(sql, values, (err, results) => {
            if (err) {
                res.send({ message: "Error al intentar modificar el pedido de venta" });
            } else {
                res.json({ message: "Pedido de venta modificado con éxito" });
            }
        });
    });
};

// Eliminar un pedido de venta
export const eliminarPedidoVenta = (req: Request, res: Response) => {
    const idPedido = parseInt(req.params.id);

    cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        connection.query("DELETE FROM pedido_venta WHERE id = ?", [idPedido], (err, results) => {
            if (err) {
                res.send({ message: "Error al intentar eliminar el pedido de venta" });
            } else {
                res.json({ message: "Pedido de venta eliminado con éxito" });
            }
        });
    });
};
