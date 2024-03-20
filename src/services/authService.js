import apiClient from '@/api/axios.js'

export async function registerUser(values) {
  const payload = {
    ...values,
    agreed_to_terms: values.terms === 'true',
    password_confirmation: values.confirmation
  }

  const response = await apiClient.post('/register', payload)

  // Handle response, e.g., show success message, redirect user, etc.
  console.log(response.data)
}
