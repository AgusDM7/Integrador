class PedidoVenta {
    constructor(id, idCliente, fechaPedido, nroComprobante, formaPago, observaciones, totalPedido) {
        this.id = id || 0;
        this.idCliente = idCliente || 0;
        this.fechaPedido = fechaPedido || new Date();
        this.nroComprobante = nroComprobante || 0;
        this.formaPago = formaPago || '';
        this.observaciones = observaciones || '';
        this.totalPedido = totalPedido || 0;
    }

    // Método para representar el pedido como un objeto plano
    toObject() {
        return {
            id: this.id,
            idCliente: this.idCliente,
            fechaPedido: this.fechaPedido,
            nroComprobante: this.nroComprobante,
            formaPago: this.formaPago,
            observaciones: this.observaciones,
            totalPedido: this.totalPedido
        };
    }
}

module.exports = PedidoVenta;
