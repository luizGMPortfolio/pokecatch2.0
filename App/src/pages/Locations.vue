<template>
  <div :class='"location" + " " + paramValue'>
    <header>
      <div class='ContagemLocation'>
        <span class='text'>Next update</span>
        <Timer />
      </div>
      <div class='back' >
        <q-item :to="'/'">
          <img src="../assets/Icones/back.png" alt="">
        </q-item>
      </div>
    </header>
    <div class='possibilities'>
      <div className="list">
        <img v-for="(pokemon, id) in pokemons" :key="id" :src="pokemon">
      </div>
    </div>
    <div class='enconter'>
      <img :src="pokemon.img" alt="" v-if="pokemon" id='pokeEnconter'>
    </div>
    <menu class="menu">
      <div class="pokeball" :class="active ? 'cliked' : ''">
        <div class="ultra" v-if="itens" :class="active ? '' : 'hide'" @click="startAnimation('ultra')">
          <span>{{ itens.pokebolas.ultra }}</span>
        </div>
        <div class="pokebola" v-if="itens" v-bind:class="active ? '' : 'hide'" @click="startAnimation('pokebola')">
          <span>{{ itens.pokebolas.pokebola }}</span>
        </div>

        <img :src="blackPoke" alt="" :class="active ? 'clikedImg' : ''" @click="OpenMenu" id="BlackPoke">

        <div class="great" v-if="itens" v-bind:class="active ? '' : 'hide'" @click="startAnimation('great')">
          <span>{{ itens.pokebolas.great }}</span>
        </div>
        <div class="master" v-if="itens" v-bind:class="active ? '' : 'hide'" @click="startAnimation('master')">
          <span>{{ itens.pokebolas.master }}</span>
        </div>
      </div>
    </menu>

    <div id='throwPokeball' :class="['throwPokeball', ImgPokeball, IsAnimating ? 'animation' : '']"
      v-on:animationend="handleAnimationEnd">
    </div>

    <div id='check' class="check" v-bind:class="ImgPokeball" v-on:animationend="TryCatch(ImgPokeball)"></div>

  </div>
</template>

<script setup>

import { db } from "src/firebase/Configs";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";

import Timer from 'src/components/Timer.vue';

import pokebola from 'src/assets/pokebolas/padão.svg'
import greatball from 'src/assets/pokebolas/greatBall.svg'
import ultraball from 'src/assets/pokebolas/ultraBall.svg'
import masterball from 'src/assets/pokebolas/masterBall.svg'

import blackPoke from '../assets/Icones/BlackPokeball.png'

import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import { FetchPokemon } from "src/store/PokeApi/actions";
import { UpdateDocuments } from "src/store/Cloud/actions";
import { RandonHowPokemons } from "src/store/PokeApi/actions";
import { SETREWARDS } from "src/store/Reward/mutations";
import { RandonPokeball } from "src/store/Reward/actions";


