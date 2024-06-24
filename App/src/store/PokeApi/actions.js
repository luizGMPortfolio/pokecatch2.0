import axios from "axios";

const GetAllPokemons = async () => {
  try {
    var info = [];
    for (let j = 1; j <= 125; j++) {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/" + j + "/"
      );
      info.push(response.data);
    }
  } catch (error) {
    console.log(error);
  }
  return info;
};
const RandonNumber = (number) => {
  return Math.floor(Math.random() * number);
};
const RandonPokemon = async () => {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/" + RandonNumber(1025) + "/"
    );
    return response.data

  } catch (error) {
    console.log(error);
    setError(error.message);
  }
};
const RandonHowPokemons = async () => {
  try {

    const response = [
        await axios.get("https://pokeapi.co/api/v2/pokemon/" + RandonNumber(1025) + "/"),
        await axios.get("https://pokeapi.co/api/v2/pokemon/" + RandonNumber(1025) + "/"),
        await axios.get("https://pokeapi.co/api/v2/pokemon/" + RandonNumber(1025) + "/"),
        await axios.get("https://pokeapi.co/api/v2/pokemon/" + RandonNumber(1025) + "/"),
        RandonNumber(4)
    ]
    return response

} catch (error) {
    console.log(error);
    setError(error.message);
}
}


const FetchPokemon = async (rote, num, Allrote = null) => {

  try {
    if (Allrote) {
      const response = await axios.get(Allrote);
      return response.data
    }
    else {
      const response = await axios.get("https://pokeapi.co/api/v2/" + rote + "/" + num + "/");
      return response.data
    }

  } catch (error) {
    console.log(error);
  }

}


export { GetAllPokemons, RandonPokemon, RandonHowPokemons, FetchPokemon };
