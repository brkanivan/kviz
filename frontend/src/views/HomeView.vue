<template>
  <div class="min-h-screen bg-gradient-to-b from-green-300 to-blue-300 flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-white mb-4">Dobrodošli na naš Kviz!</h1>
      <p class="text-lg text-white">
        Ova web stranica nudi zabavne i edukativne kvizove iz biologije, povijesti i geografije za učenike 7., 8. i 9. razreda. 
        Izazovite svoje znanje i natječite se s prijateljima!
      </p>
      <router-link to="/quiz" class="mt-6 inline-block px-6 py-3 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-100">Započni Kviz</router-link>
    </div>
  </div>
  <div>
    <h2>Home</h2>
    <router-link to="/Quiz">Start Quiz</router-link>
    <router-link to="/register">Register</router-link>
    <router-link to="/leaderboard">Leaderboard</router-link>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>
<style scoped>
/* Zelenkasto-plava tema */
.bg-gradient-to-b {
  background: linear-gradient(180deg, #68D391, #63B3ED);
}
</style>