defineOptions({
  name: 'LocationsPage',
  components: {
    Timer
  },
  data() {
    return {
      paramValue: '',
      pokemons: null,
      pokemon: null,
      pokebolas: null,
      active: false,
      itens: null,
      configs: null,
      location: null,
      capture_rate: null,
      isAnimating: false,
      ImgPokeball: '',
      enconter: null
    }
  },
  async mounted() {
    this.paramValue = this.$route.params.id;
    this.fetchItens()
    this.fetchStatus().then(() => {
      setTimeout(() => {
        UpdateDocuments('status', this.status.id, {
          enconters: this.enconter + 1
        })
      }, 1000)

    })
    this.fetchConfigs()
    this.pokebolas = await RandonPokeball();


  },
  computed: {
    ...mapState('Auth', ['user']),
    ...mapState('Cloud', ['document']),

  },
  methods: {

    ...mapGetters('Auth', ['getUser']),

    ...mapActions('Cloud', ['GetDocuments']),

    ...mapMutations('Cloud', ['SETDOCUMENT']),

    ...mapActions('Reward', ['RandonPokeball']),

    ...mapMutations('Reward', ['SETREWARDS']),

    ...mapActions('PokeApi', ['FetchPokemon']),

    ...mapActions('Cloud', ['UpdateDocuments']),

    async fetchItens() {
      const collectionRef = await collection(db, 'itens');


      setTimeout(async () => {

        let q;
        try {
          q = await query(
            collectionRef,
            where("uid", "==", await this.user.uid),
            orderBy("createdAt", "desc")
          );

          await onSnapshot(q, (querySnapshot) => {
            const data = (
              querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
            );
            this.itens = data[0]
          });
        } catch (error) {
          console.log(error)
        }
      }, 500);

    },
    async fetchStatus() {

      const collectionRef = await collection(db, 'status');

      setTimeout(async () => {
        let q;
        try {
          q = await query(
            collectionRef,
            where("uid", "==", await this.user.uid),
            orderBy("createdAt", "desc")
          );

          await onSnapshot(q, async (querySnapshot) => {
            const data = (
              querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
            );
            this.status = data[0]
            this.enconter = data[0].enconters

          });
        } catch (error) {

          console.log(error)
        }
      }, 500);


    },
    async fetchConfigs() {
      const collectionRef = await collection(db, 'Configs');

      setTimeout(async () => {
        let q;
        try {
          q = await query(
            collectionRef,
            where("uid", "==", await this.user.uid),
            orderBy("createdAt", "desc")
          );

          await onSnapshot(q, (querySnapshot) => {
            const data = (
              querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
            );
            this.configs = data[0]
            this.setLocation(this.configs)
            this.GetPokemon()
          });
        } catch (error) {
          console.log(error)
        }
      }, 500);
    },
    async setLocation(value) {
      switch (this.paramValue) {
        case 'forest':
          this.location = value.locations.forest
          break
        case 'cave':
          this.location = value.locations.cave
          break
        case 'mountain':
          this.location = value.locations.mountain
          break
        case 'beach':
          this.location = value.locations.beach
          break
        case 'desert':
          this.location = value.locations.desert
          break
        case 'vulcano':
          this.location = value.locations.vulcano
          break
        case 'HantedHouse':
          this.location = value.locations.HantedHouse
          break
      }

    },
    async GetPokemon() {
      try {
        const num = Math.floor(Math.random() * 9)
        const info = []

        for (let index = 0; index < 9; index++) {

          const p = await FetchPokemon('pokemon', this.location[index])

          if (num === index) {

            var dataType = []
            p.types.map(type => {
              dataType.push(type.type.name)

            })
            this.pokemon = {
              name: p.name,
              img: p.sprites.other['official-artwork'].front_default,
              types: dataType,
              num: p.id
            }

            const i = await FetchPokemon('pokemon-species', this.location[index])
            this.capture_rate = i.capture_rate
          }
          info.push(p.sprites.other['official-artwork'].front_default)
        }
        this.pokemons = info
      } catch (error) {
        console.log(error)
      }


    },
    OpenMenu() {
      if (!this.active) {
        this.active = true
      }
      else {
        this.active = false
      }

    },
    startAnimation(clas) {
      if (this.itens.pokebolas[clas] != 0) {
        this.ImgPokeball = clas
        this.IsAnimating = false
        void document.getElementById('throwPokeball').offsetWidth;

        this.IsAnimating = true
      }

    },
    handleAnimationEnd() {
      this.IsAnimating = false
      void document.getElementById('pokeEnconter').classList.add('PokCatch')
      void document.getElementById('check').offsetWidth;
      void document.getElementById('check').classList.add('animation2')
    },
    async TryCatch(pokeball) {
      this.ImgPokeball = ''
      void document.getElementById('check').classList.remove('animation2')
      var data = null
      var difficulty = 0;
      const num = Math.floor(Math.random() * 100);

      if (this.capture_rate > 70) {
        difficulty = 30
      }
      else {
        difficulty = this.capture_rate - 20
        if (difficulty < 1) {
          difficulty = 1
        }
      }


      switch (pokeball) {
        case 'great':
          if (this.itens.pokebolas.great != 0) {
            data = {
              pokemons: this.pokemon,
              pokebolas: {
                pokebola: this.itens.pokebolas.pokebola,
                great: this.itens.pokebolas.great - 1,
                ultra: this.itens.pokebolas.ultra,
                master: this.itens.pokebolas.master
              },

            }
          }

          difficulty = difficulty + 10
          break
        case 'ultra':
          if (this.itens.pokebolas.ultra != 0) {
            data = {
              pokemons: this.pokemon,
              pokebolas: {
                pokebola: this.itens.pokebolas.pokebola,
                great: this.itens.pokebolas.great,
                ultra: this.itens.pokebolas.ultra - 1,
                master: this.itens.pokebolas.master
              },

            }
          }

          difficulty = difficulty + 25
          break
        case 'master':
          if (this.itens.pokebolas.master != 0) {
            data = {
              pokemons: this.pokemon,
              pokebolas: {
                pokebola: this.itens.pokebolas.pokebola,
                great: this.itens.pokebolas.great,
                ultra: this.itens.pokebolas.ultra,
                master: this.itens.pokebolas.master - 1
              },

            }
          }

          difficulty = +1000
          break
        default:
          if (this.itens.pokebolas.pokebola != 0) {
            data = {
              pokemons: this.pokemon,
              pokebolas: {
                pokebola: this.itens.pokebolas.pokebola - 1,
                great: this.itens.pokebolas.great,
                ultra: this.itens.pokebolas.ultra,
                master: this.itens.pokebolas.master
              },

            }
          }
          break
      }

      if (data) {
        UpdateDocuments('itens', this.itens.id, data);

        if (num < difficulty) {

          const NewRewards = {
            pokemon: this.pokemon,
            pokebolas: this.pokebolas
          }
          this.SETREWARDS(NewRewards)
        }
        else {
          void document.getElementById('pokeEnconter').classList.remove('PokCatch')

        }
      }




    }

  }
});
</script>


