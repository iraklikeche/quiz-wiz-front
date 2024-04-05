import apiClient from '@/api/axios.js'

export async function getQuizzes() {
  return await apiClient.get('/api/quizzes')
}

export async function getSingleQuiz(id) {
  return await apiClient.get(`/api/quizzes/${id}`)
}
