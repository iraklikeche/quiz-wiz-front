import apiClient from '@/api/axios.js'

export async function getSingleQuiz(id) {
  return await apiClient.get(`/api/quizzes/${id}`)
}

export async function getQuizzes(url = '/api/quizzes') {
  return await apiClient.get(url)
}
export async function fetchInitialData() {
  return await apiClient.get('/api/initial-data')
}
