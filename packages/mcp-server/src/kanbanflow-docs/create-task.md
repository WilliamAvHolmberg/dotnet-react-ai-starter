Create task
Description
Creates a new task. Returns an object containing the created task's ID. If task numbering is enabled for the board, it will also return the task's number.

Request format
curl -X POST https://kanbanflow.com/api/v1/tasks -H "Content-type: application/json" -d '{ "<PROPERTY_1>": <PROPERTY_VALUE_1>, "<PROPERTY_2>": <PROPERTY_VALUE_2>, ... "<PROPERTY_N>": <PROPERTY_VALUE_N> }'
Example request
curl -X POST https://kanbanflow.com/api/v1/tasks -H "Content-type: application/json" -d '{ "name": "Write report", "columnId": "C9LIn5sEEpqT", "color": "red" }'
Example response
{
    "taskId": "T3s6UGyzY"
}
Valid properties
Property	Type	Comment
name	String	Required.
columnId	String	One of columnId or columnIndex is required. See Get board for information about how to get a column's ID.
columnIndex	Integer	Deprecated. One of columnId or columnIndex is required. 0 is the first column, 1 the second column, etc.
swimlaneId	String	Required if the board has swimlanes. See Get board for information about how to get a swimlane's ID.
position	String/Integer	Optional. The index of the task in the column/swimlane or date group. groupingDate is required if the column is date grouped. Valid values: Positive number, "top" or "bottom". Note: The index is zero-based.
color	String	Optional. Valid color values: yellow, white, red, green, blue, purple, orange, cyan, brown, or magenta. It needs to be in lowercase.
description	String	Optional.
number	Object	Optional. The task number consists of an integer value and an optional prefix. If numbering is enabled on the board, the task will automatically be given a number if the property is not present. Examples: { "value": 5 }, { "prefix": "BUG-", "value": 5 }
responsibleUserId	String	Optional. The ID of the responsible user. See Get users tab for information about how to get a user's ID.
totalSecondsSpent	Integer	Deprecated. Examples: 1 hour = 3600, 2 hours = 7200 etc. Note: Manual time entries will be added to reflect the added time. See Add manual time entry under Create task for more control of how time is added to the task.
totalSecondsEstimate	Integer	Optional (default=0). Examples: 1 hour = 3600, 2 hours = 7200 etc.
pointsEstimate	Float	Optional (default=0). Estimated points for the task.
groupingDate	String	Optional. Can only be used if column is date grouped. Valid format is YYYY-MM-DD, e.g. 2023-12-31. Use null or empty string if you want it grouped as unknown date. If not set and column date grouped, then it will automatically use today's date for the UTC timezone.
dates	Array	Optional. A date requires a dueTimestamp and a targetColumnId. See Create/update date for more details about the optional properties. Example: { "dueTimestamp": "2023-03-01T12:00:00Z", "targetColumnId": "COxkPjd0wra4" }
subTasks	Array	Optional. A subtask consists of a name and an optional finished flag. See Create subtask for more details. Examples: { "name": "Write", "finished": true }, { "name": "Proofread" }
labels	Array	Optional. A label consists of a name and an optional pinned flag. See Create label for more details. Examples: { "name": "Project X" }, { "name": "Priority", "pinned": true }
collaborators	Array	Optional. A collaborator consists of a userId. See Add collaborator for more details. Examples: { "userId": "UHJ9JgtA" }