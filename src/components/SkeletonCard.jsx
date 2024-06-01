export default function SkeletonCard() {
  return (
    <div className="flex w-full animate-pulse flex-col overflow-hidden">
      <div className="h-52 w-full rounded-t bg-gray-800"></div>
      <div className="z-10 flex items-center justify-between gap-3 rounded-b bg-gray-700 p-3">
        <div className="flex w-full flex-col gap-1 overflow-hidden">
          <div className="block h-4 w-full rounded-full bg-gray-600"></div>
          <div className="h-2 w-1/2 rounded-full bg-gray-600"></div>
        </div>
        <div className="h-6 w-6 shrink-0 rounded-full bg-gray-600"></div>
      </div>
    </div>
  );
}
