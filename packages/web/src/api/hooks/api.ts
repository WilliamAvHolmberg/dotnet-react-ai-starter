/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * api
 * OpenAPI spec version: v1
 */
import {
  useInfiniteQuery,
  useMutation,
  useQuery
} from '@tanstack/react-query'
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseInfiniteQueryResult,
  DefinedUseQueryResult,
  InfiniteData,
  MutationFunction,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'
import type {
  CreateUserRequestDTO,
  GetApiUsersParams,
  LoginRequestDTO,
  LoginResponseDTO,
  UpdateUserRequestDTO,
  UserListResponseDTO,
  UserProfileResponseDTO,
  UserResponseDTO
} from '../models'
import { customClient } from '../client';
import type { ErrorType } from '../client';



export const postApiAuthLogin = (
    loginRequestDTO: LoginRequestDTO,
 signal?: AbortSignal
) => {
      
      
      return customClient<LoginResponseDTO>(
      {url: `/api/Auth/login`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: loginRequestDTO, signal
    },
      );
    }
  


export const getPostApiAuthLoginMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiAuthLogin>>, TError,{data: LoginRequestDTO}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postApiAuthLogin>>, TError,{data: LoginRequestDTO}, TContext> => {
const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiAuthLogin>>, {data: LoginRequestDTO}> = (props) => {
          const {data} = props ?? {};

          return  postApiAuthLogin(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiAuthLoginMutationResult = NonNullable<Awaited<ReturnType<typeof postApiAuthLogin>>>
    export type PostApiAuthLoginMutationBody = LoginRequestDTO
    export type PostApiAuthLoginMutationError = ErrorType<unknown>

    export const usePostApiAuthLogin = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiAuthLogin>>, TError,{data: LoginRequestDTO}, TContext>, }
): UseMutationResult<
        Awaited<ReturnType<typeof postApiAuthLogin>>,
        TError,
        {data: LoginRequestDTO},
        TContext
      > => {

      const mutationOptions = getPostApiAuthLoginMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
export const postApiAuthLogout = (
    
 signal?: AbortSignal
) => {
      
      
      return customClient<void>(
      {url: `/api/Auth/logout`, method: 'POST', signal
    },
      );
    }
  


export const getPostApiAuthLogoutMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiAuthLogout>>, TError,void, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postApiAuthLogout>>, TError,void, TContext> => {
const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiAuthLogout>>, void> = () => {
          

          return  postApiAuthLogout()
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiAuthLogoutMutationResult = NonNullable<Awaited<ReturnType<typeof postApiAuthLogout>>>
    
    export type PostApiAuthLogoutMutationError = ErrorType<unknown>

    export const usePostApiAuthLogout = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiAuthLogout>>, TError,void, TContext>, }
): UseMutationResult<
        Awaited<ReturnType<typeof postApiAuthLogout>>,
        TError,
        void,
        TContext
      > => {

      const mutationOptions = getPostApiAuthLogoutMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
export const getApiAuthMe = (
    
 signal?: AbortSignal
) => {
      
      
      return customClient<UserProfileResponseDTO>(
      {url: `/api/Auth/me`, method: 'GET', signal
    },
      );
    }
  

export const getGetApiAuthMeQueryKey = () => {
    return [`/api/Auth/me`] as const;
    }

    
export const getGetApiAuthMeInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiAuthMe>>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiAuthMe>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiAuthMeQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiAuthMe>>> = ({ signal }) => getApiAuthMe(signal);

      

      

   return  { queryKey, queryFn,   staleTime: 10000,  ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiAuthMe>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetApiAuthMeInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiAuthMe>>>
export type GetApiAuthMeInfiniteQueryError = ErrorType<unknown>


export function useGetApiAuthMeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiAuthMe>>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiAuthMe>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiAuthMe>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetApiAuthMeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiAuthMe>>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiAuthMe>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiAuthMe>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetApiAuthMeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiAuthMe>>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiAuthMe>>, TError, TData>>, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

export function useGetApiAuthMeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiAuthMe>>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiAuthMe>>, TError, TData>>, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetApiAuthMeInfiniteQueryOptions(options)

  const query = useInfiniteQuery(queryOptions) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getGetApiAuthMeQueryOptions = <TData = Awaited<ReturnType<typeof getApiAuthMe>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiAuthMe>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiAuthMeQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiAuthMe>>> = ({ signal }) => getApiAuthMe(signal);

      

      

   return  { queryKey, queryFn,   staleTime: 10000,  ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiAuthMe>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetApiAuthMeQueryResult = NonNullable<Awaited<ReturnType<typeof getApiAuthMe>>>
export type GetApiAuthMeQueryError = ErrorType<unknown>


export function useGetApiAuthMe<TData = Awaited<ReturnType<typeof getApiAuthMe>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiAuthMe>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiAuthMe>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetApiAuthMe<TData = Awaited<ReturnType<typeof getApiAuthMe>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiAuthMe>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiAuthMe>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetApiAuthMe<TData = Awaited<ReturnType<typeof getApiAuthMe>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiAuthMe>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

export function useGetApiAuthMe<TData = Awaited<ReturnType<typeof getApiAuthMe>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiAuthMe>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetApiAuthMeQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getApiUsers = (
    params?: GetApiUsersParams,
 signal?: AbortSignal
) => {
      
      
      return customClient<UserListResponseDTO>(
      {url: `/api/users`, method: 'GET',
        params, signal
    },
      );
    }
  

export const getGetApiUsersQueryKey = (params?: GetApiUsersParams,) => {
    return [`/api/users`, ...(params ? [params]: [])] as const;
    }

    
export const getGetApiUsersInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiUsers>>, GetApiUsersParams['pageNumber']>, TError = ErrorType<unknown>>(params?: GetApiUsersParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiUsers>>, TError, TData, Awaited<ReturnType<typeof getApiUsers>>, QueryKey, GetApiUsersParams['pageNumber']>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiUsersQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiUsers>>, QueryKey, GetApiUsersParams['pageNumber']> = ({ signal, pageParam }) => getApiUsers({...params, pageNumber: pageParam || params?.['pageNumber']}, signal);

      

      

   return  { queryKey, queryFn,   staleTime: 10000,  ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiUsers>>, TError, TData, Awaited<ReturnType<typeof getApiUsers>>, QueryKey, GetApiUsersParams['pageNumber']> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetApiUsersInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiUsers>>>
export type GetApiUsersInfiniteQueryError = ErrorType<unknown>


export function useGetApiUsersInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiUsers>>, GetApiUsersParams['pageNumber']>, TError = ErrorType<unknown>>(
 params: undefined |  GetApiUsersParams, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiUsers>>, TError, TData, Awaited<ReturnType<typeof getApiUsers>>, QueryKey, GetApiUsersParams['pageNumber']>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiUsers>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetApiUsersInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiUsers>>, GetApiUsersParams['pageNumber']>, TError = ErrorType<unknown>>(
 params?: GetApiUsersParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiUsers>>, TError, TData, Awaited<ReturnType<typeof getApiUsers>>, QueryKey, GetApiUsersParams['pageNumber']>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiUsers>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetApiUsersInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiUsers>>, GetApiUsersParams['pageNumber']>, TError = ErrorType<unknown>>(
 params?: GetApiUsersParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiUsers>>, TError, TData, Awaited<ReturnType<typeof getApiUsers>>, QueryKey, GetApiUsersParams['pageNumber']>>, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

export function useGetApiUsersInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiUsers>>, GetApiUsersParams['pageNumber']>, TError = ErrorType<unknown>>(
 params?: GetApiUsersParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiUsers>>, TError, TData, Awaited<ReturnType<typeof getApiUsers>>, QueryKey, GetApiUsersParams['pageNumber']>>, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetApiUsersInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getGetApiUsersQueryOptions = <TData = Awaited<ReturnType<typeof getApiUsers>>, TError = ErrorType<unknown>>(params?: GetApiUsersParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiUsers>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiUsersQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiUsers>>> = ({ signal }) => getApiUsers(params, signal);

      

      

   return  { queryKey, queryFn,   staleTime: 10000,  ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiUsers>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetApiUsersQueryResult = NonNullable<Awaited<ReturnType<typeof getApiUsers>>>
export type GetApiUsersQueryError = ErrorType<unknown>


export function useGetApiUsers<TData = Awaited<ReturnType<typeof getApiUsers>>, TError = ErrorType<unknown>>(
 params: undefined |  GetApiUsersParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiUsers>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiUsers>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetApiUsers<TData = Awaited<ReturnType<typeof getApiUsers>>, TError = ErrorType<unknown>>(
 params?: GetApiUsersParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiUsers>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiUsers>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetApiUsers<TData = Awaited<ReturnType<typeof getApiUsers>>, TError = ErrorType<unknown>>(
 params?: GetApiUsersParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiUsers>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

export function useGetApiUsers<TData = Awaited<ReturnType<typeof getApiUsers>>, TError = ErrorType<unknown>>(
 params?: GetApiUsersParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiUsers>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetApiUsersQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const postApiUsers = (
    createUserRequestDTO: CreateUserRequestDTO,
 signal?: AbortSignal
) => {
      
      
      return customClient<UserResponseDTO>(
      {url: `/api/users`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: createUserRequestDTO, signal
    },
      );
    }
  


export const getPostApiUsersMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiUsers>>, TError,{data: CreateUserRequestDTO}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postApiUsers>>, TError,{data: CreateUserRequestDTO}, TContext> => {
const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiUsers>>, {data: CreateUserRequestDTO}> = (props) => {
          const {data} = props ?? {};

          return  postApiUsers(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiUsersMutationResult = NonNullable<Awaited<ReturnType<typeof postApiUsers>>>
    export type PostApiUsersMutationBody = CreateUserRequestDTO
    export type PostApiUsersMutationError = ErrorType<unknown>

    export const usePostApiUsers = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiUsers>>, TError,{data: CreateUserRequestDTO}, TContext>, }
): UseMutationResult<
        Awaited<ReturnType<typeof postApiUsers>>,
        TError,
        {data: CreateUserRequestDTO},
        TContext
      > => {

      const mutationOptions = getPostApiUsersMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
export const getApiUsersId = (
    id: string,
 signal?: AbortSignal
) => {
      
      
      return customClient<UserResponseDTO>(
      {url: `/api/users/${id}`, method: 'GET', signal
    },
      );
    }
  

export const getGetApiUsersIdQueryKey = (id: string,) => {
    return [`/api/users/${id}`] as const;
    }

    
export const getGetApiUsersIdInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiUsersId>>>, TError = ErrorType<unknown>>(id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiUsersId>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiUsersIdQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiUsersId>>> = ({ signal }) => getApiUsersId(id, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id),  staleTime: 10000,  ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiUsersId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetApiUsersIdInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiUsersId>>>
export type GetApiUsersIdInfiniteQueryError = ErrorType<unknown>


export function useGetApiUsersIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiUsersId>>>, TError = ErrorType<unknown>>(
 id: string, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiUsersId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiUsersId>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetApiUsersIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiUsersId>>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiUsersId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiUsersId>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetApiUsersIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiUsersId>>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiUsersId>>, TError, TData>>, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

export function useGetApiUsersIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiUsersId>>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiUsersId>>, TError, TData>>, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetApiUsersIdInfiniteQueryOptions(id,options)

  const query = useInfiniteQuery(queryOptions) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getGetApiUsersIdQueryOptions = <TData = Awaited<ReturnType<typeof getApiUsersId>>, TError = ErrorType<unknown>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiUsersId>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiUsersIdQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiUsersId>>> = ({ signal }) => getApiUsersId(id, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id),  staleTime: 10000,  ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiUsersId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetApiUsersIdQueryResult = NonNullable<Awaited<ReturnType<typeof getApiUsersId>>>
export type GetApiUsersIdQueryError = ErrorType<unknown>


export function useGetApiUsersId<TData = Awaited<ReturnType<typeof getApiUsersId>>, TError = ErrorType<unknown>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiUsersId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiUsersId>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetApiUsersId<TData = Awaited<ReturnType<typeof getApiUsersId>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiUsersId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiUsersId>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetApiUsersId<TData = Awaited<ReturnType<typeof getApiUsersId>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiUsersId>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

export function useGetApiUsersId<TData = Awaited<ReturnType<typeof getApiUsersId>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiUsersId>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetApiUsersIdQueryOptions(id,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const putApiUsersId = (
    id: string,
    updateUserRequestDTO: UpdateUserRequestDTO,
 ) => {
      
      
      return customClient<void>(
      {url: `/api/users/${id}`, method: 'PUT',
      headers: {'Content-Type': 'application/json', },
      data: updateUserRequestDTO
    },
      );
    }
  


export const getPutApiUsersIdMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiUsersId>>, TError,{id: string;data: UpdateUserRequestDTO}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof putApiUsersId>>, TError,{id: string;data: UpdateUserRequestDTO}, TContext> => {
const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof putApiUsersId>>, {id: string;data: UpdateUserRequestDTO}> = (props) => {
          const {id,data} = props ?? {};

          return  putApiUsersId(id,data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PutApiUsersIdMutationResult = NonNullable<Awaited<ReturnType<typeof putApiUsersId>>>
    export type PutApiUsersIdMutationBody = UpdateUserRequestDTO
    export type PutApiUsersIdMutationError = ErrorType<unknown>

    export const usePutApiUsersId = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiUsersId>>, TError,{id: string;data: UpdateUserRequestDTO}, TContext>, }
): UseMutationResult<
        Awaited<ReturnType<typeof putApiUsersId>>,
        TError,
        {id: string;data: UpdateUserRequestDTO},
        TContext
      > => {

      const mutationOptions = getPutApiUsersIdMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
export const deleteApiUsersId = (
    id: string,
 ) => {
      
      
      return customClient<void>(
      {url: `/api/users/${id}`, method: 'DELETE'
    },
      );
    }
  


export const getDeleteApiUsersIdMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteApiUsersId>>, TError,{id: string}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof deleteApiUsersId>>, TError,{id: string}, TContext> => {
const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteApiUsersId>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  deleteApiUsersId(id,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type DeleteApiUsersIdMutationResult = NonNullable<Awaited<ReturnType<typeof deleteApiUsersId>>>
    
    export type DeleteApiUsersIdMutationError = ErrorType<unknown>

    export const useDeleteApiUsersId = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteApiUsersId>>, TError,{id: string}, TContext>, }
): UseMutationResult<
        Awaited<ReturnType<typeof deleteApiUsersId>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getDeleteApiUsersIdMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
export const postApiUsersSeed = (
    
 signal?: AbortSignal
) => {
      
      
      return customClient<void>(
      {url: `/api/users/seed`, method: 'POST', signal
    },
      );
    }
  


export const getPostApiUsersSeedMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiUsersSeed>>, TError,void, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postApiUsersSeed>>, TError,void, TContext> => {
const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiUsersSeed>>, void> = () => {
          

          return  postApiUsersSeed()
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiUsersSeedMutationResult = NonNullable<Awaited<ReturnType<typeof postApiUsersSeed>>>
    
    export type PostApiUsersSeedMutationError = ErrorType<unknown>

    export const usePostApiUsersSeed = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiUsersSeed>>, TError,void, TContext>, }
): UseMutationResult<
        Awaited<ReturnType<typeof postApiUsersSeed>>,
        TError,
        void,
        TContext
      > => {

      const mutationOptions = getPostApiUsersSeedMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
