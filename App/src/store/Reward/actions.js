
import pokebola from 'src/assets/pokebolas/padão.svg'
import greatBall from 'src/assets/pokebolas/greatBall.svg'
import ultraBall from 'src/assets/pokebolas/ultraBall.svg'
import masterBall from 'src/assets/pokebolas/masterBall.svg'


const RandonPokeball = async () => {
  try {
    const RandonNunber = Math.floor(Math.random() * 100);
    var data = {};
    if (RandonNunber === 0) {
      data = {
        imagem: masterBall,
        quantidade: 1,
        pokebolas: {
          pokebola: 0,
          great: 0,
          ultra: 0,
          master: 1,
        },
      };
    } else if (RandonNunber <= 15) {
      const RandonNunber = Math.floor(Math.random() * 2);
      data = {
        imagem: ultraBall,
        quantidade: RandonNunber + 1,
        pokebolas: {
          pokebola: 0,
          great: 0,
          ultra: RandonNunber + 1,
          master: 0,
        },
      };
    } else if (RandonNunber <= 25) {
      const RandonNunber = Math.floor(Math.random() * 3);
      data = {
        imagem: greatBall,
        quantidade: RandonNunber + 2,
        pokebolas: {
          pokebola: 0,
          great: RandonNunber + 2,
          ultra: 0,
          master: 0,
        },
      };
    } else if (RandonNunber <= 100) {
      const RandonNunber = Math.floor(Math.random() * 4);
      data = {
        imagem: pokebola,
        quantidade: RandonNunber + 4,
        pokebolas: {
          pokebola: RandonNunber + 4,
          great: 0,
          ultra: 0,
          master: 0,
        },
      };
    }

    return data;
  } catch (error) {
    console.log(error);
  }

};

export{RandonPokeball}
