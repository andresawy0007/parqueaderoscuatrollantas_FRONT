import React, { Component } from "react";

import dataDemo from "../assets/data/demo_test.json";

class Demo extends Component
{
    constructor(props){
        super(props)
        this.state = {
           consolidado:[]
        }
        
    }
    
    componentDidMount(){
        let out = [];
        Object.keys(dataDemo).forEach(function(key){
            if(!out.hasOwnProperty(dataDemo[key][0])){
                out[dataDemo[key][0]] = {}
            }
        })
        console.log(out)
    }
    render(){
        return (
            <div id="demo">
                <h1>Organización por franjas</h1> 
            </div>
        )
    }
}

export default Demo;