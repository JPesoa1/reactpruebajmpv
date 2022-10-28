import React, { Component } from 'react'
import axios from 'axios'
import Global from '../Global'
export default class CargarTabla extends Component {
    state={
        status:false,
        status2:false,
        doctores:[]
    }
    aumentoTabla=()=>{
        var request="/api/Doctores/"+this.props.especialidad+"/"+this.props.aumento
        var url=Global.urlDoctores+request;
        var aumento=this.props.aumento
        axios.put(url).then(res=>{
            this.setState({
                status:true
            })
        })
        
    }
    cargarTabla=()=>{
        var request="/api/Doctores/DoctoresEspecialidad/"+this.props.especialidad
        var url=Global.urlDoctores+request
        axios.get(url).then(res=>{
            this.setState({
                doctores:res.data,
                status2:true
            })
        })
    }
    componentDidMount=()=>{
        this.aumentoTabla();
        this.cargarTabla();
    }
    componentDidUpdate=(oldProps)=>{
        if(oldProps.especialidad != this.props.especialidad ){
            this.cargarTabla();
            this.aumentoTabla();
        }
    }
  render() {
    
    return (
      <div>
        {
            this.state.status2==true &&
                
                <table>
                    <thead>
                        <tr>
                            <th>APELLIDO</th>
                            <th>ESPECIALIDAD</th>
                            <th>SALARIO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.doctores.map((doctor,index)=>{
                                return(<tr>
                                    <td>{doctor.apellido}</td>
                                    <td>{doctor.especialidad}</td>
                                    <td>{doctor.salario}</td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
            
                
                
        }
       
      </div>
    )
  }
}
