import apiClient from '@/api/axios.js'

export async function getCompanyDetails() {
  return await apiClient.get('api/company-details')
}
