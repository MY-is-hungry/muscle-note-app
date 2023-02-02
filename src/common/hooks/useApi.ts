import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query"

// USAGE:
// const useFetchTasks = (taskListId: string) =>
//   useApi(
//     ['tasks', { taskListId }],
//     async ({ taskListId }) => getRequest(`users/${taskListId}`),
//     {enabled: !!taskListId},
//   )
//
// const { data, isError, isLoading } = useFetchTasks(taskListId)
export const useApi = <
  TQueryKey extends [string, (Record<string, unknown> | string)?],
  TQueryFnData,
  TError,
  TData = TQueryFnData,
>(
  queryKey: TQueryKey,
  fetcher: (params: TQueryKey[1]) => Promise<TQueryFnData>,
  options?: Omit<
  UseQueryOptions<unknown, TError, TData, TQueryKey>,
  'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey,
    queryFn: async () => fetcher(queryKey[1]),
    ...options,
  })
}

export const useGenericMutation = <TVariables, TData, TContext>(
  fetcher: (params: TVariables) => Promise<TData | void>,
  options?: UseMutationOptions<TData | void, unknown, TVariables, TContext>,
) => {
  return useMutation(
    async (params: TVariables) => await fetcher(params),
    { ...options },
  )
}