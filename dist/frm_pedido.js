"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Obtener lista de pedidos desde el backend
function getPedidosJSON() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:3000/pedidos");
        const pedidos = yield response.json();
        mostrarPedidos(pedidos);
    });
}
// Mostrar pedidos en la grilla
function mostrarPedidos(pedidos) {
    const tablaPedidos = document.getElementById("tablaPedidos");
    tablaPedidos.innerHTML = ""; // Limpiar tabla
    pedidos.forEach((pedido) => {
        const fila = tablaPedidos.insertRow();
        fila.insertCell().textContent = pedido.id;
        fila.insertCell().textContent = pedido.nroComprobante;
        fila.insertCell().textContent = pedido.cliente;
        fila.insertCell().textContent = pedido.formaPago;
        fila.insertCell().textContent = pedido.totalPedido;
        fila.insertCell().textContent = pedido.fechaPedido;
        // Botón para editar
        const botonEditar = document.createElement("button");
        botonEditar.textContent = "Editar";
        botonEditar.onclick = () => cargarPedidoEnFormulario(pedido);
        fila.insertCell().appendChild(botonEditar);
        // Botón para eliminar
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.onclick = () => eliminarPedido(pedido.id);
        fila.insertCell().appendChild(botonEliminar);
    });
}
// Cargar datos de un pedido en el formulario para editar
function cargarPedidoEnFormulario(pedido) {
    document.getElementById("pedidoID").value = pedido.id;
    document.getElementById("pedidoNroComprobante").value = pedido.nroComprobante;
    document.getElementById("pedidoCliente").value = pedido.idcliente;
    document.getElementById("pedidoFormaPago").value = pedido.formaPago;
    document.getElementById("pedidoObservaciones").value = pedido.observaciones;
    document.getElementById("totalPedido").value = pedido.totalPedido;
}
// Guardar o actualizar un pedido
function insertarActualizarPedido() {
    return __awaiter(this, void 0, void 0, function* () {
        const pedidoID = document.getElementById("pedidoID");
        const pedidoNroComprobante = document.getElementById("pedidoNroComprobante");
        const pedidoCliente = document.getElementById("pedidoCliente");
        const pedidoFormaPago = document.getElementById("pedidoFormaPago");
        const pedidoObservaciones = document.getElementById("pedidoObservaciones");
        const totalPedido = document.getElementById("totalPedido");
        const detalles = []; // Aquí deberías recopilar los detalles del pedido
        const urlServer = pedidoID.value === "0"
            ? "http://localhost:3000/pedido"
            : `http://localhost:3000/pedido/${pedidoID.value}`;
        const metodo = pedidoID.value === "0" ? "POST" : "PUT";
        const datos = {
            id: parseInt(pedidoID.value),
            nroComprobante: parseInt(pedidoNroComprobante.value),
            idcliente: parseInt(pedidoCliente.value),
            formaPago: pedidoFormaPago.value,
            observaciones: pedidoObservaciones.value,
            totalPedido: parseFloat(totalPedido.value),
            detalles: detalles
        };
        const response = yield fetch(urlServer, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });
        if (response.ok) {
            alert("Pedido guardado correctamente");
            yield getPedidosJSON(); // Recargar lista de pedidos
            limpiarFormulario();
        }
        else {
            alert("Error al guardar el pedido");
        }
    });
}
// Eliminar pedido (baja lógica)
function eliminarPedido(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!confirm("¿Está seguro de eliminar este pedido?"))
            return;
        const response = yield fetch(`http://localhost:3000/pedido/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            alert("Pedido eliminado correctamente");
            yield getPedidosJSON();
        }
        else {
            alert("Error al eliminar el pedido");
        }
    });
}
// Limpiar formulario
function limpiarFormulario() {
    document.getElementById("pedidoID").value = "0";
    document.getElementById("pedidoNroComprobante").value = "";
    document.getElementById("pedidoCliente").value = "";
    document.getElementById("pedidoFormaPago").value = "";
    document.getElementById("pedidoObservaciones").value = "";
    document.getElementById("totalPedido").value = "";
}
// Inicializar la aplicación
document.addEventListener("DOMContentLoaded", () => {
    getPedidosJSON();
    const botonGuardar = document.getElementById("btnGuardar");
    botonGuardar.onclick = insertarActualizarPedido;
});
