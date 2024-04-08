import { useCallback, useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

type PaginationMapValue = { first: string; last: string };

export const usePagination = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [startAfterId, setStartAfter] = useState("");
  const [endBeforeId, setEndBefore] = useState("");
  const [page, setPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [paginatedMap, setPaginatedMap] = useState<
    Map<number, PaginationMapValue>
  >(new Map());

  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      router.push(pathname + "?" + params.toString());
    },
    [searchParams, pathname, router]
  );

  const setMultipleParams = useCallback(
    (params: Record<string, string>) => {
      const sp = new URLSearchParams(searchParams.toString());
      const entries = Object.entries(params);
      entries.map(([key, val]) => {
        if (val) {
          sp.set(key, val);
        } else {
          sp.delete(key);
        }
      });
      router.push(pathname + "?" + sp.toString());
    },
    [searchParams, pathname, router]
  );

  useEffect(() => {
    let pageParam = searchParams.get("page");
    if (pageParam) {
      createQueryString("page", pageParam);
    } else {
      createQueryString("page", page.toString());
    }
  }, [searchParams, pathname, router, page, createQueryString]);

  const deleteQueryString = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name);
      router.push(pathname + "?" + params.toString());
    },
    [searchParams, pathname, router]
  );
  const onNextPage = () => {
    setMultipleParams({
      startAfter: paginatedMap.get(page)?.last!,
      page: (page + 1).toString(),
    });
  };

  const onPrevPage = () => {
    if (page - 1 === 1) {
      setMultipleParams({ startAfterId: "" });
    }
    setMultipleParams({
      startAfter: paginatedMap.get(page - 2)?.last!,
      page: (page - 1).toString(),
    });
  };

  useEffect(() => {
    let s = searchParams.get("startAfter");
    let e = searchParams.get("endBefore");
    let p = searchParams.get("page");

    if (s) {
      setStartAfter(s);
      setEndBefore("");
    }
    if (e) {
      setEndBefore(e);
      setStartAfter("");
    }
    if (p) {
      setPage(Number(p));
    }
  }, [searchParams]);

  const updatePaginationMap = (key: number, value: PaginationMapValue) => {
    setPaginatedMap((prevState) => new Map(prevState.set(key, value)));
  };

  return {
    startAfterId,
    endBeforeId,
    onNextPage,
    onPrevPage,
    page,
    resultsPerPage,
    setResultsPerPage,
    updatePaginationMap,
  };
};
