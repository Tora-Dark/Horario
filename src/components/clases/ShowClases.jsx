import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'



import {Link} from 'react-router-dom'


const endpoint = 'http://127.0.0.1:8000/api'

export default function ShowClases () {


    ShowClases.propTypes = {

    }


const[ clases, setClases ]= useState([])
useEffect( ()=>{
    getAllClases()
},[])   


const getAllClases = async ()  => {
const response = await axios.get(`${endpoint}/clases`)
 setClases(response.data)

}

const deleteClase = async () => {

    await axios.delete(`${endpoint}/clases/${id}`)
    getAllClases()
}

    return (
    <div className='m-3'>

    <div className='d-grid gap-2'>
    <Link to="/create" className='btn btn-success btn-lg mt-2 mb-2 text-white'>Create </Link>
    </div>
    
<table className='table table-striped'>

<thead className='bg-primary '>
<tr>
<th>tipo</th>
<th>turn</th>
<th>fecha</th>
<th>asignatura</th>
<th>action</th>


</tr>
</thead>
<tbody>
    {clases.map( ( clase ) =>(

        <tr key={clase.id}>
        <td>{clase.tipo}</td>
        <td>{clase.turn}</td>
        <td>{clase.fecha}</td>
        <td>{clase.asignatura_id}</td>
        </tr>

    ))}
</tbody>
</table>


    </div>
  )
}

