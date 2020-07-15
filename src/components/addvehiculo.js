import React, { Component } from "react";

import Marcas from '../components/marcas';

class AddVehiculo extends Component
{
    constructor(props){
        super(props)
        this.state = {
            marcas: [],
            propietario_nombre: '',
            propietario_cedula: '',
            tipo_vehiculo: '1',
            marca_vehiculo: '1',
            placa_vehiculo: '',
            mensajes_estado: '',
            tipo_mensaje_estado: 'error'
        }
        this.setPropietario_nombre = this.setPropietario_nombre.bind(this);
        this.setPropietario_cedula = this.setPropietario_cedula.bind(this);
        this.setTipo_vehiculo = this.setTipo_vehiculo.bind(this);
        this.setMarca_vehiculo = this.setMarca_vehiculo.bind(this);
        this.setPlaca_vehiculo = this.setPlaca_vehiculo.bind(this);
        this.crearVehiculo = this.crearVehiculo.bind(this);
    }
    marcas = [];

    componentDidMount(){
        this.updateMarcas()
    } 
    updateMarcas (){
        fetch ('api/marcas/list')
        .then(response => response.json())
        .then(data => {
            if(data.result){
                const dataMarcas = []
                data.data.map((item, index) => {
                    dataMarcas.push(item)
                })
                this.setState({
                    marcas: dataMarcas,
                })
            }
        })
        .catch(error => console.log(error))
    }
    setPropietario_nombre(e){
        this.setState({
            propietario_nombre: e.target.value,
        })
    }
    setPropietario_cedula(e){
        this.setState({
            propietario_cedula: e.target.value,
        })
    }
    setTipo_vehiculo(e){
        this.setState({
            tipo_vehiculo: e.target.value,
        })
    }
    setMarca_vehiculo(e){
        this.setState({
            marca_vehiculo: e.target.value,
        })
    }
    setPlaca_vehiculo(e){
        this.setState({
            placa_vehiculo: e.target.value,
        })
    }
    crearVehiculo(event){
        event.preventDefault();
        this.setState({
            mensajes_estado: ''
        })
        let data = this.getObjVehivulo();
        console.log(data)
        if(data === false){
            this.setState({
                mensajes_estado: 'Los campos no pueden estar vacios',
                tipo_mensaje_estado: 'error'
            })
            return;
        }
        console.log(this.getObjVehivulo());
        let requestOption = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.getObjVehivulo()),
        }
        fetch('/api/vehiculos/new', requestOption)
        .then(response => response.json())
        .then(data => {
            if(data.result){
                this.setState({
                    mensajes_estado: 'Nuevo vehiculo creado correctamente',
                    tipo_mensaje_estado: 'correcto'
                })
                this.updateMarcas()
            }else{
                let mensaje = 'Error al enviar los datos: Por favor verifique';
                switch (data.code) {
                    case 'invalid_param':
                        mensaje = 'Error al enviar los datos: Por favor verifique que los datos estén correctamente diligenciados';
                        break;
                
                    default:
                        break;
                }
                this.setState({
                    mensajes_estado: mensaje,
                    tipo_mensaje_estado: 'error'
                })
                console.log(this.state)
            }
            console.log(data)
        })
        
    }
    getObjVehivulo(){
        if(
            this.state.propietario_cedula.trim() == "" || 
            this.state.propietario_nombre.trim() == "" || 
            this.state.tipo_vehiculo.trim() == "" || 
            this.state.marca_vehiculo.trim() == "" || 
            this.state.placa_vehiculo.trim() == "" 
            
        ){
            return false;
        }
        return {
            "propietario_cedula": this.state.propietario_cedula,
            "propietario_nombres": this.state.propietario_nombre,
            "tipo": this.state.tipo_vehiculo,
            "marca": this.state.marca_vehiculo,
            "placa": this.state.placa_vehiculo
        }
    }
    render(){
        return (
            <div>
                <div id="addVehiculo">
                    <h1>Añadir nuevo vehículo</h1>
                    <div className="formAddVehiculo">
                        <form onSubmit={this.crearVehiculo}>
                            <div className="formGroup"><input onKeyUp={this.setPropietario_nombre} placeholder="Nombre propietario"/></div>
                            <div className="formGroup"><input onChange={this.setPropietario_cedula} placeholder="Cedula propietario"/></div>
                            <hr/>
                            <h3>Información del vehiculo</h3>
                            <div className="formGroup">
                                <label>Tipo de vehiculo </label>
                                <select id="tipo_vehiculo" defaultValue="1" onChange={this.setTipo_vehiculo}>
                                    <option value="1">Carro</option>
                                    <option value="2">Moto</option>
                                </select>
                            </div>
                            <div className="formGroup">
                                <label>Marca del vehiculo </label>
                                <select id="marca_vehiculo" defaultValue="1" onChange={this.setMarca_vehiculo}>
                                    {
                                        this.state.marcas.map((marca, index) => <option key={index} value={marca.id}>{marca.nombre}</option>)
                                    }
                                </select>
                            </div>
                            <div className="formGroup">
                            <input id="placa_vehiculo" placeholder="Placa" onChange={this.setPlaca_vehiculo}/>
                            </div>
                            <div className="formGroup" id={ this.state.tipo_mensaje_estado }>{ this.state.mensajes_estado }</div>
                            <div className="formGroup">
                                <button type="submit" onClick={ this.crearVehiculo }>Crear</button>
                            </div>
                        </form>
                    </div>
                </div>
                
                <Marcas marcas={this.state.marcas} />
            </div>
            
        )
    }
}

export default AddVehiculo;