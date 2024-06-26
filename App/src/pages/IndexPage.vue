<template>
  <q-page class="flex flex-center">
    <Navbar />
    <div class="Home">
      <div className='Contagem'>
        <span className='text'>Next update</span>
        <div className="time">
          <Timer />
        </div>
      </div>
      <div class="Locais">

        <ul>
          <li class="floresta"><q-item :to="'/Locations/forest'"><img src="~assets/icones/pinheiro.png" alt=""></q-item></li>
          <li class="caverna"><q-item :to="'/Locations/cave'"><img src="~assets/icones/caverna.png" alt=""></q-item></li>
          <li class="praia"><q-item :to="'/Locations/beach'"><img src="~assets/icones/praia.png" alt=""></q-item></li>
          <li class="montanha"><q-item :to="'/Locations/mountain'"><img src="~assets/icones/montanha.png" alt=""></q-item></li>
          <li class="deserto"><q-item :to="'/Locations/desert'"><img src="~assets/icones/cacto.png" alt=""></q-item></li>
          <li class="vulção"><q-item :to="'/Locations/vulcano'"><img src="~assets/icones/vulção.png" alt=""></q-item></li>
          <li class="asombrado"><q-item :to="'/Locations/HantedHouse'"><img src="~assets/icones/Hanted.png" alt=""></q-item></li>
        </ul>
      </div>
    </div>
  </q-page>
</template>

<script setup>

import Navbar from 'src/components/Navbar.vue';
import Timer from 'src/components/Timer.vue';
import { mapState } from 'vuex';

defineOptions({
  name: 'IndexPage',
  data() {
    return {
      pokemon: null,
      erro: null,
      sla: ''
    }
  },
  computed: {
    ...mapState('Auth', ['user']),
  }
});
</script>
<style>
.Home {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: url('../assets/backgrounds/Home.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.Contagem {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-family: "kanit", sans-serif;
  font-optical-sizing: auto;
  font-weight: bold;
  margin: 30px 0;
}
.text,
.time {
  text-align: center;
}
.text {
  font-size: 30px;
}
.time {
  font-size: 65px;
}
.time p {
  margin: 0;
}
.Locais {
  width: 100%;
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 100px;
}
.Locais ul {
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  list-style: none;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}
.Locais ul li {
  width: 150px;
  height: 150px;
  display: flex;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  transition: 500ms;
  cursor: pointer;

  box-shadow: rgb(5, 5, 5) 0px 1px 3px 0px;

  -webkit-box-shadow: rgb(5, 5, 5) 0px 1px 3px 0px;

  -moz-box-shadow: rgb(5, 5, 5) 0px 1px 3px 0px;

}

.Locais ul li:hover {
  background-color: #4e4e4eda;
  scale: 1.1;
}
</style>
