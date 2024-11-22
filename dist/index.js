"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const rutas_1 = __importDefault(require("./rutas"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
// Configuración de CORS más específica
app.use(cors_1.default({
    origin: '*',
    methods: '*',
    allowedHeaders: '*'
}));
// Resto de la configuración
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, "vista")));
app.use(rutas_1.default);
// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('¡Algo salió mal!');
});
// Middleware para rutas no encontradas
app.use((req, res) => {
    res.status(404).send('Ruta no encontrada');
});
app.listen(3000, () => {
    console.log("Servidor en puerto 3000");
});
