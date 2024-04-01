import apiClient from '@/api/axios.js'

export async function getCsrfCookie() {
  return await apiClient.get('/sanctum/csrf-cookie', { withCredentials: true })
}

export async function registerUser(values) {
  const payload = {
    ...values,
    agreed_to_terms: values.terms === 'true',
    password_confirmation: values.confirmation
  }

  await apiClient.post('api/register', payload)
}

export async function loginUser(credentials) {
  return await apiClient.post('api/login', credentials)
}

export async function logoutUser() {
  return await apiClient.post('api/logout')
}
export async function forgotPassword(email) {
  return await apiClient.post('api/forgot-password', { email })
}

export async function resendVerificationLink(userId) {
  const response = await apiClient.post('/api/email/resend', { id: userId })
  console.log(response)
  return response
}

export async function verifyEmail(path) {
  const response = await apiClient.get(path)
  console.log(response)
  return response
}

export async function resetPassword(data) {
  const response = await apiClient.post('/api/reset-password', data)
  console.log(response)
  return response
}
