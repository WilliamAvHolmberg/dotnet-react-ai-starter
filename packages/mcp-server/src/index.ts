import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { z } from "zod";
import { KanbanService } from "./kanbanflow/kanban-service.js";
import { Board, Column } from "./kanbanflow/types.js";
import express, { Request, Response } from "express";

const kanbanService = new KanbanService();

console.error("[MCP Server] Starting Kanban Flow MCP server...");

// Create server instance
const server = new McpServer({
    name: "kanban-flow",
    version: "1.0.0",
});

console.error("[MCP Server] Server instance created");

// Helper function to format board response
function formatBoard(board: Board) {
    return {
        name: board.name,
        columns: board.columns.map((col: Column) => ({
            name: col.name,
            id: col.uniqueId,
        })),
    };
}

// Register Kanban Flow tools
console.error("[MCP Server] Registering tools...");

// server.tool(
//     "get-board",
//     "Get Kanban board structure",
//     {},
//     async () => {
//         console.error("[MCP Server] get-board tool called");
//         try {
//             const board = await kanbanService.getBoard();
//             const formattedBoard = formatBoard(board);
//             console.error("[MCP Server] Board retrieved successfully:", formattedBoard);

//             return {
//                 content: [
//                     {
//                         type: "text",
//                         text: `Board: ${formattedBoard.name}\n\nColumns:\n${formattedBoard.columns
//                             .map((col) => `- ${col.name} (ID: ${col.id})`)
//                             .join("\n")}`,
//                     },
//                 ],
//             };
//         } catch (error: any) {
//             console.error("[MCP Server] Error in get-board:", error);
//             return {
//                 content: [
//                     {
//                         type: "text",
//                         text: `Failed to get board: ${error.message}`,
//                     },
//                 ],
//             };
//     }
// );

// server.tool(
//     "create-task",
//     "Create a new task on the board",
//     {
//         name: z.string().describe("Name of the task"),
//         columnId: z.string().describe("ID of the column to create the task in"),
//         description: z.string().optional().describe("Optional task description"),
//     },
//     async ({ name, columnId, description }) => {
//         console.error("[MCP Server] create-task tool called with:", { name, columnId, description });
//         try {
//             const task = await kanbanService.createTask({
//                 name,
//                 columnId,
//                 description,
//             });
//             console.error("[MCP Server] Task created successfully:", task);

//             return {
//                 content: [
//                     {
//                         type: "text",
//                         text: `Successfully created task!\nTask ID: ${task.taskId}`,
//                     },
//                 ],
//             };
//         } catch (error: any) {
//             console.error("[MCP Server] Error in create-task:", error);
//             return {
//                 content: [
//                     {
//                         type: "text",
//                         text: `Failed to create task: ${error.message}`,
//                     },
//                 ],
//             };
//     }
// );

// server.tool(
//     "get-tasks",
//     "Get all tasks in a column",
//     {
//         columnId: z.string().describe("ID of the column to get tasks from"),
//     },
//     async ({ columnId }) => {
//         console.error("[MCP Server] get-tasks tool called with:", { columnId });
//         try {
//             const tasks = await kanbanService.getTasksByColumnId(columnId);
//             console.error("[MCP Server] Tasks retrieved successfully:", tasks.length);

//             const formattedTasks = tasks.map(task => 
//                 `- ${task.name}${task.description ? ` (${task.description})` : ''} [ID: ${task._id}]`
//             ).join('\n');

//             return {
//                 content: [
//                     {
//                         type: "text",
//                         text: tasks.length > 0 
//                             ? `Tasks in column:\n${formattedTasks}`
//                             : "No tasks found in this column",
//                     },
//                 ],
//             };
//         } catch (error: any) {
//             console.error("[MCP Server] Error in get-tasks:", error);
//             return {
//                 content: [
//                     {
//                         type: "text",
//                         text: `Failed to get tasks: ${error.message}`,
//                     },
//                 ],
//             };
//         }
//     }
// );

server.tool(
    "get-nuget-versions",
    "Get the latest version(s) of one or multiple NuGet packages",
    {
        packages: z.string().describe("The NuGet package ID(s) to check versions for, multiple packages can be separated by comma")
    },
    async ({ packages }) => {
        console.error("[MCP Server] get-nuget-versions tool called with:", { packages });
        try {
            const packageIds = packages.split(',').map(p => p.trim());
            const results = await Promise.all(packageIds.map(async (id) => {
                try {
                    const response = await fetch(`https://api.nuget.org/v3/registration5-semver1/${id.toLowerCase()}/index.json`);
                    
                    if (!response.ok) {
                        return `Package '${id}' not found`;
                    }

                    const data = await response.json();
                    if (!data.items || !data.items.length) {
                        return `No version information found for package '${id}'`;
                    }
                    
                    // Get the last (most recent) item
                    const lastItem = data.items[data.items.length - 1];
                    
                    // Try to get version from different possible locations in the API response
                    const latestVersion = lastItem.upper || 
                                        (lastItem.items && lastItem.items.length && lastItem.items[lastItem.items.length - 1].catalogEntry.version) ||
                                        lastItem.catalogEntry?.version;
                                        
                    if (!latestVersion) {
                        return `Could not determine latest version for package '${id}'`;
                    }
                    
                    return `Latest version of ${id}: ${latestVersion}`;
                } catch (error: any) {
                    return `Failed to get version for ${id}: ${error.message}`;
                }
            }));

            console.error("[MCP Server] Versions retrieved successfully");

            return {
                content: [
                    {
                        type: "text",
                        text: results.join('\n'),
                    },
                ],
            };
        } catch (error: any) {
            console.error("[MCP Server] Error in get-nuget-versions:", error);
            return {
                content: [
                    {
                        type: "text",
                        text: `Failed to get package versions: ${error.message}`,
                    },
                ],
            };
        }
    }
);

console.error("[MCP Server] Tools registered");

// Start the server
async function main() {
    console.error("[MCP Server] Setting up Express server...");
    const app = express();
    let transport: SSEServerTransport;

    app.get("/sse", async (req: Request, res: Response) => {
        console.error("[MCP Server] New SSE connection established");
        transport = new SSEServerTransport("/messages", res);
        await server.connect(transport);
    });

    app.post("/messages", async (req: Request, res: Response) => {
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