const express = require('express');
const cors = require('cors');
const app = express();

const API_URL = 'http://localhost:3000';  // Asegúrate de que esta URL coincida con la del backend



// Función para cargar los pedidos en la tabla
const cargarPedidos = async () => {
    const response = await fetch(`${API_URL}/buscarPedido`);
    const pedidos = await response.json();
    const tablaBody = document.getElementById('tablaBody')!;
    tablaBody.innerHTML = '';


    pedidos.forEach((pedido: any) => {
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
};

const editarPedido = async (id: number) => {
    const response = await fetch(`${API_URL}/buscarPedido/${id}`);
    const pedido = await response.json();

    if (pedido) {
        (document.getElementById('id') as HTMLInputElement).value = pedido.id;
        (document.getElementById('idcliente') as HTMLInputElement).value = pedido.idcliente;
        (document.getElementById('fechaPedido') as HTMLInputElement).value = pedido.fechaPedido;
        (document.getElementById('nroComprobante') as HTMLInputElement).value = pedido.nroComprobante;
        (document.getElementById('formaPago') as HTMLInputElement).value = pedido.formaPago;
        (document.getElementById('observaciones') as HTMLTextAreaElement).value = pedido.observaciones;
        (document.getElementById('totalPedido') as HTMLInputElement).value = pedido.totalPedido;
    } else {
        alert('Pedido no encontrado');
    }
};

// Función para crear o editar un pedido
const manejarFormulario = async (event: Event) => {
    event.preventDefault();

    const id = (document.getElementById('id') as HTMLInputElement)?.value;
    const idcliente = (document.getElementById('idcliente') as HTMLInputElement).value;
    const fechaPedido = (document.getElementById('fechaPedido') as HTMLInputElement).value;
    const nroComprobante = (document.getElementById('nroComprobante') as HTMLInputElement).value;
    const formaPago = (document.getElementById('formaPago') as HTMLInputElement).value;
    const observaciones = (document.getElementById('observaciones') as HTMLTextAreaElement).value;
    const totalPedido = (document.getElementById('totalPedido') as HTMLInputElement).value;

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
    if (id) {  // Si el id existe, modificamos el pedido
        response = await fetch(`${API_URL}/modificarPedido`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pedido),
        });
    } else {  // Si no hay id, creamos un nuevo pedido
        response = await fetch(`${API_URL}/crearPedido`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pedido),
        });
    }

    const result = await response.json();
    alert(result.message);
    cargarPedidos();  // Refrescar la lista de pedidos
    (document.getElementById('pedidoForm') as HTMLFormElement).reset(); // Resetear el formulario
};



// Función para generar PDF (placeholder para la lógica de generación de PDF)
const generarPDF = async () => {
    alert("Generando PDF del pedido de venta...");
    // Implementar lógica para generar PDF (puedes usar una librería como jsPDF)
};

// Función para manejar la búsqueda de pedidos
const manejarBusqueda = async (event: Event) => {
    event.preventDefault();
    const nroComprobante = (document.getElementById('searchNroComprobante') as HTMLInputElement).value;
    const fechaDesde = (document.getElementById('searchFechaDesde') as HTMLInputElement).value;
    const fechaHasta = (document.getElementById('searchFechaHasta') as HTMLInputElement).value;

    const queryParams = new URLSearchParams({
        nroComprobante,
        fechaDesde,
        fechaHasta,
    });

    const response = await fetch(`${API_URL}/buscarPedido?${queryParams}`);
    const pedidos = await response.json();
    const tablaBody = document.getElementById('tablaBody')!;
    tablaBody.innerHTML = '';
    pedidos.forEach((pedido: any) => {
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
};

// Asignar eventos
document.getElementById('pedidoForm')?.addEventListener('submit', manejarFormulario);
document.getElementById('searchForm')?.addEventListener('submit', manejarBusqueda);
document.getElementById('generatePDF')?.addEventListener('click', generarPDF);

// Cargar los pedidos al iniciar la página
cargarPedidos();
