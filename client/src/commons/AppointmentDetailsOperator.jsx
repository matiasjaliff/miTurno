import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import style from "../styles/Users.module.css";
import { getFullDate } from "../utils/getFullDate";
import { getFixedTime } from "../utils/getFixedTime";
import parseJwt from "../hooks/parseJwt";


const AppointmentDetailsOperator = () => {

  const user = parseJwt(JSON.parse(localStorage.getItem('user')).data.token)
  const pickedDate = useSelector(state => state.appointment)
  const pickedBranchOffice = useSelector(state => state.branchOffice.clickedOffice)
  const [appointmentUsers, setAppointmentUsers] = useState([])
  
  // VER URL DE ACA ABAJO !!!!!!!!
  const getAppointmentUsers = () => {
    axios.get(`http://localhost:3001/api/appointment/${user.id}/dayAppointments`, {
      headers: {
        date: pickedDate.date,
        month: pickedDate.month,
        year: pickedDate.year,
        time: getFixedTime(pickedDate),
        id: pickedBranchOffice.id
      }
    })
    .then(arr => {
      console.log(arr.data)
      //setAppointmentUsers(datos)
    })
    .catch(err => console.log(err))
  }

  return pickedDate.date ? (
    <div className={style.userDetails}>
      <h5>Detalles del turno:</h5>
      <ul>
        <li>Fecha: {getFullDate(pickedDate)}</li>
        <li>Hora: {getFixedTime(pickedDate)} hs</li>
      </ul>
      {appointmentUsers.length
      ? (
        <>
        <h5>Usuarios agendados:</h5>
        <ul>
          {appointmentUsers.map(e => (
            <>  
            <li> {e.lname.toUpperCase()}, {e.fname.toUpperCase()}</li>
            <li> Teléfono: {e.phone}</li>
            <li> Email: {e.email}</li>
            {/* agregar para marcar si asistió o no */}
            </>
            )
          )}  
        </ul>
        </>
        )
      : (
        <h5>NO HAY USUARIOS PARA ESTE TURNO</h5>
        )
      }
    </div>
    )
    : //selectedDate.setDate(Number(pickedDate.date)) 
    (
    <></>
    );
};

export default AppointmentDetailsOperator;