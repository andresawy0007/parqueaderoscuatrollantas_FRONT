import React, { Component } from "react";

class AddVehiculo extends Component
{
    constructor(props){
        super(props)
        this.state = {
            marcas: [],
            propietario_nombre: '',
            propietario_cedula: '',
            tipo_vehiculo: '',
            marca_vehiculo: '',
            placa_vehiculo: ''
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
        fetch ('http://localhost/gradiweb_parqueaderoscuatrollantas_API/public/api/marcas/list')
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
            // data.map((marca, index) => {
            //     console.log(marca)
            // })
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
        const requestOption = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "propietario_cedula": this.state.propietario_nombre,
                "propietario_nombres": this.state.propietario_cedula,
                "tipo": this.state.tipo_vehiculo,
                "marca": this.state.marca_vehiculo,
                "placa": this.state.placa_vehiculo
            })
        }
        fetch('http://localhost/gradiweb_parqueaderoscuatrollantas_API/public/api/vehiculos/new', requestOption)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
    }
    render(){
        return (
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
                        <div className="formGroup">
                            <button type="submit" onClick={ this.crearVehiculo }>Crear</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddVehiculo;