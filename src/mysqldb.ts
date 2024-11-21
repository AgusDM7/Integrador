import {createPool} from 'mysql'

export const cxMysql = createPool({
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'integradordb',
    connectionLimit: 100 //100 es el valor por defecto
  });
  