import { BookCheck } from "lucide-react";

export default function Page() {
  return (
    <>
      {/* {[...Array(40)].map((_, i) => (
					<div className="bg-white text-gray-800 size-12 rounded-full flex items-center justify-center">
						{i}
					</div>
				))} */}

      <div className="flex w-60 flex-col bg-gray-800">
        <div className="flex h-12 items-center px-3 font-bold shadow-md">
          Tailwind CSS
        </div>
        <div className="flex-1 overflow-y-auto font-medium text-gray-300">
          <div className="flex items-center px-3 text-gray-300">
            <BookCheck className="size-5 text-gray-400" />
            Welcome
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col bg-gray-700">
        <div className="flex h-12 items-center px-3 shadow-md">General</div>
        <div className="flex-1 space-y-4 overflow-y-auto p-3">
          {[...Array(40)].map((_, i) => (
            <p key={i}>
              Message {i}. Lorem ipsum dolor, sit amet consectetur adipisicing
              elit. Impedit ad distinctio beatae fugit illum obcaecati quod
              pariatur voluptatem quidem assumenda, culpa error vero sunt
              cupiditate.
            </p>
          ))}
        </div>
      </div>
    </>
  );
}
