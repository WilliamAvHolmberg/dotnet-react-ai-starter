export interface Column {
    name: string;
    uniqueId: string;
}

export interface Swimlane {
    name: string;
    uniqueId: string;
}

export interface ColorConfig {
    name: string;
    value: string;
    description?: string;
}

export interface Board {
    _id: string;
    name: string;
    columns: Column[];
    swimlanes?: Swimlane[];
    colors?: ColorConfig[];
}

export interface CreateTaskRequest {
    name: string;
    columnId: string;
    swimlaneId?: string;
    position?: string | number;
    color?: 'yellow' | 'white' | 'red' | 'green' | 'blue' | 'purple' | 'orange' | 'cyan' | 'brown' | 'magenta';
    description?: string;
    totalSecondsEstimate?: number;
    pointsEstimate?: number;
}

export interface CreateTaskResponse {
    taskId: string;
}

export interface KanbanError {
    message: string;
    status?: number;
    details?: unknown;
}

export interface KanbanTask {
    _id: string;
    name: string;
    columnId: string;
    swimlaneId?: string;
    position?: number;
    description?: string;
    color?: string;
    number?: {
        prefix?: string;
        value: number;
    };
    responsibleUserId?: string;
    totalSecondsSpent?: number;
    totalSecondsEstimate?: number;
    pointsEstimate?: number;
    groupingDate?: string;
    dates?: any[];
    subTasks?: any[];
    labels?: any[];
    collaborators?: any[];
    customFields?: any[];
}

export interface KanbanColumnTasksResponse {
    columnId: string;
    columnName: string;
    tasksLimited: boolean;
    tasks: KanbanTask[];
} 