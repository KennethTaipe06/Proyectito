const express = require('express');
const path = require('path');
const mysql = require('mysql2'); // Cambia a mysql2
const app = express();
const port = 3001;

// Configuración del motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
    host: '3.95.181.149',
    user: 'usuario_remoto',
    password: 'FxNc10082002*',
    database: 'proyectito'
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.stack);
        return;
    }
    console.log('Conectado a la base de datos como id ' + connection.threadId);
    console.log('Conexión a la base de datos realizada exitosamente');
});

// Ruta para la raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para obtener los datos de la base de datos y renderizar la tabla
app.get('/datos', (req, res) => {
    connection.query('SELECT * FROM usuarios', (error, results, fields) => {
        if (error) throw error;
        res.render('tabla', { usuarios: results });
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor escuchando en http://0.0.0.0:${port}`);
});