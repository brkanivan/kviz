<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 class="text-3xl font-bold text-center text-blue-600 mb-6">Prijava</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Korisničko ime</label>
          <input v-model="username" type="text" placeholder="Unesi korisničko ime" class="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300" />
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700">Lozinka</label>
          <input v-model="password" type="password" placeholder="Unesi lozinku" class="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300" />
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">Prijava</button>
      </form>
      <p class="text-sm text-gray-600 text-center mt-4">
        Nemate račun? <router-link to="/register" class="text-blue-600 hover:underline">Registrirajte se ovdje</router-link>
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
    async login() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/login', {
          username: this.username,
          password: this.password
        });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', this.username);
        this.$router.push('/');
        alert('Uspješna prijava!');
      } catch (error) {
        alert('Pogrešno korisničko ime ili lozinka!');
      }
    }
  }
};
</script>

<style scoped>
/* Stilovi za prijavu */
body {
  background-color: #f9fafb;
}
</style>
