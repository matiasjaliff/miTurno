import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from 'axios'
import { useEffect, useState } from 'react';
import Calendar from '../views/Calendar';
import style from "../styles/Users.module.css";
import { useSelector, useDispatch } from 'react-redux';
import { branchOfficePicker } from '../features/branchOffice';
import parseJwt from "../hooks/parseJwt";

function BranchOfficeSelector() {
  
  const dispatch = useDispatch()
  //const pickedDate = useSelector(state => state.appointment.value)
  const [branchOffices, setBranchOffices] = useState([])
  const pickedBranchOffice = useSelector(state => state.branchOffice.clickedOffice)
  const user = parseJwt(JSON.parse(localStorage.getItem('user')).data.token)
  
  console.log('ES ADMIN ? ', user.admin)
  console.log('ES OPERADOR ? ', user.operator)

  const handleSelection = (e) => {
    e.preventDefault();
    const locationClon = e.target.innerText.toLowerCase()
    const clickedOffice = branchOffices.find(branch => 
        branch.location === locationClon);
    dispatch(branchOfficePicker({clickedOffice}));
  }

  if (user.operator && !user.admin) {
    const asignedOffice = branchOffices.find(branch => 
      Object.values(branch.operator).includes(user.id))
    dispatch(branchOfficePicker({asignedOffice}))
  }

  const getBranchOffices = async () => {   
    const res = await axios.get('http://localhost:3001/api/branchOffice/showBranch');     
    setBranchOffices(res.data.data)   
    }
        
  useEffect(() => {
    getBranchOffices()
  }, [])

  return (!user.operator || user.admin)
  ? (
      <>
      <div id={style.dropBranches}>
        <DropdownButton variant="secondary" id="dropdown-basic-button" title="Seleccione una sucursal">
          {branchOffices.map(e => (
            <Dropdown.Item 
              onClick={handleSelection}
              key={branchOffices.indexOf(e)}  
            >
              {e.location.toUpperCase()}
            </Dropdown.Item>
            )
          )}
        </DropdownButton>
      </div>

      <>{pickedBranchOffice
      ? (
        <div className={style.calendarContainer}>
          <h5 >
            Turnos sucursal {pickedBranchOffice.location.toUpperCase()}
          </h5>
          <Calendar />
        </div>)
      : (<></>)
      }</>
      </>
    )
  : (
    <div className={style.calendarContainer}>
      <h5 >
        Turnos sucursal {pickedBranchOffice.location.toUpperCase()}
      </h5>
      <Calendar />

      {/* condicionar lo que sigue a que tenga algún horario en amarillo */}
      <ul className={style.fewStock}>
        <li>
          últimos turnos disponibles
        </li>
      </ul>
    </div>
  )
};

export default BranchOfficeSelector;