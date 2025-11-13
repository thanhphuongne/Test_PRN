import PostList from '@/components/PostList'

export default function Home() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">All Posts</h2>
        <p className="text-gray-600 mt-2">Browse, search, and manage your posts</p>
      </div>
      <PostList />
    </div>
  )
}
