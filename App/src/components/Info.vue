<template>
  <div class="info" v-if="pokemon">
    <div class="header">
      <span>N°{{ pokemon.id }}</span>
      <button @click="handleButton" class="btn-default">
        X
      </button>
    </div>
    <img :src="pokemon.sprites.other['official-artwork'].front_default" />
    <h3>{{ pokemon.name }}</h3>

    <div class="types">
      <div :class='"type1 " + type' v-for="(type, id) in GetType()" v-bind:key="id">
        <span>{{ type }}</span>
      </div>
    </div>

    <div class='constainer'>
      <div class='abas'>
        <div :class="['sobre', aba == 'sobre' ? 'activeAba' : '']" @click="this.aba = 'sobre'">
          <h2>Sobre</h2>
        </div>
        <div :class="['moves', aba == 'moves' ? 'activeAba' : '']" @click="this.aba = 'moves'">
          <h2>Moves</h2>
        </div>
        <div :class="['status', aba == 'status' ? 'activeAba' : '']" @click="this.aba = 'status'">
          <h2>Status</h2>
        </div>
      </div>
      <div class="informacoes" v-if="specie">
        <div v-if="aba == 'sobre'">
          <div class="class">
            <span :class="stage">{{ stage }}</span>
            <span :class="type">{{ type }}</span>
          </div>
          <div class="evolves" v-if="evolves_chain">
            <div>
              <h2>Evolves</h2>
              <img :src="item.sprites.other['official-artwork'].front_default" alt=""
                v-for="(item, id) in evolves_chain" :key="id" />
            </div>

          </div>
          <div class="varieties" v-if="varieties != 0">
            <div>
              <h2>Forms</h2>
              <img :src="item.sprites.other['official-artwork'].front_default" alt="" v-for="(item, id) in varieties"
                :key="id" class="varietiesImg" />
            </div>
          </div>
          <div class="shiny">
            <div>
              <h2>Shiny</h2>
              <img :src="pokemon.sprites.other['official-artwork'].front_shiny" alt="" srcset="" />
            </div>
          </div>
          <div class="vantagens" v-if="damages">
            <h2>Vantagens</h2>
            <div>
              <h4>Effective</h4>

              <div class="types">
                <div :class='"type1 " + type' v-for="(type, id) in GetVeryEfective()" v-bind:key="id">
                  <span>{{ type }}</span>
                </div>

              </div>
              <div>

                <h4>Resistence</h4>

                <div>
                  <h5>2x</h5>
                  <div class="types">
                    <div :class='"type1 " + type' v-for="(type, id) in GetResistence()[0]" v-bind:key="id">
                      <span>{{ type }}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h5>4x</h5>
                  <div class="types">
                    <div :class='"type1 " + type' v-for="(type, id) in GetResistence()[1]" v-bind:key="id">
                      <span>{{ type }}</span>
                    </div>
                  </div>
                </div>


              </div>

              <div v-if="aba == 'moves'">
                <div class="habilits"></div>
                <div class="move"></div>
              </div>
              <div v-if="aba == 'status'">
                <div class="stats"></div>
                <div class="hates"></div>
                <div class="ight"></div>
              </div>

            </div>
          </div>
          <div class="desvantagens" v-if="damages">
            <h2>Desvantagens</h2>
            <div>
              <h4>LowEffective</h4>
              <div class="types">
                <div :class='"type1 " + type' v-for="(type, id) in GetLowEffective()" v-bind:key="id">
                  <span>{{ type }}</span>
                </div>
              </div>
            </div>
            <div>
              <h4>LowResistence</h4>
              <div>
                <h5>2x</h5>
                <div class="types">
                  <div :class='"type1 " + type' v-for="(type, id) in GetLowResistence()[0]" v-bind:key="id">
                    <span>{{ type }}</span>
                  </div>
                </div>
              </div>
              <div>
                <h5>4x</h5>
                <div class="types">
                  <div :class='"type1 " + type' v-for="(type, id) in GetLowResistence()[1]" v-bind:key="id">
                    <span>{{ type }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="aba == 'moves'">
          <div class="habilits">
            <h2>Habilidades</h2>
            <div>
              <span v-for="(item, id) in this.pokemon.abilities" :key="id">{{ item.ability.name }}</span>
            </div>
          </div>
          <div class="move">
            <h2>Moves</h2>
            <div v-for="(move, id) in this.pokemon.moves" :key="id">
              <span>{{ move.move.name }}</span>
              <span>{{ move.version_group_details[0].move_learn_method.name }}</span>
              <span>{{ move.version_group_details[0].level_learned_at }}</span>
            </div>
          </div>
        </div>
        <div v-if="aba == 'status'">
          <div class="stats">
            <h2>Status base</h2>
            <span>
              <p>{{ pokemon.stats[0].stat.name }}:</p>
              <p>{{ pokemon.stats[0].base_stat }}</p>
            </span>
            <span>
              <p>{{ pokemon.stats[1].stat.name }}:</p>
              <p>{{ pokemon.stats[1].base_stat }}</p>
            </span>
            <span>
              <p>{{ pokemon.stats[2].stat.name }}:</p>
              <p>{{ pokemon.stats[2].base_stat }}</p>
            </span>
            <span>
              <p>{{ pokemon.stats[3].stat.name }}:</p>
              <p>{{ pokemon.stats[3].base_stat }}</p>
            </span>
            <span>
              <p>{{ pokemon.stats[4].stat.name }}:</p>
              <p>{{ pokemon.stats[4].base_stat }}</p>
            </span>
            <span>
              <p>{{ pokemon.stats[5].stat.name }}:</p>
              <p>{{ pokemon.stats[5].base_stat }}</p>
            </span>
          </div>
          <div class="hates">
            <div><span>base_happiness: </span> {{ this.specie.base_happiness }}</div>
            <div><span>capture_rate: </span> {{ this.specie.capture_rate }}</div>
          </div>
          <div class="ight">
            <div><span>Height:</span> {{ pokemon.height }}</div>
            <div><span>Weight:</span> {{ pokemon.weight }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

import { mapActions } from 'vuex'

import { FetchPokemon } from 'src/store/PokeApi/actions';

defineOptions({
  name: 'InfoLink',
  data() {
    return {
      pokemon: null,
      specie: null,
      evolves: null,
      evolves_chain: null,
      stage: null,
      type: null,
      varieties: null,
      damages: null,
      VeryEfective: null,
      LowEffective: null,
      Resistence: null,
      DoubleResistence: null,
      aba: 'sobre'
    }
  },
  async mounted() {
    this.GetData()
  },
  computed: {
  },
  methods: {
    ...mapActions('PokeApi', ['FetchPokemon']),
    handleButton() {
      this.setInfo(null)
    },
    async GetData() {
      this.pokemon = await FetchPokemon('pokemon', this.id)
      this.specie = await FetchPokemon('pokemon-species', this.id)
      this.evolves = await FetchPokemon(null, null, this.specie.evolution_chain.url)
      this.GetClass()
      this.GetChainEvolves()
      this.GetVarieties()
      this.Getdamages()
      this.GetResistence()
      this.GetLowEffective()
      setTimeout(() => {
        this.GetEvolveStage()
      }, 200)

    },
    GetEvolveStage() {
      console.log(this.evolves.chain)
      if (this.evolves.chain.evolves_to.length == 0) {
        this.stage = 'Unic'
      }
      else if (this.evolves.chain.species.name === this.pokemon.name) {
        this.stage = 'Initial'
      }
      else if (this.evolves.chain.evolves_to[0].species.name === this.pokemon.name) {
        if (!this.evolves.chain.evolves_to[0].evolves_to[0]) {
          this.stage = 'Final'
        }
        else {
          this.stage = 'Medium'
        }

      }
      else if (this.evolves.chain.evolves_to[0].evolves_to[0].species.name === this.pokemon.name) {
        this.stage = 'Final'
      }

    },
    GetClass() {
      if (this.specie.is_legendary) {
        this.type = 'Legendary'
      }
      else if (this.specie.is_mythical) {
        this.type = 'Mythical'
      }
      else if (this.specie.is_baby) {
        this.type = 'Baby'
      }
      else {
        this.type = 'Normal'
      }
    },
    async GetChainEvolves() {
      const ChainEvolves = []

      ChainEvolves.push(await FetchPokemon('pokemon', this.evolves.chain.species.name))

      if (this.evolves.chain.evolves_to[0]) {
        ChainEvolves.push(await FetchPokemon('pokemon', this.evolves.chain.evolves_to[0].species.name))
      }
      if (this.evolves.chain.evolves_to[0].evolves_to[0]) {
        ChainEvolves.push(await FetchPokemon('pokemon', this.evolves.chain.evolves_to[0].evolves_to[0].species.name))
      }

      this.evolves_chain = ChainEvolves

    },
    async GetVarieties() {
      const varietiesData = []
      this.specie.varieties.map(async (varietie) => {
        if (!varietie.is_default) {
          varietiesData.push(await FetchPokemon(null, null, varietie.pokemon.url))
        }
      })
      this.varieties = varietiesData
    },
    async Getdamages() {
      const dataType = []
      this.pokemon.types.map(async (type) => {
        dataType.push(await FetchPokemon(null, null, type.type.url))
      })

      this.damages = dataType
    },
    GetVeryEfective() {
      const types = []
      this.damages.map((damage) => {
        damage.damage_relations.double_damage_to.map((type) => {
          types.push(type.name)
        })
      })
      const VeryEfective = types.filter((item, index) => types.indexOf(item) === index)

      return VeryEfective
    },
    getUniqueItems(arr) {
      const counts = arr.reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
      }, {});

      return arr.filter(item => counts[item] === 1);
    },
    GetResistence() {
      const types = []
      this.damages.map((damage) => {
        damage.damage_relations.half_damage_from.map((type) => {
          if (type)
            types.push(type.name)
        })
      })
      const DoubleResistence = types.filter((item, index) => types.indexOf(item) !== types.lastIndexOf(item) && types.indexOf(item) === index);
      const resistence = this.getUniqueItems(types)

      return [resistence, DoubleResistence]
    },
    GetLowEffective() {
      const types = []
      this.damages.map((damage) => {
        damage.damage_relations.half_damage_to.map((type) => {
          if (type)
            types.push(type.name)
        })
      })
      const VeryEfective = types.filter((item, index) => types.indexOf(item) === index)

      return VeryEfective

    },
    GetLowResistence() {
      const types = []
      this.damages.map((damage) => {
        damage.damage_relations.double_damage_from.map((type) => {
          if (type)
            types.push(type.name)
        })
      })
      const DoubleResistence = types.filter((item, index) => types.indexOf(item) !== types.lastIndexOf(item) && types.indexOf(item) === index);
      const resistence = this.getUniqueItems(types)

      return [resistence, DoubleResistence]
    },
    GetType() {
      var dataType = []
      this.pokemon.types.map(type => {
        dataType.push(type.type.name)
      })
      return dataType
    }
  }
})

