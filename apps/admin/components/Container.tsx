export function Container({
  children,
  title,
}: {
  children: JSX.Element;
  title: string;
}) {
  return (
    <div className="h-screen">
      <div className="h-14 border-b border-gray-200 hidden md:block"></div>
      <div className=" text-xl md:text-2xl px-7 font-bold mt-10">{title}</div>
      <div className="px-6">{children}</div>
    </div>
  );
}
