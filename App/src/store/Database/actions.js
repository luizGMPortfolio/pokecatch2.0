import { database } from "src/firebase/Configs";
import { ref, get, child } from "firebase/database";

const GetDocuments = async (path) => {

  const dbRef = ref(database);
  try {
    const snapshot = await get(child(dbRef, path));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.log(error);
    setError(error.message);
  }
};

const RandowPokemonsLocations = (types) => {
  const type = [];

  for (let index = 0; index < 9; index++) {
    const number = Math.floor(Math.random() * 100);
    var t = [];
    var num = 0;

    if (number > 50) {
      t = types[0];
      num = Math.floor(Math.random() * t.length);
    } else if (number > 35) {
      t = types[1];
      num = Math.floor(Math.random() * t.length);
    } else if (number > 25) {
      t = types[2];
      num = Math.floor(Math.random() * t.length);
    } else if (number > 15) {
      t = types[3];
      num = Math.floor(Math.random() * t.length);
    } else if (number > 10) {
      t = types[4];
      num = Math.floor(Math.random() * t.length);
    } else {
      t = types[5];
      num = Math.floor(Math.random() * t.length);
    }

    type.map((item) => {
      if (item === t[num]) {
        num = Math.floor(Math.random() * t.length);
      }
    });
    type.push(t[num]);
  }

  return type;
};

const ChangeLocations = async (filters) => {
  const forest = [
    filters.grass,
    filters.bug,
    filters.poison,
    filters.normal,
    filters.water,
    filters.flying,
  ];
  const cave = [
    filters.rock,
    filters.ground,
    filters.fighting,
    filters.dark,
    filters.ghost,
    filters.grass,
  ];
  const mountain = [
    filters.flying,
    filters.rock,
    filters.ice,
    filters.electric,
    filters.dragon,
    filters.fire,
  ];
  const beach = [
    filters.water,
    filters.grass,
    filters.flying,
    filters.fairy,
    filters.ice,
    filters.psychic,
  ];
  const desert = [
    filters.ground,
    filters.rock,
    filters.electric,
    filters.psychic,
    filters.fire,
    filters.fighting,
  ];
  const vulcano = [
    filters.fire,
    filters.rock,
    filters.dragon,
    filters.normal,
    filters.fighting,
    filters.poison,
  ];
  const HantedHouse = [
    filters.ghost,
    filters.dark,
    filters.psychic,
    filters.normal,
    filters.fairy,
    filters.ice,
  ];

  const data = {
    forest: RandowPokemonsLocations(forest),
    cave: RandowPokemonsLocations(cave),
    mountain: RandowPokemonsLocations(mountain),
    beach: RandowPokemonsLocations(beach),
    desert: RandowPokemonsLocations(desert),
    vulcano: RandowPokemonsLocations(vulcano),
    HantedHouse: RandowPokemonsLocations(HantedHouse),
  };

  return data
};

const NewLocations = async () =>{
  const res = await GetDocuments('filters');
  return ChangeLocations(res)
}

export { GetDocuments, ChangeLocations, NewLocations };
