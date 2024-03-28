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

export async function resendVerificationLink(email) {
  return await apiClient.post('/api/email/resend-verification', { email })
}

// export async function verifyEmail(id, hash) {
//   return await apiClient.get(`/api/email/verify/${id}/${hash}`)
// }
export async function verifyEmail(params) {
  return await apiClient.get(`/api/email/verify/${params.id}/${params.hash}`, {
    params: { expires: params.expires, signature: params.signature }
  })
}
