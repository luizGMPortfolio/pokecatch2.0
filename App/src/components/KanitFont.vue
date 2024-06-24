<template>
<div></div>
</template>
<script>
defineOptions(() => {
  name: ''
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
