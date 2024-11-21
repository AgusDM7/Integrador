import { Router } from "express";
import { buscarPedidoVenta, crearPedidoVenta, modificarPedidoVenta, eliminarPedidoVenta } from "./controlador/controlador";

const router = Router();

// Rutas para gestionar pedidos de venta
router.get("/buscarPedido/:id", buscarPedidoVenta);
router.post("/crearPedido", crearPedidoVenta);
router.put("/modificarPedido", modificarPedidoVenta);
router.delete("/eliminarPedido/:id", eliminarPedidoVenta);

export default router;
