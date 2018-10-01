import React, { Component } from 'react';
import Header from './Header';
import AgregarCita from './AgregarCita';
import ListaCistas from './ListaCitas';

class App extends Component {
  
  state = {
    citas: {}

  }

  componentDidMount(){
    const citasLS = localStorage.getItem('citas');
    if(citasLS){
      this.setState({
        citas: JSON.parse(citasLS)
      })
    }
  }

  componentDidUpdate(){
    localStorage.setItem(
      'citas',
      JSON.stringify(this.state.citas)
    )
  }

  crearCita = infoCita => {
    //toma una copia del state
    const citas = {...this.state.citas};

    //lo agrego al state actual
    citas[`citas${Date.now()}`] = infoCita;
    
    //Set state
    this.setState({
      citas
    })
  }

  borrarCita = id => {
    //Leer State
    const citas = {...this.state.citas};

    //Borrarlo del State
    delete citas[id];
    //Actualizar State
    this.setState({
      citas
    })
  }

  render() {
    return (
      <div className = "container">
        <Header 
        titulo = 'Administrador de pacientes de veterinaria'
        />

        <div className = "row">
          <div className="col-md-6">
            <AgregarCita
              crearCita={this.crearCita}
            />
          </div>
          <div className="col-md-6">
            <ListaCistas
              citas={this.state.citas}
              borrarCita={this.borrarCita}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
