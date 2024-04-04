import apiClient from '@/api/axios.js'

export async function getQuizzes() {
  return await apiClient.get('/api/quizzes')
}
