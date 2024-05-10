import React, { useState } from "react";
import { Box, Card, CardContent, Typography, TextField, Button, Grid } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/lab';
import dayjs from 'dayjs'; // Importa dayjs para manejar fechas
import Navbar from "../NavbarDashboard";
import axios from 'axios';
import fondo from "../../image/fondo.jpg"; // Importa la imagen de fondo

const Reservaciones = () => {
  // Estado para almacenar los datos de la reserva
  const [formData, setFormData] = useState({
    arrivalDate: null,
    departureDate: null,
  });

 // Manejar cambios en los campos del formulario
 const handleInputChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

// Manejar cambio de fecha de llegada seleccionada
const handleArrivalDateChange = (date) => {
  setFormData({ ...formData, arrivalDate: date });
};

// Manejar cambio de hora de llegada seleccionada
const handleArrivalTimeChange = (time) => {
  setFormData({ ...formData, arrivalTime: time });
};

// Manejar cambio de fecha de salida seleccionada
const handleDepartureDateChange = (date) => {
  setFormData({ ...formData, departureDate: date });
};

// Manejar cambio de hora de salida seleccionada
const handleDepartureTimeChange = (time) => {
  setFormData({ ...formData, departureTime: time });
};


  // Función para enviar la reserva
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Realizar la solicitud POST al endpoint /reservation
      const response = await axios.post('http://localhost:3001/reservation', {
        FechaEntrada: formData.arrivalDate,
        FechaSalida: formData.departureDate
      });// Imprimir la respuesta del servidor
    } catch (error) {
      console.error('Error:', error); // Manejar errores de la solicitud
    }
  };
  return (
    <div style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', backgroundRepeat: 'no-repeat' }}>
      <Navbar/>
      <Box m={2}>
        <Grid container spacing={2}>
          {/* Tarjeta de imágenes */}
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Imágenes del hotel
                </Typography>
                {/* Aquí puedes mostrar las imágenes del hotel */}
              </CardContent>
            </Card>
          </Grid>

          {/* Tarjeta de formulario de reserva */}
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Reservación de habitación
                </Typography>
                {/* Formulario de reserva */}
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Nombre"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  <TextField
                    label="Apellido"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                  <TextField
                    label="Teléfono"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs} style={{margin: '5px 0'}}>
                    <DatePicker
                      label="Fecha de llegada"
                      value={dayjs(formData.arrivalDate)} // Convierte la fecha a un objeto Dayjs
                      onChange={(newValue) => handleArrivalDateChange(newValue?.toDate())} // Convierte la fecha seleccionada a Date
                      renderInput={(params) => <TextField {...params} margin="normal" fullWidth />}
                      style={{ marginBottom: '10px' }} // Agrega margen inferior para separar los calendarios
                    />
                    <DatePicker
                      label="Fecha de salida"
                      value={dayjs(formData.departureDate)} // Convierte la fecha a un objeto Dayjs
                      onChange={(newValue) => handleDepartureDateChange(newValue?.toDate())} // Convierte la fecha seleccionada a Date
                      renderInput={(params) => <TextField {...params} margin="normal" fullWidth />}
                    />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs} style={{margin: '5px 0'}}>
                    <TimePicker
                      label="Hora de llegada"
                      value={formData.arrivalTime}
                      onChange={handleArrivalTimeChange}
                      renderInput={(params) => <TextField {...params} margin="normal" fullWidth />}
                    />
                    <TimePicker
                      label="Hora de salida"
                      value={formData.departureTime}
                      onChange={handleDepartureTimeChange}
                      renderInput={(params) => <TextField {...params} margin="normal" fullWidth />}
                    />
                  </LocalizationProvider>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Reservar habitación
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Reservaciones;
