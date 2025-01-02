import { useEffect, useState } from "react";

interface UseFetchProps<ResultType> {
  enabled?: boolean;
  initialData?: ResultType;
  fetchFn: () => Promise<ResultType>;
  deps?: unknown[];
}

export const useFetch = <ResultType>({
  enabled = true,
  initialData = undefined,
  fetchFn,
  deps = [],
}: UseFetchProps<ResultType>) => {
  const [fetchResult, setFetchResult] = useState<ResultType | undefined>(
    initialData,
  );
  const [error, setError] = useState<unknown | undefined>(undefined);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    (async function () {
      try {
        const resultData = await fetchFn();
        setFetchResult(resultData);
      } catch (error) {
        setError(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ...deps]);

  if (error) {
    throw error;
  }

  return fetchResult === undefined
    ? ({
        data: undefined,
        isLoading: true,
      } as const)
    : ({
        data: fetchResult,
        isLoading: false,
      } as const);
};