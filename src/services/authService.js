import apiClient from '@/api/axios.js'

export async function registerUser(values) {
  try {
    const payload = {
      ...values,
      agreed_to_terms: values.terms === 'true',
      password_confirmation: values.confirmation
    }

    const response = await apiClient.post('/register', payload)

    // Handle response, e.g., show success message, redirect user, etc.
    console.log(response.data)
  } catch (error) {
    if (error.response && error.response.data.errors) {
      console.error(error.response.data)
      this.formErrors = error.response.data.errors
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
    }
  }
}