const props = defineProps({

  id: {
    type: Number,
    required: true
  },
  setInfo: {
    type: Function,
    required: false
  },
})
</script>

<style>
.info {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
  background-color: #49a9d6;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  position: absolute;
  z-index: 1000;
}

.info .header {
  display: flex;
  position: inherit;
  width: 90%;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  font-weight: 300;
}

.info img {
  max-width: 90%;
}

.info h3 {
  font-size: 30px;
  max-width: 250px;
  margin: 0;
  background-color: #1c1c1c;
  font-family: "Slackey", sans-serif;
  font-style: normal;
  border-radius: 20px;
  letter-spacing: 1px;
  color: #fff;
  text-align: center;
}
.info h2{
  text-align: center;
  color: #1c1c1c;
  text-shadow: none;
  font-family: "Slackey", sans-serif;
  font-size: 22px;
}

.info .types {
  background-color: transparent;
  gap: 2%;
}

.info .type1 {
  max-width: 200px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  border: none;
  box-shadow: 0px 1px 1px 0px #393a3a;
  font-family: inherit;
}

.info,
.constainer {
  width: 100%;
}

.informacoes {
  width: 100%;
  background-color: #ffffffda;
}

.informacoes h5 {
  font-size: 20px;
  margin: 0;
}

.sobre,
.moves,
.status {
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 80%;
}

