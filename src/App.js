import { collection, getDocs, query, doc, deleteDoc, where, onSnapshot} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { bd } from "./componente/firebase";
import AppForm from "./componente/AppForm";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App(){
  //////////////////READ///////////////////
  const [idActual, setIdActual] = useState("");
  const [docsBD, setDocsBD] = useState([]);
  const [orden, setOrden] = useState ([]);
  const i = 1;

  /////////////LECTURA A BD///////////////
  useEffect( () => {
    const xCollectionConQuery =  query(collection(bd, "persona"), where ("nombre", "!=", ""));
    const unsubscribe = onSnapshot(xCollectionConQuery, (xDatosBD)=>{
      const xDoc  = [];
      xDatosBD.forEach((doc) => {
        xDoc.push({id: doc.id, ...doc.data()})
      });
      setDocsBD(xDoc); 
    });
  }, [idActual]);
 

  const fnDelete = async (xId) =>{
    if(window.confirm("Confirme para elimminar")){
      await deleteDoc(doc(bd, 'persona', xId));
      toast("Documento ELIMINADO con exito",{
        type:'error',
        autoClose: 2000
      })
    }
  }

  return( 
    <div className="container text-center">
      <div className="card bs-secondary p-3 mt-3">
        <ToastContainer/>
        
        <div className="col-md-12 p-2">
          <div className="card mb-1">
            <h1>Sitiocopia 2(App.js)</h1>
          </div>
        </div>

        <div className="col-md-12 p-2">
          <AppForm {...{idActual,setIdActual}}/>
        </div>

        <div className="col-md-12 p-2">
          {
            docsBD.map((p) =>
              <div className="car mb-1" key={p.id}>
                <div className="d-flex justify-content-between">
                  <h4>N     -{p.nombre}</h4>
                  <div >
                    <i className="material-icons text-danger"
                      onClick={() => fnDelete(p.id)}>close</i>
                      ELIMINAR
                    <i className="material-icons text-warnig"
                      onClick={() => setIdActual(p.id)}>create</i>  
                  </div>
                </div>
                <div className="d-flex justify-content">
                  <span>Edad: {p.edad}</span>...
                  <a href="#">Genero:{p.genero}</a>
                </div>
              </div>
              )
          }
        </div>

      </div> 
    </div>
  );
};

export default App;
