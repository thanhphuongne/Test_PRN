import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { postService } from '../services/api'

function EditPost() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    fetchPost()
  }, [id])

  const fetchPost = async () => {
    try {
      setLoading(true)
      const post = await postService.getPostById(id)
      setFormData({
        name: post.name,
        description: post.description,
        imageUrl: post.imageUrl || ''
      })
    } catch (error) {
      console.error('Error fetching post:', error)
      alert('Failed to fetch post. Redirecting to home page.')
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      setSubmitting(true)
      await postService.updatePost(id, formData)
      navigate('/')
    } catch (error) {
      console.error('Error updating post:', error)
      alert('Failed to update post. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleCancel = () => {
    navigate('/')
  }

  if (loading) {
    return <div className="loading">Loading post...</div>
  }

  return (
    <div className="container">
      <div className="form-container">
        <h2 style={{ marginBottom: '2rem' }}>Edit Post</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter post name"
              maxLength={200}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter post description"
              maxLength={2000}
            />
            {errors.description && <div className="error-message">{errors.description}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">Image URL (Optional)</label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              maxLength={500}
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditPost
