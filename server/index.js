const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    connectionLimit: 10,  // Número máximo de conexiones simultáneas        
  host: "localhost",
  user: "root", // add your database username
  password: "mysql", // add your database password
  database: "empleados_crud" // specify the database name
});
//////////////////Crear>>>>>>>>>>>>>>>>
app.post('/create', (req, res) => {
    const { nombre, edad, pais, cargo, anios } = req.body;

    db.query(
        'INSERT INTO empleados (nombre, edad, pais, cargo, anios) VALUES (?, ?, ?, ?, ?)',
        [nombre, edad, pais, cargo, anios],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error al registrar empleado");
            } else {
                res.send(result);
            }
        }
    );
});


//////////////////Listar>>>>>>>>>>>>>>>>

app.get('/empleados', (req, res) => {
  

    db.query(
        'SELECT * FROM empleados',
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error al mostrar empleado");
            } else {
                res.send(result);
            }
        }
    );
});






////Actualizar>>>>>>>>

app.put('/update', (req, res) => {
    const {id, nombre, edad, pais, cargo, anios } = req.body;

    db.query('UPDATE empleados SET nombre=?, edad=?, pais=?, cargo=?, anios=? WHERE id=?',
        [nombre, edad, pais, cargo, anios, id],
        (err, result) => {
            if (err) {
                console.error(err);
               
            } else {
                res.send(result);
            }
        }
    );
});


////////////////////Eliminar>>>>>>>>>>>>>>>>>>>>>>|


////Actualizar>>>>>>>>

app.delete('/delete/:id', (req, res) => {
    const {id } = req.params;

    db.query('DELETE FROM empleados WHERE id=?',
        [id],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error al Eliminar empleado");
            } else {
                res.send(result);
            }
        }
    );
});










app.listen(3001, () => {
    console.log("Servidor corriendo en el puerto 3001");
});
