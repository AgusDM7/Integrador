class PedidoVentaDetalle {
    constructor(id, idPedidoVenta, idProducto, cantidad, subtotal) {
        this.id = id || 0;
        this.idPedidoVenta = idPedidoVenta || 0;
        this.idProducto = idProducto || 0;
        this.cantidad = cantidad || '';
        this.subtotal = subtotal || '0';
    }

    // Método para representar el detalle como un objeto plano
    toObject() {
        return {
            id: this.id,
            idPedidoVenta: this.idPedidoVenta,
            idProducto: this.idProducto,
            cantidad: this.cantidad,
            subtotal: this.subtotal
        };
    }
}

module.exports = PedidoVentaDetalle;
