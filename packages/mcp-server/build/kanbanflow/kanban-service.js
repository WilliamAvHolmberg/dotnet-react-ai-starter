import { KanbanClient } from './kanban-client.js';
import { KANBAN_CONFIG } from './config.js';
export class KanbanService {
    client;
    constructor() {
        console.log('[KanbanService] Initializing KanbanService');
        this.client = new KanbanClient();
    }
    async getBoard() {
        console.log('[KanbanService] Getting board information');
        try {
            const board = await this.client.get(KANBAN_CONFIG.ENDPOINTS.BOARD);
            console.log('[KanbanService] Successfully retrieved board:', board._id);
            return board;
        }
        catch (error) {
            console.error('[KanbanService] Failed to get board:', error);
            throw error;
        }
    }
    async createTask(task) {
        console.log('[KanbanService] Creating new task:', task.name);
        try {
            const response = await this.client.post(KANBAN_CONFIG.ENDPOINTS.TASKS, task);
            console.log('[KanbanService] Successfully created task:', response.taskId);
            return response;
        }
        catch (error) {
            console.error('[KanbanService] Failed to create task:', error);
            throw error;
        }
    }
    async getTasksByColumnId(columnId) {
        console.log('[KanbanService] Getting tasks for column:', columnId);
        try {
            const response = await this.client.get(`${KANBAN_CONFIG.ENDPOINTS.TASKS}?columnId=${columnId}`);
            if (response.length === 0) {
                console.log('[KanbanService] No tasks found for column:', columnId);
                return [];
            }
            const columnTasks = response[0];
            console.log(`[KanbanService] Successfully retrieved ${columnTasks.tasks.length} tasks from column:`, columnTasks.columnName);
            return columnTasks.tasks;
        }
        catch (error) {
            console.error('[KanbanService] Failed to get tasks for column:', error);
            throw error;
        }
    }
}
