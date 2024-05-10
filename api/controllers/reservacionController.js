const con = require('../database/mysqlConnection');

// READ - Obtener todas las reservas
exports.getAllReservations = (req, res) => {
    const sql = "SELECT * FROM reservacion";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error fetching data" });
        return res.json({ Reservations: result });
    });
};

// READ - Obtener una reserva por ID
exports.getReservationById = (req, res) => {
    const reservationId = req.params.id;
    const sql = "SELECT * FROM reservacion WHERE id_reservacion = ?";
    con.query(sql, reservationId, (err, result) => {
        if (err) return res.json({ Error: "Error fetching data" });
        if (result.length === 0) return res.json({ Error: "Reservation not found" });
        return res.json({ Reservation: result[0] });
    });
};

// CREATE - Agregar una nueva reserva
exports.createReservation = (req, res) => {
    const { id_usuario, id_habitacion, FechaEntrada, FechaSalida, Estado, EstadoPago, Monto } = req.body;
    const sql = "INSERT INTO reservacion (`id_usuario`, `id_habitacion`, `FechaEntrada`, `FechaSalida`, `Estado`, `EstadoPago`, `Monto`) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [id_usuario, id_habitacion, FechaEntrada, FechaSalida, Estado, EstadoPago, Monto];
    con.query(sql, values, (err, result) => {
        if (err) return res.json({ Error: "Error inserting data" });
        return res.json({ Status: "Success", InsertId: result.insertId });
    });
};

// UPDATE - Actualizar una reserva
exports.updateReservation = (req, res) => {
    const reservationId = req.params.id;
    const { id_usuario, id_habitacion, FechaEntrada, FechaSalida, Estado, EstadoPago, Monto } = req.body;
    const sql = "UPDATE reservacion SET id_usuario = ?, id_habitacion = ?, FechaEntrada = ?, FechaSalida = ?, Estado = ?, EstadoPago = ?, Monto = ? WHERE id_reservacio = ?";
    const values = [id_usuario, id_habitacion, FechaEntrada, FechaSalida, Estado, EstadoPago, Monto, reservationId];
    con.query(sql, values, (err, result) => {
        if (err) return res.json({ Error: "Error updating data" });
        return res.json({ Status: "Success" });
    });
};

// DELETE - Eliminar una reserva
exports.deleteReservation = (req, res) => {
    const reservationId = req.params.id;
    const sql = "DELETE FROM reservacion WHERE id_reservacion = ?";
    con.query(sql, reservationId, (err, result) => {
        if (err) return res.json({ Error: "Error deleting data" });
        return res.json({ Status: "Success" });
    });
};
