import React, { Component } from 'react';
import Piece from './components/Piece';
import Header from './components/Header';
import { pieceStatus } from './constants';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

const imgDefault = require("./assets/img/frente.jpg");
const imgCheck = require("./assets/img/check.png");

const pecas = [
  {id:0, status:pieceStatus.BACK, name: 'ash', imgPath: require('./assets/img/ash.jpg')},
  { id:1, status: pieceStatus.BACK, name: 'charizard', imgPath: require("./assets/img/charizard.jpg")},
  { id:2, status: pieceStatus.BACK, name: 'evee', imgPath: require("./assets/img/evee.jpg")},
  { id:3, status: pieceStatus.BACK, name: 'gyarados', imgPath: require("./assets/img/gyarados.jpg")},
  { id:4, status: pieceStatus.BACK, name: 'pikachu', imgPath: require("./assets/img/pikachu.jpg")},
  { id:5, status: pieceStatus.BACK, name: 'pokemon', imgPath: require("./assets/img/pokemon.jpg")},
  { id:6, status: pieceStatus.BACK, name: 'sandshrew', imgPath: require("./assets/img/sandshrew.jpg")},
  { id:7, status: pieceStatus.BACK, name: 'umbreon', imgPath: require("./assets/img/umbreon.jpg")},
  { id:8, status: pieceStatus.BACK, name: 'victreebel', imgPath: require("./assets/img/victreebel.jpg")},
  { id:9, status: pieceStatus.BACK, name: 'wartole', imgPath: require("./assets/img/wartole.jpg")},
  { id:10, status: pieceStatus.BACK, name: 'charmander', imgPath: require("./assets/img/charmander.jpg")},
  { id:11, status: pieceStatus.BACK, name: 'bulbasaur', imgPath: require("./assets/img/bulba.jpg")},
  { id:12, status: pieceStatus.BACK, name: 'ash', imgPath: require("./assets/img/ash.jpg")},
  { id:13, status: pieceStatus.BACK, name: 'charizard', imgPath: require("./assets/img/charizard.jpg")},
  { id:14, status: pieceStatus.BACK, name: 'evee', imgPath: require("./assets/img/evee.jpg")},
  { id:15, status: pieceStatus.BACK, name: 'gyarados', imgPath: require("./assets/img/gyarados.jpg")},
  { id:16, status: pieceStatus.BACK, name: 'pikachu', imgPath: require("./assets/img/pikachu.jpg")},
  { id:17, status: pieceStatus.BACK, name: 'pokemon', imgPath: require("./assets/img/pokemon.jpg")},
  { id:18, status: pieceStatus.BACK, name: 'sandshrew', imgPath: require("./assets/img/sandshrew.jpg")},
  { id:19, status: pieceStatus.BACK, name: 'umbreon', imgPath: require("./assets/img/umbreon.jpg")},
  { id:20, status: pieceStatus.BACK, name: 'victreebel', imgPath: require("./assets/img/victreebel.jpg")},
  { id:21, status: pieceStatus.BACK, name: 'wartole', imgPath: require("./assets/img/wartole.jpg")},
  { id:22, status: pieceStatus.BACK, name: 'charmander', imgPath: require("./assets/img/charmander.jpg")},
  { id:23, status: pieceStatus.BACK, name: 'bulbasaur', imgPath: require("./assets/img/bulba.jpg")},
];

embaralha(pecas);

function ajuda(){
  confirmAlert({
    title: "Ajuda",
    message:"Clique nas cartas para virá-las. Basta memoriza a posição de" +
    "cada carta e criar pares",
    buttons: [
      {
        label: 'Fechar',
      },
    ]
  })
}

function embaralha(pecas) {
  for (let i = pecas.length; i; i--) {
    const indiceAleatorio = Math.floor(Math.random() * i);
    const elemento = pecas[i - 1];
    pecas[i - 1] = pecas[indiceAleatorio];
    pecas[indiceAleatorio] = elemento;
  }
}

class App extends Component {
  state={
    pecas: pecas,
    duo: [],
    score: 0, 
    time: 0
  };

  submit = () => {
    confirmAlert({
      title: 'Parabéns, você ganhou!!!',
      buttons: [
        {
          label: 'Fechar',
          onClick: () => {this.reload()}
        },
      ]
    })
  };

  match = (duo) => {
    const {score} = this.state;
    if(duo[0].name === duo[1].name) {
      setTimeout(() => this.checkCartas(duo), 300);
      this.setState({
        score : score + 1
        }, () => {
        if(this.state.score === 12){
          this.submit();
        }}
      )
    }
    else {
      setTimeout(() => this.desvirarCartas(duo), 700);
    }
  }

  virarCarta = (peca) => {
    const {pecas} = this.state;
    peca.status = pieceStatus.FACE;
    const pecasClone = JSON.parse(JSON.stringify(pecas));
    const indexImg = pecasClone.findIndex((item) => {
      if(peca.id === item.id) {
        return true;
      }
      return false;
    });
    pecasClone[indexImg] = peca;
    this.setState({
      pecas : pecasClone
    });
    this.popular(peca);
  }

  desvirarCartas = (duo) => {
    const {pecas} = this.state;
    const pecasClone = JSON.parse(JSON.stringify(pecas));
    duo.forEach(piece => {
      const indexImg = pecasClone.findIndex(item => piece.id === item.id);
      pecasClone[indexImg].status = pieceStatus.BACK;
    });
    this.setState({
      pecas : pecasClone
    });
  }

  checkCartas = (duo) => {
    const {pecas} = this.state;
    const pecasClone = JSON.parse(JSON.stringify(pecas));
    duo.forEach(piece => {
      const indexImg = pecasClone.findIndex(item => piece.id === item.id);
      pecasClone[indexImg].status = pieceStatus.IS_MATCHED;
    })
    this.setState({
      pecas : pecasClone
    });
  }

  popular = (peca) => {
    const {duo} = this.state;
    const duoClone = JSON.parse(JSON.stringify(duo));
    duoClone.push(peca);
    this.setState({
      duo: duoClone
    },() => {
        if(this.state.duo.length === 2){
          this.match(this.state.duo);
          this.setState({
            duo : []
          })
        }
    })
  }

  reload = () => {
    window.location.reload()
  }

  render(){
    const {score, pecas, time} = this.state;
    return(
      <div className="container">
        <div className="cabecalho">
          <Header 
            funcao={ajuda}
            reload={this.reload}
            score={score}
            time={time}
          /> 
        </div>
        <div className="containerPecas">
          {pecas.map(peca => (
            <Piece
              key={peca.id}
              piece={peca}
              defaultImg={imgDefault}
              checkImg={imgCheck}
              virarCarta={this.virarCarta}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default App;