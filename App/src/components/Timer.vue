<template>

  <span>{{ timeLeft }}</span>

</template>

<script setup>
defineOptions({
  name: 'TimerLink',
  data() {
    return {
      timeLeft: this.calculateTimeLeft(),
    };
  },
  mounted() {
    this.startTimer();
  },
  methods: {
    calculateTimeLeft() {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0); // Define a meia-noite do próximo dia
      const diff = midnight - now;

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      return `${hours}h ${minutes}m ${seconds}s`;
    },
    startTimer() {
      setInterval(() => {
        this.timeLeft = this.calculateTimeLeft();
      }, 1000);
    },
  }
});
</script>

<style scoped>
h1 {
  font-size: 2em;
  margin-bottom: 20px;
}

p {
  font-size: 1.5em;
  color: #333;
}
</style>
