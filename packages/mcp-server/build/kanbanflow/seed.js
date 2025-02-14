import { KanbanService } from './kanban-service.js';
import { KANBAN_CONFIG } from './config.js';
export async function seedKanbanBoard() {
    const kanbanService = new KanbanService(KANBAN_CONFIG.API_TOKEN);
    // Create SMS implementation task
    await kanbanService.createTask({
        columnId: 'Q3OKqBpAPHtE',
        name: 'Implement SMS Provider (46elks)',
        description: 'Create a simple SMS service in the backend using 46elks as provider:\n\n' +
            '1. Create a backend service for handling SMS operations\n' +
            '2. Implement a simple REST endpoint for sending SMS\n' +
            '3. Integration with 46elks API\n\n' +
            'Keep it simple and focused on core functionality.'
    });
    console.log('✅ Kanban board seeded successfully');
}
// Run seeding if this file is executed directly
if (require.main === module) {
    seedKanbanBoard().catch(console.error);
}
