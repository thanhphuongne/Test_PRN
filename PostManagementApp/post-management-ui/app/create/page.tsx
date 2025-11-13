import CreatePostForm from '@/components/CreatePostForm'

export default function CreatePage() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Create New Post</h2>
        <p className="text-gray-600 mt-2">Fill in the details to create a new post</p>
      </div>
      <CreatePostForm />
    </div>
  )
}
