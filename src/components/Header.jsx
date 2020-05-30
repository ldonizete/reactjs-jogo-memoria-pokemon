import React from 'react'
import tituloPokemon from '../assets/img/tituloPokemon.png'

function Header (props) {
  // const teste = require("./assets/img/frente.jpg");
  return (
    <div className="header">
      <div className="titulo">
        <img className="imgTitulo" src={tituloPokemon} alt="Título"/>
        {/* <h1>Jogo da memória</h1> */}
      </div>
      <div className="divAcoes">
        <button className="btnAcoes" onClick= {props.funcao}>Ajuda</button>
        <button 
          className="btnAcoes" 
          onClick= {props.reload}
        >
          Jogar novamente
        </button>
        <p className="paragrafo">Score: {props.score}</p>
        <p className="paragrafo">Tempo: {props.time}</p>
      </div>
    </div>
  )
}

export default Header;