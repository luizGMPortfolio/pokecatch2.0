<template>
  <q-item class="loading">
    <img src="~assets/icones/LogoPokecatch.png" alt="">
    <p>Loading...</p>
  </q-item>
</template>

<script setup>
defineOptions({
  name: 'LoadinglLink'
})
</script>
<style scoped>
.loading{
  width: 100%;
  height: 100vh;
  background-color: #545454;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
}
.loading img{
  animation: rotate 1.5s infinite;
}
.loading p{
  animation: opacity 500ms infinite;
}
@keyframes opacity {
  0%{
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
}
@keyframes rotate {
  0%{

  }
  100%{
    transform: rotate(360deg)
  }
}
</style>
