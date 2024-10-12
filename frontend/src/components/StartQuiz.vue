<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
      <h2 class="text-2xl font-bold text-center text-blue-600 mb-6">Odaberite Kategoriju i Razred</h2>

      <!-- Form za odabir kategorije i razreda -->
      <form @submit.prevent="startQuiz">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Kategorija</label>
          <select v-model="category" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm">
            <option value="Biology">Biologija</option>
            <option value="Geography">Geografija</option>
            <option value="History">Povijest</option>
          </select>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Razred</label>
          <select v-model="grade" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm">
            <option value="7">7. razred</option>
            <option value="8">8. razred</option>
            <option value="9">9. razred</option>
          </select>
        </div>

        <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">Započni Kviz</button>
      </form>

      <!-- Prikaz kviza nakon odabira kategorije i razreda -->
      <div v-if="quiz.length > 0" class="mt-8">
        <div v-for="(question, index) in quiz" :key="index" class="mb-4">
          <h3 class="font-bold">{{ question.question }}</h3>
          <div v-for="(answer, idx) in question.answers" :key="idx" class="ml-4">
            <input type="radio" :name="'question_' + index" v-model="userAnswers[index]" :value="answer" />
            <label :class="{
              'text-green-500': showResults && answer === question.correct_answer,  // Zeleno ako je točan
              'text-red-500': showResults && userAnswers[index] === answer && answer !== question.correct_answer  // Crveno ako je netočan
            }">
              {{ String.fromCharCode(65 + idx) }}. {{ answer }} <!-- A, B, C oznake -->
            </label>
          </div>
        </div>
        <button @click="submitQuiz" class="mt-6 bg-green-500 text-white py-2 px-4 rounded w-full">Predaj Kviz</button>
      </div>

      <!-- Prikaz rezultata nakon završetka kviza -->
      <div v-if="showResults" class="mt-8 text-center">
        <h3 class="text-xl font-bold text-green-600">Vaš rezultat: {{ score }}/{{ quiz.length }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      category: '',
      grade: '',
      quiz: [],
      userAnswers: [],
      score: 0,
      showResults: false
    };
  },
  methods: {
    async startQuiz() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/generate_quiz', {
          category: this.category,
          grade: this.grade
        });
        this.quiz = response.data.quiz;
        this.userAnswers = new Array(this.quiz.length).fill(null);  // Praćenje korisničkih odgovora
        this.showResults = false;  // Resetiraj prikaz rezultata
      } catch (error) {
        console.error('Error fetching quiz', error);
      }
    },
    submitQuiz() {
      this.score = 0;

      // Prolazi kroz svako pitanje i provjerava točne odgovore
      this.quiz.forEach((question, index) => {
        if (this.userAnswers[index] === question.correct_answer) {
          this.score += 1;  // Uvećaj bodove ako je odgovor točan
        }
      });

      this.showResults = true; // Prikaži rezultat i obojene odgovore
    }
  }
};
</script>
