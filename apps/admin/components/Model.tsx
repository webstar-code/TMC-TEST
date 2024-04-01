export function Modal({ children }: { children: JSX.Element }) {
  return (
    <div className="flex justify-center absolute items-center h-screen z-40">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white md:p-8 rounded-lg shadow-md m-6 flex h-fit md:w-[45%] flex-col justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
