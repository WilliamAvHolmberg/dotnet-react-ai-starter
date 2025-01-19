import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
    baseURL: '/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const customClient = async <T>(config: AxiosRequestConfig): Promise<T> => {
    const { data } = await axiosInstance(config);
    return data;
};

export type ErrorType<Error> = AxiosError<Error>;