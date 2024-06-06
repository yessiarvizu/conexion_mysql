const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const URL = https://registro-conexion-mysql.onrender.com;

const connection = mysql.createConnection({
    host: "bfdrvnybskfcd77zjhdv-mysql.services.clever-cloud.com",
    user: "uzspq1xc6py3gfp6",
    password: "jiL5sJPinjYF6YwxDxMI",
    port: "3306",
    database: "bfdrvnybskfcd77zjhdv"
});

connection.connect((err) => {
    if (err) {
        console.error(err.message || "No se pudo conectar a la base de datos");
    } else {
        console.log("Conectado a la base de datos");
    }
});

app.get("/ver", (req, res) => {
    connection.query("SELECT * FROM usuarios", (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: "Error al obtener los datos de la tabla usuarios" });
        } else {
            const usuarios = results.map(usuario => ({
                id: usuario.id,
                nombre: usuario.nombre
            }));
            res.status(200).json(usuarios);
        }
    });
});

app.post("/agregar", (req, res) => {
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(400).json({ message: "El nombre es requerido" });
    }
    connection.query('INSERT INTO usuarios (nombre) VALUES (?)', [nombre], (error, results) => {
        if (error) {
            console.error("Error al insertar:", error);
            return res.status(500).json({ message: error.message || "No se pudo insertar el dato en este momento" });
        }
        res.status(201).json(results);
    });
});

app.patch("/actualizar", (req, res) => {
    const { id, nombre } = req.body;
    if (!id || !nombre) {
        return res.status(400).json({ message: "El ID y el nombre son requeridos" });
    }
    connection.query('UPDATE usuarios SET nombre = ? WHERE ID = ?', [nombre, id], (error, results) => {
        if (error) {
            console.error("Error al actualizar:", error);
            return res.status(500).json({ message: error.message || "No se puede actualizar en este momento" });
        }
        res.json(results);
    });
});

app.delete("/eliminar", (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ message: "El ID es requerido" });
    }
    connection.query('DELETE FROM usuarios WHERE ID = ?', [id], (error, results) => {
        if (error) {
            console.error("Error al eliminar:", error);
            return res.status(500).json({ message: error.message || "Error al eliminar" });
        }
        res.json(results);
    });
});
