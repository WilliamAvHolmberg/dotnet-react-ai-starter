export const KANBAN_CONFIG = {
    BASE_URL: 'https://kanbanflow.com/api/v1',
    API_TOKEN: process.env.KANBAN_API_TOKEN || '',
    ENDPOINTS: {
        BOARD: '/board',
        TASKS: '/tasks'
    }
} as const;

// Validate API token
if (!KANBAN_CONFIG.API_TOKEN) {
    throw new Error('KANBAN_API_TOKEN environment variable is required');
}

export const DEFAULT_HEADERS = {
    'Content-Type': 'application/json'
} as const;