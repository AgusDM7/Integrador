"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controlador_1 = require("./controlador/controlador");
const router = express_1.Router();
// Rutas para gestionar pedidos de venta
router.get("/buscarPedido/:id", controlador_1.buscarPedidoVenta);
router.post("/crearPedido", controlador_1.crearPedidoVenta);
router.put("/modificarPedido", controlador_1.modificarPedidoVenta);
router.delete("/eliminarPedido/:id", controlador_1.eliminarPedidoVenta);
exports.default = router;
