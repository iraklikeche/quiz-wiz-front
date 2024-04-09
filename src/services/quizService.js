import apiClient from '@/api/axios.js'

export async function getSingleQuiz(id) {
  return await apiClient.get(`/api/quizzes/${id}`)
}

export async function getQuizzes(url = '/api/quizzes') {
  return await apiClient.get(url)
}

export async function getAllCategories() {
  return await apiClient.get('/api/categories')
}

export async function getAllDifficultyLevels() {
  return await apiClient.get('/api/difficulty-levels')
}

export async function getSimilarQuizzes(id) {
  return await apiClient.get(`/api/quizzes/${id}/similar`)
}
