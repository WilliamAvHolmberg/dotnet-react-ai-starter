import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export const apiClient = axios.create({
    baseURL: '',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const customClient = async <T>(config: AxiosRequestConfig): Promise<T> => {
    const { data } = await apiClient(config);
    return data;
};

export type ErrorType<Error> = AxiosError<Error>;