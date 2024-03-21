import apiClient from '@/api/axios.js'

export async function registerUser(values) {
  const payload = {
    ...values,
    agreed_to_terms: values.terms === 'true',
    password_confirmation: values.confirmation
  }

  await apiClient.post('/register', payload)
}