<style>
.location {
  width: 100%;
  min-height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

}

.location header {
  margin: 0 auto;
  width: 90%;
  display: flex;
  justify-content: space-between;
}

.location .ContagemLocation {
  color: #000000;
  background-color: #ffffff94;
  border-radius: 35px;
  width: initial;
  padding: 10px;
}

.possibilities {
  margin: 0 auto;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
}

.possibilities .list {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff94;
  border-radius: 70px;
  padding: 10px;
  margin: 0 5px;
  flex-wrap: wrap;
}

.ContagemLocation {
  width: 35%;
  display: flex;
  flex-direction: column;
  font-family: "Inter", sans-serif;
  font-weight: bold;
  margin: 10px 0;
  text-align: center;
}

.ContagemLocation .text {
  font-size: 20px;
}

.ContagemLocation .time {
  font-size: 40px;
}

.possibilities img {
  width: 50px;
  height: 50px;
  filter: brightness(0);
  transition: 100ms;
}

.possibilities img:hover {
  transform: translatey(-10px);
}

.back {
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.back img {
  scale: 0.7;
  background-color: #ffffff94;
  border-radius: 50%;
  padding: 7px;
  cursor: pointer;
}

.back img:hover {
  background-color: #ffffffcb;
}

.enconter {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
}

.enconter img {
  width: 280px;
  height: 280px;
  animation: jump 4s infinite, rotate 15s infinite;
  transition: 200ms;
}

@keyframes jump {
  0% {
    transform: translatey(0);
    animation-timing-function: cubic-bezier(0.28, 0.84, 0.42, 1);
  }

  5% {
    transform: translatey(-10px);
  }

  10% {
    transform: translatey(0);
    animation-timing-function: cubic-bezier(0.28, 0.84, 0.42, 1);
  }

  15% {
    transform: translatey(-10px);
  }

  20% {
    transform: translatey(0);
    animation-timing-function: cubic-bezier(0.28, 0.84, 0.42, 1);
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.28, 0.84, 0.42, 1);
  }

  1% {
    transform: rotate(-10deg);
  }

  2% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.28, 0.84, 0.42, 1);
  }

  3% {
    transform: rotate(-10deg);
  }

  4% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.28, 0.84, 0.42, 1);
  }
}

