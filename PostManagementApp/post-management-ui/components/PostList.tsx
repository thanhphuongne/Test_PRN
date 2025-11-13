'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { postService, Post } from '@/lib/api'
import DeleteModal from './DeleteModal'

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState<Post | null>(null)
  const router = useRouter()

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

  const handleEdit = (id: number) => {
    router.push(`/edit/${id}`)
  }

  const handleDeleteClick = (post: Post) => {
    setPostToDelete(post)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return
    
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
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-2xl text-blue-600 font-semibold">Loading posts...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <input
            type="text"
            placeholder="🔍 Search posts by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-5 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 text-lg"
          />
          <div className="flex items-center gap-3">
            <label htmlFor="sort" className="text-gray-800 font-semibold text-lg">
              Sort:
            </label>
            <select
              id="sort"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              className="px-5 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-800 text-lg font-medium cursor-pointer"
            >
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
          </div>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-lg border-2 border-blue-100">
          <p className="text-gray-700 text-xl font-medium">
            {searchTerm ? '🔍 No posts found matching your search.' : '📝 No posts available. Create your first post!'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white border-2 border-blue-100 rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:border-blue-300 transition-all transform hover:-translate-y-1"
            >
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{post.name}</h3>
                <p className="text-gray-700 mb-4 line-clamp-3 text-base leading-relaxed">{post.description}</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(post.id)}
                    className="flex-1 px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all font-semibold shadow-md"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(post)}
                    className="flex-1 px-5 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:from-red-600 hover:to-pink-700 transition-all font-semibold shadow-md"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteModalOpen && postToDelete && (
        <DeleteModal
          postName={postToDelete.name}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  )
}
