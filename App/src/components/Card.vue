<template>
  <div v-if="style == 'default'" class="card" @click="setInfo(num)">
    <div class='name'>
      <h3>{{ name }}</h3>
    </div>
    <div class='img'>
      <img :src="img" alt="" />
    </div>
    <div class="types" v-if="types">
      <div :class='"type1 " + type' v-for="(type, id) in types" v-bind:key="id" >
        <span>{{ type }}</span>
      </div>
    </div>
    <div class='num'>
      <span>N°{{ num }}</span>
    </div>
    <div className='duplicate' v-if="quant > 0">
      <span>{{ quant }}x</span>
    </div>
  </div>
  <div v-if="style == 'hidden'" class="card ocult">
    <div class='name'>
      <h3>?????</h3>
    </div>
    <div class='img'>
      <img :src="img" alt="" class="ocultImg" />
    </div>
    <div class="types" v-if="types">
      <div :class='"type1 "' v-for="(type, id) in types" v-bind:key="id">
        <span>????</span>
      </div>
    </div>

    <div class='num'>
      <span>N°?</span>
    </div>
  </div>
  <div v-if="style == 'uncatch'" class="card ocult">
    <div className='name'>
      <h3>?????</h3>
    </div>
    <div className='img'>
      <img :src="img" alt="" className='ocultImg' />
    </div>
    <div class="types" v-if="types">
      <div :class='"type1 " + type' v-for="(type, id) in types" v-bind:key="id">
        <span>{{ type }}</span>
      </div>
    </div>
    <div className='num'>
      <span>N°{{ num }}</span>
    </div>
  </div>
  <div v-if="style == 'back'">
    <div class='backcard'>
      <img :src="backcard" />
    </div>
  </div>

</template>

<script setup>
import backcard from '../assets/backgrounds/pokecatchBackcard.png'
defineOptions({
  name: 'CardLink'
})

const props = defineProps({
  name: {
    type: String,
    required: false,
    default: 'picachu'
  },

  img: {
    type: String,
    default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
  },
  types: {
    type: [],
    default: ''
  },
  num: {
    type: Number,
    default: 0
  },
  style: {
    type: String,
    default: 'default'
  },
  quant: {
    type: Number,
    default: 0
  },
  setInfo: {
    type: Function,
    required: false
  },
})

</script>
<style>
.cards {
  padding: 20px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;

  gap: 20px;
  background-color: #ffffff69;
}

.backcard {
  width: 180px;
  height: 280px;
  box-shadow: 2px 6px 18px 0px #393a3a;
  border-radius: 15px;
}

.backcard img {
  width: 180px;
  height: 280px;
  border-radius: 15px;
  border: 4px solid #707070;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 184px;
  height: 284px;
  perspective: 1000px;
  background-color: #49a9d6;
  color: #fff;
  border-radius: 15px;
  box-shadow: 2px 6px 18px 0px #393a3a;
  border: 4px solid #707070;
  transition: 200ms;
  animation: opacity 1s;
  padding: 0;
  margin: 0;
}

.card img {
  width: 100%;
  height: 100%;
}

.card:hover {
  transform: translateY(-20px);
}

.ocult {
  background-color: #393a3a;
}

.ocultImg {
  filter: brightness(0);
}

.type1 {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 18px;
  font-weight: bold;
  width: 43%;
  padding: 1px 0;
  border-radius: 5px;
  color: #fff;
  border: 1px solid #706c6c;
}

.num {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  color: #dadada;
  margin: 0;
  padding: 0;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  bottom: 0;
}




.name {
  width: 100%;
  display: flex;
  height: 15%;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.img {
  width: 100%;
  display: flex;
  height: 60%;
}

.types {
  width: 100%;
  display: flex;
  height: 15%;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #454545;
  gap: 5px;
}

.num {
  width: 100%;
  display: flex;
  justify-content: space-around;
  height: 10%;
  background-color: #454545;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.duplicate {
  position: absolute;
  bottom: -3px;
  left: 5px;
  border-radius: 10px;
  padding: 5px;

  font-size: 20px;
  text-align: center;
  font-weight: 300;
  color: #bdbdbd;
}
</style>