.forest {
  background: url('../assets/backgrounds/forest.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.cave {
  background: url('../assets/backgrounds/cave.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.mountain {
  background: url('../assets/backgrounds/montain.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.beach {
  background: url('../assets/backgrounds/beach.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.desert {
  background: url('../assets/backgrounds/desert.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.vulcano {
  background: url('../assets/backgrounds/vulcano.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.HantedHouse {
  background: url('../assets/backgrounds/hanted.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}



.menu {
  display: flex;
  height: 70px;
  align-items: center;
  justify-content: center;
  z-index: 100;
  transition: 200ms;
  padding: 0;
  margin: 0;
  box-sizing: initial;

}

#BlackPoke{
  cursor: pointer;
}
.pokeballs {
  position: absolute;
  top: 10px;
  display: flex;
  background-color: #08358ecb;
  height: 50px;
  width: 30%;
  list-style: none;
  padding: 5px;
  border-radius: 50px;
  justify-content: space-around;
  animation: opacity 1s;
}


@keyframes opacity {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.pokeballs img {
  width: 40px;
  height: 100%;
  transition: 1s;
}

.pokeball {
  transition: 300ms;
  padding: 6px;
  background-color: #3a3a3a94;
  display: flex;
  justify-content: space-around;
  height: 50px;
  border-radius: 30px;


}

.pokeball img {
  transition: 300ms;
  width: 50px;
  height: 50px;
}

.pokeball span {
  z-index: 101;
  text-align: center;
}

.pokeball div {
  cursor: pointer;
}

.cliked {
  transition: 300ms;
  width: 50%;
  max-width: 400px;
  min-width: 300px;
}

.clikedImg {
  transform: rotate(-360deg);
}

.hide {
  display: none !important;
}

.pokebola {
  background: url('../assets/pokebolas/padão.svg');
  background-position: center;
  background-size: cover;
}

.pokeball div {
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: end;
  color: #868686;
  font-size: 15px;
  font-weight: bold;
}

.great {
  background: url('../assets/pokebolas/greatBall.svg');
  background-position: center;
  background-size: cover;
}

.ultra {
  background: url('../assets/pokebolas/ultraBall.svg');
  background-position: center;
  background-size: cover;
}

.master {
  background: url('../assets/pokebolas/masterBall.svg');
  background-position: center;
  background-size: cover;
}

.throwPokeball {
  position: absolute;
  width: 50px;
  height: 50px;
  bottom: 50px;
  left: -50px;

}

.check {
  position: absolute;
  width: 50px;
  height: 50px;
  bottom: 40%;
  left: 50%;
  display: none;
}

.animation {
  animation: throw 1s forwards;
}

.animation2 {
  display: flex;
  transition: 200ms;
  animation: try 1s ease-in-out 3;
}

.PokCatch {
  scale: 0;
}

.vazio {
  transition: 100ms;
  opacity: 0.3;
}

.q-item {
  border-radius: 50%;
}

@keyframes throw {
  0% {
    bottom: 50px;
    left: -50px;
  }

  100% {
    bottom: 40%;
    left: 50%;
    transform: rotate(1080deg);
  }
}

@keyframes try {
  0% {
    bottom: 40%;
    left: 50%;
    transform: rotate(10deg);
  }

  50% {
    bottom: 40%;
    left: 50%;
    transform: rotate(-10deg);
  }

  100% {
    bottom: 40%;
    left: 50%;
    transform: rotate(10deg);
  }
}

@keyframes Catch {
  0% {
    scale: 1;
  }

  100% {
    scale: 0;
  }
}
</style>
