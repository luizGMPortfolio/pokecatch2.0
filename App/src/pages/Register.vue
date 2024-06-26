<template>
  <q-page class="flex flex-center">
    <div class="auth" v-if="!loading">
      <div class='logo'>
        <img src='~assets/icones/LogoPokecatch.png' alt="" />
      </div>
      <div class="inputs">
        <q-form v-on:submit="handleRegister">
          <label>
            Usúario
            <input type="text" name='displayName' v-model="displayName" placeholder='Insira o nome de Usúario' required>
          </label>
          <label>
            E-mail
            <input type="email" name="email" v-model="email" placeholder='Insira seu E-mail' required>
          </label>
          <label>
            Senha
            <input type="password" name="password" v-model="password" required placeholder='Crie sua senha'>
          </label>
          <label>
            Confirmação de senha:
            <input type="password" name="confirmPassword" v-model="ConfirmPassword" required
              placeholder='Confirme a sua senha'>
          </label>
          <button class='btn-default' v-if="!loading">Register</button>
          <button class='btn-default' v-else>aguarde...</button>
          <div class="register">
            <q-btn :to="'Login'" class="btn-change">Logar</q-btn>
          </div>

        </q-form>
      </div>
    </div>
    <Loading v-else />
  </q-page>
</template>

<script setup>

import Loading from 'src/components/Loading.vue'
import { Register } from 'src/store/Auth/actions';
import { SETUSER } from 'src/store/Auth/mutations';
import { createDocuments } from 'src/store/Cloud/actions';
import { NewLocations } from 'src/store/Database/actions';
import { RandonPokemon } from 'src/store/PokeApi/actions';
import { RandonPokeball } from 'src/store/Reward/actions';
import { SETREWARDS } from 'src/store/Reward/mutations';
import { mapActions, mapMutations, mapState } from 'vuex';


defineOptions({
  name: 'RegisterPage',
  components: {
    Loading
  },

  data() {

    return {
      displayName: '',
      email: '',
      password: '',
      ConfirmPassword: '',
      loading: false,
      error: null,
      currentDate: null,
      pokemon: null,
      pokebola: null,
      loading: null,
    }

  },
  async created() {
    this.pokebola = await RandonPokeball()
    const data = await RandonPokemon()

    var dataType = []
    data.types.map(type => {
      dataType.push(type.type.name)

    })
    this.pokemon = {
      name: data.name,
      img: data.sprites.other['official-artwork'].front_default,
      types: dataType,
      num: data.id

    }
  },
  methods: {
    async handleRegister(e) {
      e.preventDefault()
      this.loading = true

      var data = {
        displayName: this.displayName,
        email: this.email,
        password: this.password
      }
      try {
        const res = await Register(data)
        createDocuments('itens', {
          cards: [],
          pokebolas: {
            pokebola: 5,
            great: 0,
            ultra: 0,
            master: 0
          },
          time: [],
          uid: res.uid,
          createdBy: res.displayName,
        })
        createDocuments('status', {
          cards: 0,
          enconters: 0,
          legendary: 0,
          uid: res.uid,
          createdBy: res.displayName,
        })

        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
        const year = today.getFullYear();
        this.currentDate = `${day}/${month}/${year}`;

        createDocuments('Configs', {
          locations: await NewLocations(),
          pokemons: 3,
          BackCard: 'padrão',
          Date: this.currentDate,
          uid: res.uid,
          createdBy: res.displayName,
        })


        const NewRewards = {
          pokemon: this.pokemon,
          pokebolas: this.pokebola
        }
        this.SETREWARDS(NewRewards)
        this.$router.replace({ path: '/' })
        this.loading = false
      } catch (error) {
        console.log(error);
      }

    },
    ...mapActions('Auth', ['Register']),

    ...mapActions('Cloud', ['createDocuments']),

    ...mapActions('Database', ['NewLocations']),

    ...mapActions('PokeApi', ['RandonPokemon']),

    ...mapActions('Reward', ['RandonPokeball']),
    ...mapMutations('Auth', ['SETUSER']),
    ...mapMutations('Reward', ['SETREWARDS'])
  },
  computed: {
    ...mapState('Auth', ['user']),

  },


});

</script>
<style>
.auth {
  width: 100%;
  height: 100vh;
  background-color: #545454;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;

}

.inputs {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.outher {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 10%;
}

.division {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  gap: 2%;
}

.google {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.google span {
  background-color: #1c1c1c;
  color: #fff;
  padding: 5px 15px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 10px;
  cursor: pointer;
}

.Login .register {
  color: #202020;
  margin: 10px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
