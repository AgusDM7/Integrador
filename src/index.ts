// src/index.ts
import express from 'express';
import cors from 'cors';
import routes from './rutas';
import path from "path";

const app = express();

// Configuración de CORS más específica
app.use(cors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*'
}));

// Resto de la configuración
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "vista")));
app.use(routes);

// Middleware de manejo de errores
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('¡Algo salió mal!');
});

// Middleware para rutas no encontradas
app.use((req: express.Request, res: express.Response) => {
    res.status(404).send('Ruta no encontrada');
});

app.listen(3000, () => {
    console.log("Servidor en puerto 3000");
});