.constainer .activeAba {
  background-color: #ffffffda;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.stats {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;

}

.stats span {
  min-width: 70%;
  display: flex;
  justify-content: space-between;
  background-color: #666060;
  border-radius: 30px;
  padding: 0 25px;
  color: #fff;
  margin-bottom: 7px;
  box-shadow: 1px 1px 5px 0px #1e1f1f;


}

.stats span p {
  font-size: 20px;
  margin: 0;
  padding: 10px 0;
  font-weight: 300;
}

.stats hr {
  width: 90%;
}

.move {
  display: flex;
  flex-direction: column;
}

.class {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10%;
}

.class span {
  max-width: 300px;
  width: 35%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  color: #131313;
  font-weight: bold;
  font-size: 20px;
}

.class .Unic {
  background-color: #800080;
}

.class .Final {
  background-color: #FF0000;
}

.class .Initial {
  background-color: #00FF00;
}

.class .Medium {
  background-color: #FFFF00;
}

.class .Normal {
  background-color: #808080;
}

.class .Mythical {
  background-color: #FFA500;
}

.class .Legendary {
  background-color: #f1cf0c;
}

.evolves {
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  text-align: center;
  justify-content: center;
  gap: 5px;
}

.evolves img {
  max-width: 400px;
  width: 30%;
  border: 1px solid #acabab;
  border-radius: 25px;
}

