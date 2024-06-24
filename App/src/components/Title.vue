<template>
  <h3 style="font-family: 'style'; font-size: 'font'; color: 'color';">{{ text }}</h3>
</template>
<script>
defineOptions(() => {
  name: 'TitleLink'
})

const props = defineProps({
  style: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  font: {
    type: String,
    required: false
  },
  color: {
    type: String,
    required: false
  }
})
</script>
