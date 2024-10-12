import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Quiz from '../components/StartQuiz.vue'
import Register from '../components/Register.vue'
import Leaderboard from '../components/Leaderboard.vue'
import Login from '../components/Login.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/quiz',
    name: 'quiz',
    component: Quiz
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/leaderboard',
    name: 'leaderboard',
    component: Leaderboard
  },
  {path: '/login',
   name: 'login',
   component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
