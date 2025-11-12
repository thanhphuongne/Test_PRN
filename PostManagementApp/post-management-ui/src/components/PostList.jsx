import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { postService } from '../services/api'

function PostList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchPosts()
  }, [searchTerm, sortOrder])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const data = await postService.getAllPosts(searchTerm, sortOrder)
      setPosts(data)
    } catch (error) {
      console.error('Error fetching posts:', error)
      alert('Failed to fetch posts. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (id) => {
    navigate(`/edit/${id}`)
  }

  const handleDeleteClick = (post) => {
    setPostToDelete(post)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    try {
      await postService.deletePost(postToDelete.id)
      setPosts(posts.filter(p => p.id !== postToDelete.id))
      setDeleteModalOpen(false)
      setPostToDelete(null)
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Failed to delete post. Please try again.')
    }
  }

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false)
    setPostToDelete(null)
  }

  if (loading) {
    return <div className="loading">Loading posts...</div>
  }

  return (
    <div className="container">
      <h2 style={{ marginBottom: '2rem' }}>All Posts</h2>
      
      <div className="search-sort-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search posts by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="sort-box">
          <label htmlFor="sort">Sort:</label>
          <select
            id="sort"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="no-posts">
          {searchTerm ? 'No posts found matching your search.' : 'No posts available. Create your first post!'}
        </div>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.name}
                  className="post-image"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              )}
              <div className="post-content">
                <h3 className="post-title">{post.name}</h3>
                <p className="post-description">{post.description}</p>
                <div className="post-actions">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(post.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteClick(post)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete "{postToDelete?.name}"?</p>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={handleDeleteCancel}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleDeleteConfirm}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostList
