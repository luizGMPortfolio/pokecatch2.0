<template>
  <div class="navbar">
    <menu class='main'>
      <q-btn :to="'/'" class="btn-navbar"> <li><img src="~assets/icones/world.png" alt=""></li></q-btn>
      <q-btn :to="'How'" class="btn-navbar"><li><img src="~assets/icones/interrogação.png" alt=""></li></q-btn>
      <q-btn :to="'Pokedex'" class="btn-navbar"><li><img src="~assets/icones/pokedex.png" alt=""></li></q-btn>
      <q-btn :to="'Profile'" class="btn-navbar"><li><img src="~assets/icones/usuario.png" alt=""></li></q-btn>
    </menu>
  </div>
</template>

<script setup>


defineOptions({
  name: 'NavbarLink'
})

const props = defineProps({
  page: {
    type: String,
    required: false,
    default: 'word'
  },
})
</script>

<style scoped>
.navbar {
  display: flex;
  position: fixed;
  z-index: 10;
  bottom: 40px;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.catch,
.main {
  display: flex;
  list-style: none;
  border-radius: 50px;
  align-items: center;
  z-index: 100;
  transition: 200ms;
  padding: 0;
}
.main {
  background: linear-gradient(to right, #0d5ef4d8, #08358ecb);
}
.navbar .main img {
    width: 30px;
    height: 30px;
}
.main ul{
    display: flex;
    justify-content: center;
}
.navbar menu li {
    width: 90px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20%;
}
.btn-navbar{
  padding: 0;
  box-shadow: none !important;
  border: none;
  margin: 0;
  border-radius: 35px;

}
.btn-navbar:before{
  box-shadow: none;
}
</style>
