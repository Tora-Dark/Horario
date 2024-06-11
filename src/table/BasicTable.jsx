
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {Link} from 'react-router-dom'
const endpoint = 'http://127.0.0.1:8000/api'





const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



export default function BasicTable() {

  const[asignaturas, setasignaturas ]= useState([])
  useEffect( ()=>{
      getAllasignaturas();
  },[])   

  
  const[locales, setLocales ]= useState([])
  useEffect( ()=>{
      getAllLocales();
  },[])   
  
  const getAllLocales = async() =>{
    const response = await axios.get(`${endpoint}/locales`);
    setLocales(response.data);
    }



  const getAllasignaturas = async() =>{
    const response = await axios.get(`${endpoint}/asignaturas`);
    setasignaturas(response.data);
    }



    const  getAsignatura=function(clase) {
      let asignaturanombre = '';
      asignaturas.map((asignatura)=>{
        if(clase.asignatura_id === asignatura.id)
        asignaturanombre = asignatura.nombre;
    })
    return asignaturanombre;
    }

    
    const  getLocal=function(clase) {
      let localnombre = '';
      locales.map((local)=>{
        if(clase.local_id === local.id)
        localnombre = local.nombre;
    })
    return localnombre;
    }

  const[ clases, setClases ]= useState([])
  useEffect( ()=>{
      getAllClases();

  },[]);   
  
  
  const getAllClases = async ()  => {
  const response = await axios.get(`${endpoint}/clases`)
   setClases(response.data);
  
  }
  
  const deleteClase = async () => {
  
      await axios.delete(`${endpoint}/clases/${id}`);
      getAllClases();
  }



  return (
<div className="m-3">
<Link to="/create" className='btn btn-success btn-lg mt-2 mb-2 text-white'>Create </Link>


    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Tipo </StyledTableCell>
            <StyledTableCell align="right">Turno</StyledTableCell>
            <StyledTableCell align="right">Fecha</StyledTableCell>
            <StyledTableCell align="right">Asignatura</StyledTableCell>
            <StyledTableCell align="right">Local</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clases.map((clase) => (
            <StyledTableRow
              key={clase.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {clase.tipo}
              </StyledTableCell>
              <StyledTableCell align="right">{clase.turn}</StyledTableCell>
              <StyledTableCell align="right">{clase.fecha}</StyledTableCell>
              <StyledTableCell align="right">{getAsignatura(clase)}</StyledTableCell>
              <StyledTableCell align="right">{getLocal(clase)}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
