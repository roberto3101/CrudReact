import { useState } from 'react';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';



function App() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(0);
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState(0);
  const [id, setId] = useState();


  const [editar, setEditar] = useState(false);

  const [empleadosList, setEmpleados] = useState([]);

  const add = () => {
    axios.post('http://localhost:3001/create', {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
    }).then(() => {
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Registrado con exito!</strong>",
        html: "<i>El empleado "+nombre+" registrado!</i>",
        icon: 'success',
        timer: 3000
      })
    });
  };

  const update = () => {
    axios.put('http://localhost:3001/update', {
      id: id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
    }).then(() => {
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Actualizacion exitosa!</strong>",
        html: "<i>El empleado "+nombre+" actualizado!</i>",
        icon: 'success',
        timer: 3000
      }).catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se logró actualizar al empleado!",
          footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Servidor no disponible":"Intente mas tarde"
        });
      });
     
    });
  };


  const deleteEmple = (val) => {
    Swal.fire({
      title: "¿Confirmar eliminado?",
      html: "<i>Desea eliminar a " + val.nombre + "?</i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3001/delete/${val.id}`)
          .then(() => {
            getEmpleados();
            limpiarCampos();
            Swal.fire({
              title: "Eliminado",
              text: val.nombre + " ha sido eliminado",
              icon: "success",
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No se logró eliminar el empleado!",
              footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Servidor no disponible":"Intente mas tarde"
            });
          });
      }
    });
  };
  

  const limpiarCampos=()=>{
    setNombre("");
    setEdad(0);
    setPais("");
    setCargo("");
    setAnios(0);
    setId();
    setEditar(false);


  }
  const editarEmpleado = (val) => {
    setEditar(true);
    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setAnios(val.anios);
    setId(val.id);
  }




  const getEmpleados = () => {
    axios.get('http://localhost:3001/empleados').then((response) => {
      setEmpleados(response.data);
      alert("Empleados cargados con exito!");
    });
  };



  /////////////////////////////////////////
  return (

    <div className="container">












      <div className="card text-center">
        <div className="card-header">
          GESTION DE EMPLEADOS
        </div>
        <div className="card-body">

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre</span>
            <input type="text"
              onChange={(event) => { setNombre(event.target.value); }}
              className="form-control" value={nombre} placeholder="Ingrese Nombre " aria-label="Username" aria-describedby="basic-addon1" />
          </div>


          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad</span>
            <input type="number" value={edad}
              onChange={(event) => { setEdad(event.target.value); }}
              className="form-control" placeholder="Ingrese Edad " aria-label="Username" aria-describedby="basic-addon1" />
          </div>



          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Pais</span>
            <input type="Text" value={pais}
              onChange={(event) => { setPais(event.target.value); }}
              className="form-control" placeholder="Pais de Origen " aria-label="Username" aria-describedby="basic-addon1" />
          </div>


          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cargo</span>
            <input type="Text" value={cargo}
              onChange={(event) => { setCargo(event.target.value); }}
              className="form-control" placeholder="Ingrese un cargo " aria-label="Username" aria-describedby="basic-addon1" />
          </div>


          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Años de Experiencia</span>
            <input type="number" value={anios}
              onChange={(event) => { setAnios(event.target.value); }}
              className="form-control" placeholder="Ingrese años " aria-label="Username" aria-describedby="basic-addon1" />
          </div>









        </div>
        <div className="card-footer text-muted">

          {
            editar?
          <div> 
              <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
              <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
              </div>
              :<button className='btn btn-success' onClick={add}>Registrar</button>
          }
         
         
   
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Pais</th>
            <th scope="col">Cargo</th>
            <th scope="col">Experiencia</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>

          {empleadosList.map((val, key) => {
            return <tr key={val.id}>
              <th scope="row">{val.id}</th>
              <td>{val.nombre}</td>
              <td>{val.edad}</td>
              <td>{val.pais}</td>
              <td>{val.cargo}</td>
              <td>{val.anios}</td>
              <td> <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button"

                  onClick={() => { editarEmpleado(val); }}
                  className="btn btn-info">editar</button>
                <button type="button" onClick={() => deleteEmple(val)} className="btn btn-danger">Eliminar</button>

              </div>  </td>
            </tr>






          })}


        
        </tbody>
      </table>




    </div>
  );
}

export default App;
