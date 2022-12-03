import {collection, doc, getDoc, addDoc, updateDoc} from "firebase/firestore";
import React, {useEffect, useState} from 'react';
import { bd } from './firebase';
import { toast } from "react-toastify";
import 'bootswatch/dist/quartz/bootstrap.min.css';

const AppFrom = (props) => {

    const camposRegistro ={nombre:"", edad:"", genero:""}
    const [objeto, setObjeto] = useState(camposRegistro);

    const controlarEstadoCambio = (e) => {  
        const {name, value} = e.target;
        setObjeto({...objeto,[name]:value});   
    };
    
    const controlSubmit = async (e) => {
        try{
            e.preventDefault();

            if(props.idActual === ""){
                if(validarForm()){
                    addDoc(collection(bd, 'persona'),objeto);
                    toast("Se GUARDO con exito",{
                        type:'error',
                        autoClose: 2000  
                })}
            }else{
                await updateDoc(doc(collection(bd, "persona"), props.idActual), objeto);
                toast("Se ACTUALIZO con exito...",{
                    type:'info',
                    autoClose:2000
                })
                props.setIdActual('');
            }
            setObjeto(camposRegistro);
        }catch(error){
            console.log("Error en crear o update..",error);
        }     
    };
    const validarForm = () => {
        if(objeto.nombre==="" || /^\s+$/.test(objeto.nombre)){
            alert("Escriba nombres...");
            return false;
        }
        return true;
    };

    useEffect( () => {
        if(props.idActual ===""){
            setObjeto({...camposRegistro});
        }else{
            obtenerDatosPorId(props.idActual);
        }
    }, [props.idActual]);

    const obtenerDatosPorId =async(xId)=>{
        const objPorId = doc(bd, "persona",xId);
        const docPorId = await getDoc(objPorId);
        if (docPorId.exists()){
            setObjeto(docPorId.data());
        }else{
            console.log("No hay doc... ");
        }  
    }
    

    return(
        <div>
        <form className="card card-body" onSubmit={controlSubmit}>
            <button className="btn btn-primary btn-block">
                Formulario (AppForm.js)
            </button>
            <div className="form-group input-group">
                <div className="input-group-text bd-light">
                    <i className="material-icons">group_add</i>
                </div>
                <input type="text" className="form-control" name="nombre" placeholder="Nombre..."
                    onChange={controlarEstadoCambio} value={objeto.nombre}/><br/>
            </div>
            <div className="form-group input-group clearfic">
                <div className="input-group-text bd-light">
                    <i className="material-icons">star_half</i>
                </div>
                <input type="text" className="form-control"name="edad" placeholder="Edad..."
                    onChange={controlarEstadoCambio} value={objeto.edad}/><br/>
            </div>
            <div className="form-group input-group">
                <div className="input-group-text bd-light">
                    <i className="material-icons">insert_link</i>
                </div>
                <input type="text" className="form-control" name="genero" placeholder="Genero..."
                    onChange={controlarEstadoCambio} value={objeto.genero}/><br/>
            </div>
            <button className="btn btn-primary btn-block">
                {props.idActual === ""? "Guardar" : "Actualizar"}
            </button>
        </form>
        </div>
    )
};
export default AppFrom;