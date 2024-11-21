"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const rutas_1 = __importDefault(require("./rutas"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
// Configurar Express para servir archivos estáticos desde la carpeta "vista"
app.use(express_1.default.static(path_1.default.join(__dirname, "vista")));
//para transformar los datos a objetos json
app.use(express_1.default.json());
//transformar los datos de un formulario html a objetos json
app.use(express_1.default.urlencoded({ extended: false }));
app.use(rutas_1.default);
app.listen(3000, () => {
    console.log("Servidor en puerto 3000", 3000);
});
