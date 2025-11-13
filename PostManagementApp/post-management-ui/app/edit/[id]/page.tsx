import EditPostForm from '@/components/EditPostForm'

interface EditPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditPage({ params }: EditPageProps) {
  const { id } = await params
  const postId = parseInt(id, 10)

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Edit Post</h2>
        <p className="text-gray-600 mt-2">Update the post details below</p>
      </div>
      <EditPostForm postId={postId} />
    </div>
  )
}
