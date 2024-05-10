const con = require('../database/mysqlConnection');

// READ - Obtener todas las habitacion
exports.getAllRooms = (req, res) => {
    const sql = "SELECT * FROM habitacion";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error fetching data" });
        return res.json({ Rooms: result });
    });
};

// READ - Obtener una habitación por ID
exports.getRoomById = (req, res) => {
    const roomId = req.params.id;
    const sql = "SELECT * FROM habitacion WHERE id_habitacio = ?";
    con.query(sql, roomId, (err, result) => {
        if (err) return res.json({ Error: "Error fetching data" });
        if (result.length === 0) return res.json({ Error: "Room not found" });
        return res.json({ Room: result[0] });
    });
};

// CREATE - Agregar una nueva habitación
exports.createRoom = (req, res) => {
    const { tipo, precioNoche, disponible } = req.body;
    const sql = "INSERT INTO habitacion (`tipo`, `precioNoche`, `disponible`) VALUES (?, ?, ?)";
    const values = [tipo, precioNoche, disponible];
    con.query(sql, values, (err, result) => {
        if (err) return res.json({ Error: "Error inserting data" });
        return res.json({ Status: "Success", InsertId: result.insertId });
    });
};

// UPDATE - Actualizar una habitación
exports.updateRoom = (req, res) => {
    const roomId = req.params.id;
    const { tipo, precioNoche, disponible } = req.body;
    const sql = "UPDATE habitacion SET tipo = ?, precioNoche = ?, disponible = ? WHERE id_habitacio = ?";
    const values = [tipo, precioNoche, disponible, roomId];
    con.query(sql, values, (err, result) => {
        if (err) return res.json({ Error: "Error updating data" });
        return res.json({ Status: "Success" });
    });
};

// DELETE - Eliminar una habitación
exports.deleteRoom = (req, res) => {
    const roomId = req.params.id;
    const sql = "DELETE FROM habitacion WHERE id_habitacio = ?";
    con.query(sql, roomId, (err, result) => {
        if (err) return res.json({ Error: "Error deleting data" });
        return res.json({ Status: "Success" });
    });
};
