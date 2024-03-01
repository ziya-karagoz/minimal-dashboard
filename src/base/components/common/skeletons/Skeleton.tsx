
const Skeleton = () => {
  return (
    <div role="status" className="space-y-2.5 animate-pulse mb-8">
      <div className="flex items-center w-full">
        <div className="h-2.5 bg-gray-100 rounded-full w-32"></div>
        <div className="h-2.5 ms-2 bg-gray-200 rounded-full w-24"></div>
        <div className="h-2.5 ms-2 bg-gray-200 rounded-full w-full"></div>
      </div>
      <div className="flex items-center w-full max-w-[95%]">
        <div className="h-2.5 bg-gray-100 rounded-full w-full"></div>
        <div className="h-2.5 ms-2 bg-gray-200 rounded-full w-full"></div>
        <div className="h-2.5 ms-2 bg-gray-200 rounded-full w-24"></div>
      </div>
      <div className="flex items-center w-full max-w-[85%]">
        <div className="h-2.5 bg-gray-200 rounded-full w-full"></div>
        <div className="h-2.5 ms-2 bg-gray-100 rounded-full w-80"></div>
        <div className="h-2.5 ms-2 bg-gray-200 rounded-full w-full"></div>
      </div>
      <div className="flex items-center w-full max-w-[95%]">
        <div className="h-2.5 ms-2 bg-gray-100 rounded-full w-full"></div>
        <div className="h-2.5 ms-2 bg-gray-200 rounded-full w-full"></div>
        <div className="h-2.5 ms-2 bg-gray-200 rounded-full w-24"></div>
      </div>
      <div className="flex items-center w-full max-w-[90%]">
        <div className="h-2.5 ms-2 bg-gray-200 rounded-full w-32"></div>
        <div className="h-2.5 ms-2 bg-gray-200 rounded-full w-24"></div>
        <div className="h-2.5 ms-2 bg-gray-100 rounded-full w-full"></div>
      </div>
      <div className="flex items-center w-full max-w-[80%]">
        <div className="h-2.5 ms-2 bg-gray-200 rounded-full w-full"></div>
        <div className="h-2.5 ms-2 bg-gray-100 rounded-full w-80"></div>
        <div className="h-2.5 ms-2 bg-gray-200 rounded-full w-full"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

const TextSkeleton = () => (
  <div role="status" className="space-y-2.5 animate-pulse mb-8">
    <div className="flex items-center w-full">
      <div className="h-2.5 bg-gray-100 rounded-full w-32"></div>
      <div className="h-2.5 ms-2 bg-gray-200 rounded-full w-24"></div>
      <div className="h-2.5 ms-2 bg-gray-200 rounded-full w-full"></div>
    </div>
    <div className="flex items-center w-full max-w-[95%]">
      <div className="h-2.5 bg-gray-100 rounded-full w-full"></div>
      <div className="h-2.5 ms-2 bg-gray-200 rounded-full w-full"></div>
      <div className="h-2.5 ms-2 bg-gray-200 rounded-full w-24"></div>
    </div>
    <div className="flex items-center w-full max-w-[85%]">
      <div className="h-2.5 bg-gray-200 rounded-full w-full"></div>
      <div className="h-2.5 ms-2 bg-gray-100 rounded-full w-80"></div>
      <div className="h-2.5 ms-2 bg-gray-200 rounded-full w-full"></div>
    </div>
    <div className="flex items-center w-full max-w-[95%]">
      <div className="h-2.5 ms-2 bg-gray-100 rounded-full w-full"></div>
      <div className="h-2.5 ms-2 bg-gray-200 rounded-full w-full"></div>
      <div className="h-2.5 ms-2 bg-gray-200 rounded-full w-24"></div>
    </div>
    <div className="flex items-center w-full max-w-[90%]">
      <div className="h-2.5 ms-2 bg-gray-200 rounded-full w-32"></div>
      <div className="h-2.5 ms-2 bg-gray-200 rounded-full w-24"></div>
      <div className="h-2.5 ms-2 bg-gray-100 rounded-full w-full"></div>
    </div>
    <div className="flex items-center w-full max-w-[80%]">
      <div className="h-2.5 ms-2 bg-gray-200 rounded-full w-full"></div>
      <div className="h-2.5 ms-2 bg-gray-100 rounded-full w-80"></div>
      <div className="h-2.5 ms-2 bg-gray-200 rounded-full w-full"></div>
    </div>
    <span className="sr-only">Loading...</span>
  </div>
)

Skeleton.Text = TextSkeleton;

export default Skeleton