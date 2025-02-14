import axios, { 
    AxiosInstance, 
    InternalAxiosRequestConfig,
    AxiosResponse, 
    AxiosError 
} from 'axios';
import { KANBAN_CONFIG, DEFAULT_HEADERS } from './config.js';
import { KanbanError } from './types.js';

export class KanbanClient {
    private client: AxiosInstance;
    private apiToken: string;

    constructor(apiToken: string = KANBAN_CONFIG.API_TOKEN) {
        this.apiToken = apiToken;
        this.client = axios.create({
            baseURL: KANBAN_CONFIG.BASE_URL,
            headers: {
                ...DEFAULT_HEADERS,
                'Authorization': `Basic ${this.getEncodedCredentials()}`
            }
        });

        // Add logging interceptors
        this.setupLogging();
    }

    private getEncodedCredentials(): string {
        const credentials = `apiToken:${this.apiToken}`;
        return Buffer.from(credentials).toString('base64');
    }

    private setupLogging() {
        this.client.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                console.log(`[KanbanFlow] Request: ${config.method?.toUpperCase()} ${config.url}`);
                console.log('[KanbanFlow] Headers:', JSON.stringify(config.headers, null, 2));
                if (config.data) {
                    console.log('[KanbanFlow] Request Data:', JSON.stringify(config.data, null, 2));
                }
                return config;
            },
            (error: AxiosError) => {
                console.error('[KanbanFlow] Request Error:', error);
                return Promise.reject(error);
            }
        );

        this.client.interceptors.response.use(
            (response: AxiosResponse) => {
                console.log(`[KanbanFlow] Response Status: ${response.status}`);
                console.log('[KanbanFlow] Response Data:', JSON.stringify(response.data, null, 2));
                return response;
            },
            (error: AxiosError) => {
                console.error('[KanbanFlow] Response Error:', {
                    status: error.response?.status,
                    data: error.response?.data,
                    message: error.message
                });
                return Promise.reject(this.formatError(error));
            }
        );
    }

    private formatError(error: AxiosError): KanbanError {
        const errorData = error.response?.data as { message?: string } | undefined;
        return {
            message: errorData?.message || error.message || 'Unknown error occurred',
            status: error.response?.status,
            details: error.response?.data
        };
    }

    async get<T>(endpoint: string): Promise<T> {
        try {
            console.log(`[KanbanFlow] Making GET request to ${endpoint}`);
            const response = await this.client.get<T>(endpoint);
            return response.data;
        } catch (error) {
            console.error(`[KanbanFlow] GET request failed for ${endpoint}:`, error);
            throw error;
        }
    }

    async post<T>(endpoint: string, data: any): Promise<T> {
        try {
            console.log(`[KanbanFlow] Making POST request to ${endpoint}`);
            const response = await this.client.post<T>(endpoint, data);
            return response.data;
        } catch (error) {
            console.error(`[KanbanFlow] POST request failed for ${endpoint}:`, error);
            throw error;
        }
    }
} 