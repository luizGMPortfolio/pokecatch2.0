<template>
  <q-page class="flex flex-center">
    <Navbar />
    <div class="How">
      <div class='title'>
        <h2>Quem é esse</h2>
        <h1>Pokemon?</h1>
      </div>
      <div class='cardHow' v-if="trys != 0" v-show="trys">
        <Card :name="pokemon.name" :img="pokemon.img" :types="pokemon.types" :num="pokemon.num" :style="'hidden'"
          v-if="pokemon" />
      </div>
      <div class='choises' v-if="trys != 0" v-show="trys">
        <ul>
          <li :class="choise[0]" v-if="choise" v-on:click="CheckChoise(choise[0])">{{ choise[0] }}</li>
          <li :class="choise[1]" v-if="choise" v-on:click="CheckChoise(choise[1])">{{ choise[1] }}</li>
          <li :class="choise[2]" v-if="choise" v-on:click="CheckChoise(choise[2])">{{ choise[2] }}</li>
          <li :class="choise[3]" v-if="choise" v-on:click="CheckChoise(choise[3])">{{ choise[3] }}</li>
        </ul>
      </div>
      <div class="cardHow" v-if="trys == 0">
        <Card :style="'back'"/>
      </div>
      <div class="choises" v-if="trys == 0">
        <ul>
          <li>
            <Timer />
          </li>
        </ul>

      </div>
    </div>
  </q-page>
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

import Navbar from 'src/components/Navbar.vue';
import Card from 'src/components/Card.vue'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import { RandonHowPokemons } from 'src/store/PokeApi/actions';
import { RandonPokeball } from 'src/store/Reward/actions';

import { computed } from 'vue';
import { UpdateDocuments } from 'src/store/Cloud/actions';
import Timer from "src/components/Timer.vue";

defineOptions({
  name: 'HowPage',
  components: {
    Timer
  },
  data() {
    return {
      pokemon: null,
      choise: null,
      pokebola: null,
      trys: null,
      chances: 1
    }
  },
  async created() {
    this.Setup()
  },
  async mounted() {
    this.fetchConfigs()
  },
  methods: {
    async Setup() {
      this.pokebola = await RandonPokeball()
      const data = await RandonHowPokemons()
      this.choise = [data[0].data.name, data[1].data.name, data[2].data.name, data[3].data.name]
      var dataType = []
      data[data[4]].data.types.map(type => {
        dataType.push(type.type.name)

      })
      this.pokemon = {
        name: data[data[4]].data.name,
        img: data[data[4]].data.sprites.other['official-artwork'].front_default,
        types: dataType,
        num: data[data[4]].data.id
      }
    },
    CheckChoise(choise) {
      if (this.pokemon.name == choise) {
        var id = document.getElementsByClassName(choise)[0];
        id.classList.add('certo')

        this.trys = this.trys - 1
        UpdateDocuments('Configs', this.configs.id, {
            pokemons: this.trys
          })

        const NewRewards = {
          pokemon: this.pokemon,
          pokebolas: this.pokebola
        }
        console.log(NewRewards)
        this.SETREWARDS(NewRewards)

      } else {
        var id = document.getElementsByClassName(choise)[0];
        id.classList.add('errado')
        this.chances = this.chances - 1
        if(this.chances === 0){
          this.Setup()
        }

      }
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
            this.trys = this.configs.pokemons
            console.log(this.trys)
          });
        } catch (error) {
          console.log(error)
        }
      }, 500);
    },
    ...mapActions('PokeApi', ['RandonHowPokemons']),
    ...mapMutations('Reward', ['SETREWARDS']),
    ...mapActions('Reward', ['RandonPokeball']),
    ...mapActions('Cloud', ['UpdateDocuments']),
  },
  computed: {
    ...mapState('Reward', ['Rewards']),
    ...mapState('Auth', ['user']),
  }

});
</script>



<style>
.How {
  width: 100%;
  height: 100vh;
  background: url('../assets/backgrounds/How.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}

.cardHow {
  height: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-3px);
  }
}

.choises {
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.choises ul {
  display: flex;
  list-style: none;
  gap: 20px;
  font-family: "Slackey", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 20px;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
}

.choises li {
  background-color: #24242450;
  color: #fff;
  padding: 10px;
  border-radius: 10px;
  font-size: 25px;
}

.choises li:hover {
  background-color: #242424;
  cursor: pointer;
  transition: 300ms;
}

.errado {
  background-color: #d10000 !important;
  opacity: 0.5;
  cursor: inherit;
}

.certo {
  background-color: #04d816 !important;
}
</style>
