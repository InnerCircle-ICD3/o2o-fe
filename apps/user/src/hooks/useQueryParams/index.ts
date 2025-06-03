export const useQueryParams = () => {
  const queryParams = new URLSearchParams();

  const setQueryParams = (key: string, value: string) => {
    queryParams.set(key, value);
  };

  const setAllQueryParams = (params: Record<string, string | number | undefined>) => {
    for (const [key, value] of Object.entries(params)) {
      setQueryParams(key, String(value ?? ""));
    }
  };

  const getQueryParams = (key: string) => queryParams?.get(key);
  const getAllQueryParams = (key: string) => queryParams?.getAll(key);

  return {
    queryParams,
    setQueryParams,
    setAllQueryParams,
    getQueryParams,
    getAllQueryParams,
  };
};
