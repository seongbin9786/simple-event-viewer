import { useEffect, useState } from "react";

export interface PaginatedResult<ResultType> {
  data: ResultType;
  isLoading: boolean;
  isEnabled: boolean;
  totalPages: number;
  reset: () => void;
}

type PaginatedResultType<ResultType> = {
  data: ResultType;
  totalLength: number;
  pageToken: string;
};

interface FetchProps<ResultType> {
  enabled?: boolean;
  initialData?: ResultType;
  pageSize: number;
  currentPage: number;
  fetchFn: (nextPageToken: string) => Promise<PaginatedResultType<ResultType>>;
  deps?: unknown[];
}

export const useTokenPaginatedFetch = <ResultType>({
  enabled = true,
  initialData = undefined,
  pageSize,
  currentPage,
  fetchFn,
  deps = [],
}: FetchProps<ResultType>): PaginatedResult<ResultType> => {
  // TODO: page 별 데이터로 보관해 cache 기능 제공
  const [fetchResult, setFetchResult] = useState<ResultType | undefined>(
    initialData,
  );
  const [error, setError] = useState<unknown | undefined>(undefined);
  const [totalPages, setTotalPages] = useState(0);
  const [visitedPage, setVisitedPage] = useState(0);
  const [pageTokens, setPageTokens] = useState([""]);

  const reset = () => {
    setFetchResult(undefined);
    setError(undefined);
    setVisitedPage(0);
    setTotalPages(0);
    setPageTokens([""]);
  };

  // pageSize 변경 시 초기화 필요
  useEffect(() => {
    reset();
  }, [pageSize]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    if (currentPage > visitedPage + 1) {
      throw new Error("다음 페이지는 선형적으로만 방문 가능합니다.");
    }

    (async function () {
      try {
        const { data, totalLength, pageToken } = await fetchFn(
          pageTokens[currentPage - 1],
        );
        setFetchResult(data);
        setTotalPages(Math.ceil(totalLength / pageSize));
        if (currentPage >= visitedPage) {
          setPageTokens([...pageTokens, pageToken]);
          setVisitedPage(visitedPage + 1);
        }
      } catch (error) {
        // FIXME: 개별 page에 대한 fetch 자체의 오류 처리와 pagination 처리를 분리하기
        setError(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, pageSize, currentPage, ...deps]);

  if (error) {
    throw error;
  }

  if (!enabled) {
    return {
      data: undefined,
      isLoading: false,
      isEnabled: false,
      totalPages: 0,
      reset,
    } as PaginatedResult<ResultType>;
  }

  return fetchResult === undefined
    ? ({
        data: undefined,
        isLoading: true,
        isEnabled: true,
        totalPages,
        reset,
      } as PaginatedResult<ResultType>)
    : ({
        data: fetchResult,
        isLoading: false,
        isEnabled: true,
        totalPages,
        reset,
      } as PaginatedResult<ResultType>);
};
