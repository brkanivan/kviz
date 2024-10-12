<template>
    <div>
      <h2>Kviz: {{ subject }}</h2>
      <div v-for="(question, index) in quiz" :key="index">
        <p>{{ index + 1 }}. {{ question.question }}</p>
        <div v-for="(answer, answerIndex) in question.answers" :key="answerIndex">
          <input type="radio" :id="`q${index}_a${answerIndex}`" :name="`question_${index}`" :value="answer" v-model="userAnswers[index]" />
          <label :for="`q${index}_a${answerIndex}`" :class="{ correct: submitted && answer === question.correct_answer, wrong: submitted && userAnswers[index] === answer && answer !== question.correct_answer}">
            {{ answer }}
          </label>
        </div>
      </div>
      <button @click="submitQuiz">Predaj kviz</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        subject: 'Biology',
        grade: 7,
        quiz: [],
        userAnswers: [],
        submitted: false
      };
    },
    async created() {
      const response = await axios.post('http://localhost:8000/generate_quiz', {
        username: 'test_user', 
        subject: this.subject,
        grade: this.grade
      });
      this.quiz = response.data.quiz;
      this.userAnswers = new Array(this.quiz.length).fill(null);
    },
    methods: {
      async submitQuiz() {
        this.submitted = true;
        let score = 0;
        this.quiz.forEach((question, index) => {
          if (this.userAnswers[index] === question.correct_answer) {
            score += 1;
          }
        });
  
        alert(`Tvoj rezultat: ${score}/${this.quiz.length}`);
  
        await axios.post('http://localhost:8000/submit_result', {
          username: 'test_user',
          subject: this.subject,
          score: score
        });
      }
    }
  }
  </script>
  
  <style>
  .correct {
    color: green;
  }
  .wrong {
    color: red;
  }
  </style>
  