<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 class="text-3xl font-bold text-center text-green-600 mb-6">Registracija</h2>
      <form @submit.prevent="register">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Korisničko ime</label>
          <input v-model="username" type="text" placeholder="Unesi korisničko ime" class="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-green-300" />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Lozinka</label>
          <input v-model="password" type="password" placeholder="Unesi lozinku" class="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-green-300" />
        </div>
        <button type="submit" class="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300">Registriraj se</button>
      </form>
      <p class="text-sm text-gray-600 text-center mt-4">
        Već imate račun? <router-link to="/login" class="text-green-600 hover:underline">Prijavite se ovdje</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/register', {
          username: this.username,
          password: this.password
        });
        alert('Uspješna registracija! Preusmjeravanje na prijavu.');
        this.$router.push('/login');
      } catch (error) {
        alert('Greška pri registraciji!');
      }
    }
  }
};
</script>
