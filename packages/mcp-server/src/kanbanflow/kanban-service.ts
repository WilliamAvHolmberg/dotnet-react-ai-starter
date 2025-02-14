import { KanbanClient } from './kanban-client.js';
import { KANBAN_CONFIG } from './config.js';
import { Board, CreateTaskRequest, CreateTaskResponse, KanbanColumnTasksResponse, KanbanTask } from './types.js';

export class KanbanService {
    private client: KanbanClient;

    constructor() {
        console.log('[KanbanService] Initializing KanbanService');
        this.client = new KanbanClient();
    }

    async getBoard(): Promise<Board> {
        console.log('[KanbanService] Getting board information');
        try {
            const board = await this.client.get<Board>(KANBAN_CONFIG.ENDPOINTS.BOARD);
            console.log('[KanbanService] Successfully retrieved board:', board._id);
            return board;
        } catch (error) {
            console.error('[KanbanService] Failed to get board:', error);
            throw error;
        }
    }

    async createTask(task: CreateTaskRequest): Promise<CreateTaskResponse> {
        console.log('[KanbanService] Creating new task:', task.name);
        try {
            const response = await this.client.post<CreateTaskResponse>(
                KANBAN_CONFIG.ENDPOINTS.TASKS,
                task
            );
            console.log('[KanbanService] Successfully created task:', response.taskId);
            return response;
        } catch (error) {
            console.error('[KanbanService] Failed to create task:', error);
            throw error;
        }
    }

    async getTasksByColumnId(columnId: string): Promise<KanbanTask[]> {
        console.log('[KanbanService] Getting tasks for column:', columnId);
        try {
            const response = await this.client.get<KanbanColumnTasksResponse[]>(
                `${KANBAN_CONFIG.ENDPOINTS.TASKS}?columnId=${columnId}`
            );
            
            if (response.length === 0) {
                console.log('[KanbanService] No tasks found for column:', columnId);
                return [];
            }

            const columnTasks = response[0];
            console.log(`[KanbanService] Successfully retrieved ${columnTasks.tasks.length} tasks from column:`, columnTasks.columnName);
            
            return columnTasks.tasks;
        } catch (error) {
            console.error('[KanbanService] Failed to get tasks for column:', error);
            throw error;
        }
    }
} 