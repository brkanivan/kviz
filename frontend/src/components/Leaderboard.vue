<template>
    <div>
      <h2>Ljestvica rezultata</h2>
      <ul>
        <li v-for="user in leaderboard" :key="user.username">
          {{ user.username }} - {{ user.score }} bodova
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        leaderboard: []
      };
    },
    async created() {
      const response = await axios.get('http://localhost:8000/leaderboard/Biology');
      this.leaderboard = response.data.leaderboard;
    }
  }
  </script>
  