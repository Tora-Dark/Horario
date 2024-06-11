import React, { useEffect, useState } from 'react';


const endpoint = 'http://127.0.0.1:8000/api'


const HorarioClases = () => {
  const [clases, setClases] = useState([]);

 
  useEffect(() => {
    // Realizar la petición GET a la API para obtener las clases
    fetch('http://127.0.0.1:8000/api/clases')
      .then(response => response.json())
      .then(data => setClases(data));
  }, []);

  // Generar el arreglo bidimensional para el horario de clases
  const horario = [['','','','',''],
['','','','',''],
['','','','',''],
['','','','',''],
['','','','',''],
['','','','',''],
  ];


  clases.forEach(clase => {
    const { fecha, turn, tipo } = clase;
    if (!horario[fecha]) {
      horario[fecha] = [];
    }
    horario[turn-1][fecha-1] = tipo;


  });

  return (
    <div>
      <h2>Horario de Clases</h2>
      <table className='table table-bordered'>
        <thead className='table-dark'>
          <tr>
            <th>Turno</th>
            <th>Lunes</th>
            <th>Martes</th>
            <th>Miércoles</th>
            <th>Jueves</th>
            <th>Viernes</th>
          </tr>
        </thead >
        <tbody>
          {horario.map((fila, index ) => (
            <tr key={index }>
              <td>{index+1}</td>
              {fila.map((clase, index) => (
           
                <td key={index}>{clase}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>


  );
};

export default HorarioClases;