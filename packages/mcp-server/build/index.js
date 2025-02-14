import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { z } from "zod";
import { KanbanService } from "./kanbanflow/kanban-service.js";
import express from "express";
import { KANBAN_CONFIG } from "./kanbanflow/config.js";
const kanbanService = new KanbanService(KANBAN_CONFIG.API_TOKEN);
console.error("[MCP Server] Starting Kanban Flow MCP server...");
// Create server instance
const server = new McpServer({
    name: "kanban-flow",
    version: "1.0.0",
});
console.error("[MCP Server] Server instance created");
// Helper function to format board response
function formatBoard(board) {
    return {
        name: board.name,
        columns: board.columns.map((col) => ({
            name: col.name,
            id: col.uniqueId,
        })),
    };
}
// Register Kanban Flow tools
console.error("[MCP Server] Registering tools...");
server.tool("get-board", "Get Kanban board structure", {}, async () => {
    console.error("[MCP Server] get-board tool called");
    try {
        const board = await kanbanService.getBoard();
        const formattedBoard = formatBoard(board);
        console.error("[MCP Server] Board retrieved successfully:", formattedBoard);
        return {
            content: [
                {
                    type: "text",
                    text: `Board: ${formattedBoard.name}\n\nColumns:\n${formattedBoard.columns
                        .map((col) => `- ${col.name} (ID: ${col.id})`)
                        .join("\n")}`,
                },
            ],
        };
    }
    catch (error) {
        console.error("[MCP Server] Error in get-board:", error);
        return {
            content: [
                {
                    type: "text",
                    text: `Failed to get board: ${error.message}`,
                },
            ],
        };
    }
});
server.tool("create-task", "Create a new task on the board", {
    name: z.string().describe("Name of the task"),
    columnId: z.string().describe("ID of the column to create the task in"),
    description: z.string().optional().describe("Optional task description"),
}, async ({ name, columnId, description }) => {
    console.error("[MCP Server] create-task tool called with:", { name, columnId, description });
    try {
        const task = await kanbanService.createTask({
            name,
            columnId,
            description,
        });
        console.error("[MCP Server] Task created successfully:", task);
        return {
            content: [
                {
                    type: "text",
                    text: `Successfully created task!\nTask ID: ${task.taskId}`,
                },
            ],
        };
    }
    catch (error) {
        console.error("[MCP Server] Error in create-task:", error);
        return {
            content: [
                {
                    type: "text",
                    text: `Failed to create task: ${error.message}`,
                },
            ],
        };
    }
});
server.tool("get-tasks", "Get all tasks in a column", {
    columnId: z.string().describe("ID of the column to get tasks from"),
}, async ({ columnId }) => {
    console.error("[MCP Server] get-tasks tool called with:", { columnId });
    try {
        const tasks = await kanbanService.getTasksByColumnId(columnId);
        console.error("[MCP Server] Tasks retrieved successfully:", tasks.length);
        const formattedTasks = tasks.map(task => `- ${task.name}${task.description ? ` (${task.description})` : ''} [ID: ${task._id}]`).join('\n');
        return {
            content: [
                {
                    type: "text",
                    text: tasks.length > 0
                        ? `Tasks in column:\n${formattedTasks}`
                        : "No tasks found in this column",
                },
            ],
        };
    }
    catch (error) {
        console.error("[MCP Server] Error in get-tasks:", error);
        return {
            content: [
                {
                    type: "text",
                    text: `Failed to get tasks: ${error.message}`,
                },
            ],
        };
    }
});
console.error("[MCP Server] Tools registered");
// Start the server
async function main() {
    console.error("[MCP Server] Setting up Express server...");
    const app = express();
    let transport;
    app.get("/sse", async (req, res) => {
        console.error("[MCP Server] New SSE connection established");
        transport = new SSEServerTransport("/messages", res);
        await server.connect(transport);
    });
    app.post("/messages", async (req, res) => {
        if (!transport) {
            res.status(400).json({ error: "No active SSE connection" });
            return;
        }
        await transport.handlePostMessage(req, res);
    });
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.error(`[MCP Server] Kanban Flow MCP Server running on http://localhost:${PORT}`);
    });
}
main().catch((error) => {
    console.error("[MCP Server] Fatal error in main():", error);
    process.exit(1);
});
const board = await kanbanService.getBoard();
const formattedBoard = formatBoard(board);
console.log(formattedBoard);
