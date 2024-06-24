<template>

  <q-layout view="lHh Lpr lFf">
    <Reward v-if="Rewards" />
    <q-page-container v-else>
      <router-view />
    </q-page-container>


  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { SETUSER } from 'src/store/Auth/mutations';
import Reward from '../components/Reward.vue';
import { mapActions, mapMutations, mapState } from 'vuex';
import { GetAllPokemons } from 'src/store/PokeApi/actions';
import { SETPOKEMONS } from 'src/store/PokeApi/mutations';

import { db } from "src/firebase/Configs";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { UpdateDocuments } from 'src/store/Cloud/actions';
import { NewLocations } from 'src/store/Database/actions';



defineOptions({
  name: 'MainLayout',
  data() {
    return {
      auth: null,
      configs: null
    }
  },
  async mounted() {
    onAuthStateChanged(getAuth(), (user) => {
      if(user){
        console.log('usuario confirmado')
      }
      else{
        console.log('sem usuario')
        this.$router.replace({ path: '/Login' })
      }
      this.SETUSER(user)
    })
    this.pokemons = await GetAllPokemons()
    this.SETPOKEMONS(this.pokemons)
    this.fetchConfigs()
  },
  computed: {
    ...mapState('Reward', ['Rewards']),
    ...mapState('Auth', ['user'])
  },
  methods: {
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

          onSnapshot(q, async (querySnapshot) => {
            const data = (
              querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
            );

            this.configs = data[0];

            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
            const year = today.getFullYear();
            const currentDate = `${day}/${month}/${year}`;

            if (this.configs.Date != currentDate) {
              UpdateDocuments('Configs', this.configs.id, {
                locations: await NewLocations(),
                pokemons: 3,
                Date: currentDate
              });
            }
          });
        } catch (error) {
          console.log(error)
        }
      }, 100);
    },
    ...mapMutations('Auth', ['SETUSER']),
    ...mapMutations('PokeApi', ['SETPOKEMONS']),
    ...mapActions('PokeApi', ['GetAllPokemons']),
    ...mapActions('Cloud', ['UpdateDocuments']),
    ...mapActions('Database', ['NewLocations']),

  }

})



const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]
const leftDrawerOpen = ref(false)
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
