import { Icons } from "./Icons";

export function Pagination({
  count,
  onNextPage,
  onPrevPage,
  page,
  resultsPerPage,
  setResultsPerPage,
}: {
  count: number;
  page: number;
  onPrevPage: any;
  onNextPage: any;
  resultsPerPage: number;
  setResultsPerPage: any;
}) {
  return (
    <div className="w-full flex md:flex-row justify-between md:py-16 py-10 items-center md:items-center md:gap-4">
      <div className="flex justify-center items-center gap-4 w-[40%]">
        <p className="text-sm font-medium w-[100%]">
          Total Pages {Math.ceil(count / resultsPerPage)}
        </p>
      </div>
      <div className="flex flex-row gap-3 ml-auto justify-end items-center w-[60%]">
        <p className="text-sm ">
          Page No {page} of {Math.ceil(count / resultsPerPage)}
        </p>
        <button
          disabled={page === 1}
          onClick={() => onPrevPage()}
          className={`h-[30px] w-[30px] flex items-center justify-center rounded-full bg-primary cursor-pointer ${
            page === 1 && "opacity-80"
          }`}>
          <Icons.leftArrow />
        </button>
        <button
          disabled={page === Math.ceil(count / resultsPerPage)}
          onClick={() => {
            onNextPage();
          }}
          className={`h-[30px] w-[30px] flex items-center justify-center rounded-full bg-primary cursor-pointer ${
            page === Math.ceil(count / resultsPerPage) && "opacity-80"
          }`}>
          <Icons.rightArrow />
        </button>
      </div>
    </div>
  );
}
