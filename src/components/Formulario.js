import React, { Component } from 'react'
import axios from 'axios'
import Global from '../Global';
import CargarTabla from './CargarTabla';
export default class Formulario extends Component {
    
    state={
        status:false,

        especialidades:[],
        aumento:null,
        especialidad:""
    }
    cajaSelect=React.createRef();
    cajaText=React.createRef();
    cargarEspecialidad=()=>{
        var request="/api/Doctores/Especialidades";
        var url=Global.urlDoctores+request;
        axios.get(url).then(res=>{
            this.setState({
                especialidades:res.data,
                status:true
            })
        })
         

    }
    
    componentDidMount=()=>{
        this.cargarEspecialidad();
    }

    cargarTabla=(e)=>{
        e.preventDefault();
        
       this.setState({
        aumento:parseInt(this.cajaText.current.value),
        especialidad:this.cajaSelect.current.value
       })
        
    }
  render() {
    return (
      <div>

        <h1>Incremento salarial doctores</h1>
        <form>
            <label>Seleccione un especialidad</label>
            <select ref={this.cajaSelect}>
                {
                    this.state.status==true &&
                        this.state.especialidades.map((especialidad,index)=>{
                            return(<option value={especialidad}>{especialidad}</option>)
                        })
                }
            </select>
            <br/>
            <label>Incremento salarial</label>
            <input type="text" ref={this.cajaText} required/>
            <button onClick={this.cargarTabla}>Incrementar salarios</button>
           
        </form>
        {
            this.state.aumento!=null &&
             <CargarTabla especialidad={this.state.especialidad} aumento={this.state.aumento}/>
        }
        
        
                
                    
        
        

      </div>
    )
  }
}
