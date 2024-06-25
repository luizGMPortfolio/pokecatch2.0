<template>
  <q-page class="flex flex-center" v-if="!info">
    <Navbar />

    <div class="pokedex">

      <div class="collections">
        <h2>Cards coletados</h2>
        <span>{{ cards.length }}/1025</span>
      </div>

      <div class="list">
        <div class="abas">
          <div :class="[aba == 'seus' ? 'activeAba' : '', 'seus']" @click="aba = 'seus'">
            <h2>Seus cards</h2>
          </div>
          <div :class="[aba == 'all' ? 'activeAba' : '', 'all']" @click="aba = 'all'">
            <h2>Todos</h2>
          </div>
        </div>
        <div v-if="pokemons && itens">
          <div bordered separator v-if="aba === 'all'" class="cards">
            <Card v-for="(pokemon, id) in pokemons" :key="id" :name=pokemon.name :img='pokemon.img' :types=pokemon.types
              :num=pokemon.num :style="pokemon.style" :setInfo="setInfo"/>
          </div>
          <div bordered separator v-if="aba === 'seus'" class="cards">
            <Card v-for="(item, id) in cards" :key="id" :name=item.name :img='item.img' :types=item.types :num=item.num
              :quant="item.quant" :setInfo="setInfo"/>
          </div>
        </div>
        <div bordered separator v-else class="cards">
          <Card v-for="n in 4" :key="n" :style="'back'" />
        </div>

      </div>


    </div>
  </q-page>
  <Info v-else :id="info" :setInfo="setInfo" />
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
import Card from 'src/components/Card.vue';
import Info from 'src/components/Info.vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import axios from 'axios';

defineOptions({
  name: 'PokedexPage',
  components: {
    Info,
  },
  data() {
    return {
      itens: null,
      cards: [],
      pokemons: [],
      erro: null,
      aba: 'seus',
      duplicate: null,
      info: null
    }
  },
  async mounted() {
    this.fetchItens()

  },
  computed: {
    ...mapState('Auth', ['user']),
    ...mapMutations('PokeApi', ['SETPOKEMONS']),
  },
  methods: {
    setInfo(value){
      this.info = value
    },
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
            this.duplicate = this.getDuplicateCounts(this.itens.cards.map((item) => {
              return item.num
            }))
            this.itens.cards.map((item) => {
              if (!this.cards) {
                this.cards.push({
                  name: item.name,
                  img: item.img,
                  types: item.types,
                  num: item.num,
                  quant: this.DuplicatePokemon(item.num)
                })

              }
              else {
                var igual = false
                this.cards.map((card) => {
                  if (card.num === item.num) {
                    igual = true
                  }
                })
                if (!igual) {
                  this.cards.push({
                    name: item.name,
                    img: item.img,
                    types: item.types,
                    num: item.num,
                    quant: this.DuplicatePokemon(item.num)
                  })
                }
              }

            })

            this.fetchData()

          });
        } catch (error) {
          console.log(error)
        }
      }, 500);

    },
    async fetchData() {
      try {
        for (let j = 1; j <= 1025; j++) {
          const response = await axios.get(
            "https://pokeapi.co/api/v2/pokemon/" + j + "/"
          );

          var dataType = []
          response.data.types.map(type => {
            dataType.push(type.type.name)

          })


          var Data = [...this.pokemons, {
            name: response.data.name,
            img: response.data.sprites.other['official-artwork'].front_default,
            types: dataType,
            num: response.data.id,
            style: 'uncatch'
          }]


          this.cards.map((card) => {
            if (card.num === response.data.id) {
              Data = [...this.pokemons, {
                name: response.data.name,
                img: response.data.sprites.other['official-artwork'].front_default,
                types: dataType,
                num: response.data.id,
                style: 'default'
              }]
            }
          })

          this.pokemons = Data


        }
      } catch (error) {
        console.log(error);
      }
    },
    getDuplicateCounts(arr) {
      const counts = arr.reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(counts).filter(([count]) => count > 1);
    },
    DuplicatePokemon(id) {
      // eslint-disable-next-line no-unused-vars
      var igual = false
      var q = 0
      this.duplicate.map((item) => {
        if (item[0] == id) {
          igual = true
          q = item[1]
        }

      })
      return q
    },
    ...mapActions('PokeApi', ['GetAllPokemons']),

  }
});
</script>


<style>
.pokedex {
  width: 100%;
  min-height: 100vh;
  scroll-behavior: smooth;
  background-color: #035ce2;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.filters {
  height: 150px;
}

.list {
  height: 80%;
}

.abas {
  width: 100%;
  height: 10%;
  display: flex;
  color: #2b2b2b;
}

.seus,
.all {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  cursor: pointer;
}

.seus h2,
.all h2 {
  width: 100%;
  text-align: center;
  padding: 10px 0;
}

.activeAba {
  background-color: #ffffff69;
  cursor: inherit;
}


.Search {
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.Search input {
  width: 550px;
  height: 50px;
  border-radius: 30px;
  border: none;
  background-color: #ffffff69;
  padding-left: 20px;
  font-weight: bold;
}

.Search input::placeholder {
  color: #2b2b2b;
}

.filter {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.select {
  padding: 0 20px;
  height: 100%;
  border-radius: 15px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  letter-spacing: 1px;
  cursor: pointer;
}

.f-types,
.f-Region,
.f-generations {
  height: 30px;

}

.options {
  width: 100%;
  padding: 2px;
  margin: 0;
  position: relative;
  text-align: center;
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;
  background-color: #ffffff69;
  border-radius: 10px;
}

.options li {
  width: 90%;
  height: 25px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #3E2D25;
}

.options li:hover {
  background-color: #929292;
}

.show {
  display: flex;
  z-index: 10;
}

.type,
.Generations,
.Gen,
.Region {
  background-color: #ffffff69;
  color: #2b2b2b;
}

.collections{

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.collections span{
  font-size: 30px;
  font-weight: bold;

}
</style>
