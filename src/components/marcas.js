import React, { Component } from "react";

import data from "../assets/data/marcas_test.json";

class Marcas extends Component
{
    constructor(props){
        super(props)
        this.state = {marcas: []}
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
                    marcas: dataMarcas
                })
            }
            // data.map((marca, index) => {
            //     console.log(marca)
            // })
        })
        .catch(error => console.log(error))
    } 

    render(){
        return (
            <div id="marcas">
                <h1>Marcas y cantidad de vehículos disponibles</h1>
                {
                    this.state.marcas.map((marca, index) =><div key={ index }><strong>{marca.nombre}: </strong> {marca.numero_vehiculos} Vehículo (s)</div>)
                }
            </div>
        )
    }
}

export default Marcas;