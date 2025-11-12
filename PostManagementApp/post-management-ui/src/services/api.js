import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const postService = {
  getAllPosts: async (search = '', sortOrder = 'asc') => {
    const response = await api.get('/posts', {
      params: {
        search,
        sortBy: 'name',
        sortOrder
      }
    })
    return response.data
  },

  getPostById: async (id) => {
    const response = await api.get(`/posts/${id}`)
    return response.data
  },

  createPost: async (postData) => {
    const response = await api.post('/posts', postData)
    return response.data
  },

  updatePost: async (id, postData) => {
    const response = await api.put(`/posts/${id}`, postData)
    return response.data
  },

  deletePost: async (id) => {
    const response = await api.delete(`/posts/${id}`)
    return response.data
  },
}

export default api
