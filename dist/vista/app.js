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
var _a, _b, _c;
const express = require('express');
const cors = require('cors');
const app = express();
const API_URL = 'http://localhost:3000'; // Asegúrate de que esta URL coincida con la del backend
// Función para cargar los pedidos en la tabla
const cargarPedidos = async () => {
    try {
        const response = await fetch(`${API_URL}/buscarPedido`);
        if (!response.ok) {
            throw new Error('Error al cargar los pedidos');
        }
        const pedidos = await response.json();
        const tablaBody = document.getElementById('tablaBody');
        tablaBody.innerHTML = '';
        
        if (pedidos.length === 0) {
            tablaBody.innerHTML = '<tr><td colspan="4">No hay pedidos disponibles</td></tr>';
            return;
        }

        pedidos.forEach((pedido) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${pedido.nroComprobante}</td>
                <td>${pedido.idcliente}</td>
                <td>${pedido.fechaPedido}</td>
                <td>
                    <button onclick="editarPedido(${pedido.id})">Editar</button>
                    <button onclick="eliminarPedido(${pedido.id})">Eliminar</button>
                </td>
            `;
            tablaBody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar los pedidos');
    }
};
const editarPedido = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${API_URL}/buscarPedido/${id}`);
    const pedido = yield response.json();
    if (pedido) {
        document.getElementById('id').value = pedido.id;
        document.getElementById('idcliente').value = pedido.idcliente;
        document.getElementById('fechaPedido').value = pedido.fechaPedido;
        document.getElementById('nroComprobante').value = pedido.nroComprobante;
        document.getElementById('formaPago').value = pedido.formaPago;
        document.getElementById('observaciones').value = pedido.observaciones;
        document.getElementById('totalPedido').value = pedido.totalPedido;
    }
    else {
        alert('Pedido no encontrado');
    }
});
// Función para crear o editar un pedido
const manejarFormulario = (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    event.preventDefault();
    const id = (_d = document.getElementById('id')) === null || _d === void 0 ? void 0 : _d.value;
    const idcliente = document.getElementById('idcliente').value;
    const fechaPedido = document.getElementById('fechaPedido').value;
    const nroComprobante = document.getElementById('nroComprobante').value;
    const formaPago = document.getElementById('formaPago').value;
    const observaciones = document.getElementById('observaciones').value;
    const totalPedido = document.getElementById('totalPedido').value;
    const pedido = {
        id,
        idcliente,
        fechaPedido,
        nroComprobante,
        formaPago,
        observaciones,
        totalPedido,
    };
    let response;
    if (id) { // Si el id existe, modificamos el pedido
        response = yield fetch(`${API_URL}/modificarPedido`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pedido),
        });
    }
    else { // Si no hay id, creamos un nuevo pedido
        response = yield fetch(`${API_URL}/crearPedido`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pedido),
        });
    }
    const result = yield response.json();
    alert(result.message);
    cargarPedidos(); // Refrescar la lista de pedidos
    document.getElementById('pedidoForm').reset(); // Resetear el formulario
});
// Función para generar PDF (placeholder para la lógica de generación de PDF)
const generarPDF = () => __awaiter(void 0, void 0, void 0, function* () {
    alert("Generando PDF del pedido de venta...");
    // Implementar lógica para generar PDF (puedes usar una librería como jsPDF)
});
// Función para manejar la búsqueda de pedidos
const manejarBusqueda = (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const nroComprobante = document.getElementById('searchNroComprobante').value;
    const fechaDesde = document.getElementById('searchFechaDesde').value;
    const fechaHasta = document.getElementById('searchFechaHasta').value;
    const queryParams = new URLSearchParams({
        nroComprobante,
        fechaDesde,
        fechaHasta,
    });
    const response = yield fetch(`${API_URL}/buscarPedido?${queryParams}`);
    const pedidos = yield response.json();
    const tablaBody = document.getElementById('tablaBody');
    tablaBody.innerHTML = '';
    pedidos.forEach((pedido) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
      <td>${pedido.nroComprobante}</td>
      <td>${pedido.cliente}</td>
      <td>${pedido.fechaPedido}</td>
      <td>
        <button onclick="editarPedido(${pedido.id})">Editar</button>
        <button onclick="eliminarPedido(${pedido.id})">Eliminar</button>
      </td>
    `;
        tablaBody.appendChild(tr);
    });
});
// Asignar eventos
(_a = document.getElementById('pedidoForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', manejarFormulario);
(_b = document.getElementById('searchForm')) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', manejarBusqueda);
(_c = document.getElementById('generatePDF')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', generarPDF);
// Cargar los pedidos al iniciar la página
cargarPedidos();
