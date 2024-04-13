
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

type TextSkeletonProps = {
  line?: number
  bar?: number
}


const TextSkeleton: React.FC<TextSkeletonProps> = ({ line = 3, bar = 4 }) => {

  const generateRandomLine = () => {
    return Math.floor(Math.random() * (100 - 80 + 1)) + 80;
  }

  const generateRandomBar = () => {
    const random = Math.floor(Math.random() * 5);
    switch (random) {
      case 0:
        return 32;
      case 1:
        return 24;
      case 2:
        return 100;
      case 3:
        return 80;
      default:
        return 80;
    }
  }

  const lines = [];
  for (let i = 0; i < line; i++) {
    //Generate random widt for the first line
    const lineWidth = generateRandomLine();

    const bars = [];
    for (let j = 0; j < bar; j++) {
      const barWidth = generateRandomBar();
      bars.push(
        <div key={j} className={`h-2.5 ms-2 bg-gray-${j % 2 === 0 ? 100 : 200

          } rounded-full w-${barWidth}`}></div>
      )
    }


    lines.push(
      <div key={i} className="flex items-center w-full">
        <div className={`h-2.5 bg-gray-${i % 2 === 0 ? 100 : 200

          } rounded-full w-${lineWidth}`}></div>
        {bars}
      </div>
    )
  }



  return (
    <div role="status" className="space-y-2.5 animate-pulse mb-8">
      {lines}
      <span className="sr-only">Loading...</span>
    </div>
  )
};


Skeleton.Text = TextSkeleton;

export default Skeleton