<template>
  <q-page class="flex flex-center">
    <Navbar />
    <div className='Use'>
      <div className='perfil'>
        <div className='p-top'>
          <img src='~assets/icones/user.png' alt="" />
          <h1>{{ user.displayName }}</h1>
        </div>
        <div className='p-bottom'>
          <div className='OurCards'>
            <h2>Cards</h2>
            <span v-if="status">{{ status.cards }}</span>
          </div>
          <div className='Allcards'>
            <h2>Enconters</h2>
            <span v-if="status">{{ status.enconters }}</span>
          </div>
          <div className='lendarias'>
            <h2>Legendary</h2>
            <span v-if="status" >{{ status.legendary }}</span>
          </div>
        </div>
      </div>
      <div className='itens'>
        <h2>Itens</h2>
        <ul>
          <li>
            <img :src="pokebola" alt="" />
            <span v-if="itens">{{ itens.pokebolas.pokebola }}</span>
          </li>
          <li>
            <img :src="greatball" alt="" />
            <span v-if="itens">{{ itens.pokebolas.great }}</span>
          </li>
          <li>
            <img :src="ultraball" alt="" />
            <span v-if="itens">{{ itens.pokebolas.ultra }}</span>
          </li>
          <li>
            <img :src="masterball" alt="" />
            <span v-if="itens">{{ itens.pokebolas.master }}</span>
          </li>
        </ul>
      </div>

      <button class='exit'>Sair</button>
    </div>
  </q-page>
</template>

<script setup>

import Navbar from 'src/components/Navbar.vue';
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';


import pokebola from 'src/assets/pokebolas/padão.svg'
import greatball from 'src/assets/pokebolas/greatBall.svg'
import ultraball from 'src/assets/pokebolas/ultraBall.svg'
import masterball from 'src/assets/pokebolas/masterBall.svg'

import { db } from "src/firebase/Configs";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";

defineOptions({
  name: 'ProfilePage',
  data() {
    return {
      itens: null,
      status: null,
      configs: null
    }
  },
  computed: {
    ...mapState('Auth', ['user']),
    ...mapGetters('Auth', ['getUser']),

    ...mapActions('Cloud', ['GetDocuments']),
    ...mapState('Cloud', ['document']),
    ...mapMutations('Cloud', ['SETDOCUMENT'])
  },
  created() {

  },
  mounted() {
    this.fetchItens()
    this.fetchStatus()
    this.fetchConfigs()
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

          await onSnapshot(q, (querySnapshot) => {
            const data = (
              querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
            );

            this.status = data[0]
          });
        } catch (error) {

          console.log(error)
        }
      }, 500);


    },
    async fetchConfigs(){
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
          });
        } catch (error) {

          console.log(error)
        }
      }, 500);
    }
  }
});
</script>
<style>
.Use {
  width: 100%;
  min-height: 100vh;
  background: url('../assets/backgrounds/How.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  font-family: "Kanit", sans-serif;
  font-style: normal;
  padding-bottom: 150px;
}

.perfil {

  width: 95%;
  background-color: #0000005e;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 20px 0;
  gap: 10px;
}
.perfil h1{
  font-size: 40px;
}
.perfil span {
  font-weight: bold;
  font-size: 25px;
  color: #ddddddc7;
}

.perfil img {
  max-width: 200px;
  width: 100px;
}

.Equipe {
  width: 100%;
  background-color: #0000005e;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
}

.itens {
  width: 95%;
  background-color: #0000005e;
  border-radius: 20px;
  padding: 20px 0;
  text-align: center;

}

.itens h2 {
  font-size:  40px;
  text-align: center;
}

.itens ul {
  margin: 20px auto;
  padding: 0;
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: center;
  list-style: none;
  color: #ddddddc7;
  font-size: 20px;
  font-weight: bold;
  gap: 10%;
}

.itens ul li {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.itens img {
  width: 50px;
  height: 50px;
}

.Equipe .cards {
  background-color: transparent;
  gap: 5px;
}

.changeBackcard {
  width: 100%;
  background-color: #0000005e;
  border-radius: 20px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.CB-Back {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.CB-Back img {
  margin: 20px 0;
  width: 184px;
  height: 284px;

  border-radius: 20px;
  border: 4px solid #707070;
}


.p-top {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.p-bottom {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 10%;
  row-gap: 10px;

}

.p-bottom h2 {
  width: 100%;
}

.p-bottom span {
  width: 10%;
}

.Allcards,
.lendarias,
.OurCards {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  width: 150px;
}

.Use h3,
.Use h2 {
  margin: 0;
  color: #fff;
}

.Use h2 {
  font-size: 25px;
}

.Use h3 {
  font-size: 30px;
}

.EquipeB {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;

}

.exit {
  border: none;
  border-radius: 15px;
  width: 95%;
  font-size: 20px;
  background-color: #0000005e;
  color: #fff;
  cursor: pointer;
  transition: 200ms;
}

.exit:hover {
  background-color: #ff2d2dec;
}


.soon {
  width: 95%;
  opacity: 0.7;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.coming {
  position: absolute;
  z-index: 200;
  font-size: 60px;
  font-family: "Kanit", sans-serif;
  font-weight: bold;

}
</style>
