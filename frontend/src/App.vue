<template>
  <div>
    <!-- Navbar -->
    <nav class="bg-blue-700 text-white p-4 shadow-lg">
  <div class="container mx-auto flex justify-between items-center">
    <router-link to="/" class="font-bold text-lg hover:text-gray-300">Početna</router-link>
    <div>
      <router-link to="/quiz" class="ml-4 hover:text-gray-300">Kviz</router-link>
      
      <span v-if="username" class="ml-4">Prijavljen: {{ username }}</span>
      <button v-if="username" @click="logout" class="ml-4 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">Odjava</button>
      <router-link v-if="!username" to="/login" class="ml-4 hover:text-gray-300">Prijava</router-link>
    </div>
  </div>
</nav>

    <!-- Ovdje se prikazuju različite rute -->
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: localStorage.getItem('username') || '' // Dohvaćanje korisničkog imena iz localStorage
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.username = '';  // Resetiranje korisničkog imena nakon odjave
      this.$router.push('/login');
    }
  }
};
</script>

<style>
/* Stilovi za globalni izgled */
.bg-blue-700 {
  background-color: #3182ce;
}
</style>
