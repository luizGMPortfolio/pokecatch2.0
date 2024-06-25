<template>
  <q-page class="flex flex-center">
    <div class="auth">
      <div class='logo'>
        <img src='~assets/icones/LogoPokecatch.png' alt="" />
      </div>
      <div class='inputs'>
        <q-form>
          <label>
            E-mail
            <input type="email" name="user" v-model="email" placeholder='Insira seu E-mail' required>
          </label>
          <label>
            Senha
            <input type="password" name="password" v-model="password" required placeholder='Crie sua senha'>
          </label>
          <button class='btn-default' @click="handleLogin">Login</button>
          <div class="register">
            <q-btn :to="'Register'" class="btn-change">Cadastrar-se</q-btn>
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { Login } from 'src/store/Auth/actions';
import { SETUSER } from 'src/store/Auth/mutations';
import { mapState, mapActions, mapMutations } from 'vuex';



defineOptions({
  name: 'LoginPage',
  data(){
    return{
      email: '',
      password: ''
    }
  },
  created(){
    location.reload();
  },
  methods:{
    async handleLogin(){
      var data = {
        email: this.email,
        password: this.password
      }
      try {
        const res = await Login(data)
        this.$router.replace({ path: '/' })
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed: {
    ...mapState('Auth', ['user']),
    ...mapMutations('Auth', ['SETUSER']),
    ...mapActions('Auth', ['Login']),
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
