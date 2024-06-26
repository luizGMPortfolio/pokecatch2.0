<template>
  <div class='inicial'>

    <div class='title'>
      <h2>Catch</h2>
      <h1>{{ Rewards.pokemon.name }}</h1>
    </div>


    <Card :key=Rewards.pokemon.num :name=Rewards.pokemon.name :img='Rewards.pokemon.img' :types=Rewards.pokemon.types
      :num=Rewards.pokemon.num />

    <footer>
      <div class='items'>
        <img :src="Rewards.pokebolas.imagem" alt="" />
        <span>x {{ Rewards.pokebolas.quantidade }}</span>
      </div>
    </footer>


    <button class="btn-default" @click="CloseReward">OK</button>

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


import Card from 'src/components/Card.vue';
import { SETREWARDS } from 'src/store/Reward/mutations';
import { UpdateDocuments } from "src/store/Cloud/actions";
import { FetchPokemon } from "src/store/PokeApi/actions";
import { mapMutations, mapState, mapActions } from 'vuex';


defineOptions({
  name: 'RewardsLink',
  data() {
    return {
      itens: null,
      status: null,
      species: null
    }
  },
  async mounted() {
    this.fetchItens()
    this.fetchStatus()
    this.species = await FetchPokemon('pokemon-species', this.Rewards.pokemon.num);
    setTimeout(() => {
      this.SubmitReward()
    }, 1000)

  },
  computed: {
    ...mapState('Auth', ['user']),
    ...mapState('Reward', ['Rewards'])
  },
  methods: {
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
            console.log(data)
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
            console.log(data)
            this.status = data[0]

            console.log(this.species)
          });
        } catch (error) {

          console.log(error)
        }
      }, 500);


    },
    async SubmitReward() {
      console.log(this.Rewards)
      const DataItens = {
        cards: [...this.itens.cards, this.Rewards.pokemon],
        pokebolas: {
          pokebola: this.itens.pokebolas.pokebola + this.Rewards.pokebolas.pokebolas.pokebola,
          great: this.itens.pokebolas.great + this.Rewards.pokebolas.pokebolas.great,
          ultra: this.itens.pokebolas.ultra + this.Rewards.pokebolas.pokebolas.ultra,
          master: this.itens.pokebolas.master + this.Rewards.pokebolas.pokebolas.master
        },
      }

      UpdateDocuments('itens', this.itens.id, DataItens);

      var count = 0
      if (this.species.is_legendary) {
        count = count + 1
      }

      const DataStatus = {
        cards: this.status.cards + 1,
        legendary: this.status.legendary + count
      }

      UpdateDocuments('status', this.status.id, DataStatus);

    },
    CloseReward() {
      this.SETREWARDS(null)
      console.log("aqui")
    },
    ...mapMutations('Reward', ['SETREWARDS']),

    ...mapActions('Cloud', ['UpdateDocuments']),

    ...mapActions('PokeApi', ['FetchPokemon'])
  }
})
</script>
<style>
.inicial {
  width: 100%;
  min-height: 100vh;
  background: url('../assets/backgrounds/Rewards.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 10;
}

.inicial footer {
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100px;
  bottom: 150px;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.inicial .title {
  position: fixed;
  top: 30px;
}

.inicial .title h3 {
  font-size: 30px;
}

.inicial .items {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.inicial .items img {
  width: 40px;
  height: 40px;
}

.inicial footer span {
  font-size: 20px;
  font-weight: bold;
  color: #1c1c1c;
}

.inicial button {
  position: fixed;
  bottom: 50px;
  scale: 1.2;
}

@media (max-width: 768px) {
    .inicial .title h1 {
        font-size: 40px !important;
        line-height: 1.2;
    }
    .inicial .title {
      width: 90%;

    }
}

</style>
