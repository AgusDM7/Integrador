// src/index.ts
import express from 'express';
import routes from './rutas';
import path from "path";

const app = express();

// Configurar Express para servir archivos estáticos desde la carpeta "vista"
app.use(express.static(path.join(__dirname, "vista")));
//para transformar los datos a objetos json
app.use(express.json());
//transformar los datos de un formulario html a objetos json
app.use(express.urlencoded({extended:false}));

app.use(routes);

app.listen(3000, () => {
    console.log("Servidor en puerto 3000", 3000);
})