.varieties {
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  text-align: center;
  justify-content: center;
  gap: 5px;
}

.varieties img {
  max-width: 400px;
  width: 30%;
  max-width: 250px;
  border: 1px solid #acabab;
  border-radius: 25px;
}

.shiny {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  padding-bottom: 10px;

}

.shiny img {
  margin: auto;
  max-width: 400px;
  width: 40%;

  border: 1px solid #acabab;
  border-radius: 25px;
}

.vantagens {
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: #7fff34;
  padding: 10px 0;
  margin-bottom: 10px;
  border-top: 1px solid #acabab;
  border-bottom: 1px solid #acabab;
}

.vantagens .types {
  flex-wrap: wrap;
  gap: 5px;
}

.desvantagens {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 10px 0;
  background-color: #ff4e36;
  border-top: 1px solid #acabab;
  border-bottom: 1px solid #acabab;
}

.desvantagens .types {
  flex-wrap: wrap;
  gap: 5px;
}

.habilits {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
}

.habilits div {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  row-gap: 10px;
}

.habilits div span {
  width: 40%;
  background-color: #fd8f00;
  padding: 5px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 20px;
}

.move {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  gap: 10px;
}

.move div {
  margin: auto;
  width: 95%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #7d7e7e;
  border-radius: 10px;
}

.move div span {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 80px;
  font-size: 20px;
  font-weight: 300;
}

.hates {
  display: flex;
  justify-content: center;
  gap: 2%;
  padding: 20px;
  font-weight: 300;
}

.hates div {
  background-color: #414141;
  color: #fff;
  padding: 8px;
  border-radius: 20px;
  min-width: 180px;
  width: 30%;
  display: flex;
  justify-content: space-around;

}

.ight {
  display: flex;
  justify-content: space-around;
  padding: 20px;
  font-weight: 300;
}

.ight div {
  background-color: #414141;
  color: #fff;
  padding: 8px;
  border-radius: 20px;
  min-width: 180px;
  width: 30%;
  display: flex;
  justify-content: space-around;
}
</style>
