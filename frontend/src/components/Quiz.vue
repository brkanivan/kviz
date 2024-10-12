<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
      <h2 class="text-3xl font-bold mb-4 text-center">Kviz - {{ category }} za {{ grade }}. razred</h2>
      <div v-if="quiz.length > 0">
        <div v-for="(question, index) in quiz" :key="index" class="mt-4">
          <h3 class="font-bold">{{ question.question }}</h3>
          <div v-for="(answer, idx) in question.answers" :key="idx">
            <input type="radio" :name="'question_' + index" v-model="userAnswers[index]" :value="answer" />
            <label>{{ answer }}</label>
          </div>
        </div>
        <button @click="submitQuiz" class="mt-6 bg-green-500 text-white py-2 px-4 rounded w-full">Predaj Kviz</button>
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
      userAnswers: []
    };
  },
  methods: {
    async startQuiz() {
      const response = await axios.post('http://127.0.0.1:8000/generate_quiz', {
        category: this.category,
        grade: this.grade
      });
      this.quiz = response.data.quiz;
      this.userAnswers = new Array(this.quiz.length).fill(null);
    },
    async submitQuiz() {
      let score = 0;
      this.quiz.forEach((question, index) => {
        if (this.userAnswers[index] === question.correct_answer) {
          score += 1;
        }
      });
      alert(`Tvoj rezultat: ${score}/${this.quiz.length}`);

      const token = localStorage.getItem('token');
      if (token) {
        await axios.post('http://127.0.0.1:8000/submit_result', {
          username: localStorage.getItem('username'),
          category: this.category,
          grade: this.grade,
          score: score
        });
      }
    }
  }
};
</script>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}
.w-full {
  width: 100%;
}
</style>
