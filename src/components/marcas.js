import React, { Component } from "react";


class Marcas extends Component
{

    render(){
        return (
            <div id="marcas">
                <h1>Marcas y cantidad de vehículos disponibles</h1>
                {
                    this.props.marcas.map((marca, index) =><div key={ index }><strong>{marca.nombre}: </strong> {marca.numero_vehiculos} {marca.numero_vehiculos > 1 || marca.numero_vehiculos == 0  ? 'Vehiculos' : 'Vehiculo'}</div>)
                }
            </div>
        )
    }
}

export default Marcas;