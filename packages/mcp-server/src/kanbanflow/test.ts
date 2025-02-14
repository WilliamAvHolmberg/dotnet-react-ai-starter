import { KanbanService } from './kanban-service.js';

async function test() {
    console.log('Starting Kanban Flow test...');
    
    // Initialize service with the token
    const service = new KanbanService('JzxLfbAiN8xhqNeguio8BcPBk1');
    
    try {
        console.log('Attempting to get board...');
        const board = await service.getBoard();
        
        console.log('\nBoard retrieved successfully!');
        console.log('Board name:', board.name);
        console.log('\nColumns:');
        board.columns.forEach(col => {
            console.log(`- ${col.name} (ID: ${col.uniqueId})`);
        });
        
        if (board.swimlanes) {
            console.log('\nSwimlanes:');
            board.swimlanes.forEach(lane => {
                console.log(`- ${lane.name} (ID: ${lane.uniqueId})`);
            });
        }
        
        if (board.colors) {
            console.log('\nColors:');
            board.colors.forEach(color => {
                console.log(`- ${color.name}: ${color.value}${color.description ? ` (${color.description})` : ''}`);
            });
        }
    } catch (error) {
        console.error('Error getting board:', error);
    }
}

// Run the test
test().catch(console.error); 