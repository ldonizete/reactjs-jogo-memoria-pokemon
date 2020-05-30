import React from 'react';
import { pieceStatus } from '../constants';

function Piece (props) {
  function virar() {
    const {piece, virarCarta} = props;
    if(piece.status === pieceStatus.BACK) {
      virarCarta({...piece});
    }
  }

  function renderImg (piece) {
    const {defaultImg, checkImg} = props;
      switch (piece.status){
        case pieceStatus.BACK:
          return <img src={defaultImg} onClick={virar}/>;
        case pieceStatus.FACE:
          return <img src={piece.imgPath}/>;
        case pieceStatus.IS_MATCHED:
          return <img src={checkImg}/>;
      }
  }
  
  const {piece} = props;
  return (
    <div>
      <figure className="cards">
        {renderImg(piece)}
      </figure>
    </div>
  );
}

export default Piece;