Get task by ID
Description
Returns a single task by ID.

Query parameters
includePosition: Include the task's position in the column/swimlane it is in.

Request format
curl https://kanbanflow.com/api/v1/tasks/<TASK_ID>
Example request
curl https://kanbanflow.com/api/v1/tasks/T3s6UGyzY
Example response
{
    "_id": "T3s6UGyzY",
    "name": "Write report",
    "description": "",
    "color": "red",
    "columnId": "C9LIn5sEEpqT"
}
Response properties
Property	Type	Comment
_id	String	The ID of the task.
name	String	The name of the task.
columnId	String	The ID of the column the task is in.
swimlaneId	String	The ID of the swimlane the task is in. Only included if the board has swimlanes.
position	Integer	The index of the task in the column/swimlane or date group. Only included if includePosition is set. Note: The index is zero-based.
description	String	The description of the task.
color	String	The color of the task. Possible color values: yellow, white, red, green, blue, purple, orange, cyan, brown, or magenta.
number	Object	The task number consists of an integer value and an optional prefix. Examples: { "value": 5 }, { "prefix": "BUG-", "value": 5 }
responsibleUserId	String	The ID of the responsible user. See Get users tab for information about how to see which user an ID belongs to.
totalSecondsSpent	Integer	The total number of seconds spent on the task. Examples: 1 hour = 3600, 2 hours = 7200 etc.
totalSecondsEstimate	Integer	The total number of seconds estimated for the task. Examples: 1 hour = 3600, 2 hours = 7200 etc. Only included if estimation unit is set to Time.
pointsEstimate	Float	Estimated points for the task. Only included if estimation unit is set to Points.
groupingDate	String	Only included if the column the task is in is date grouped. Format is YYYY-MM-DD. Example: 2023-12-31.
dates	Array	The dates of the task. Only included if there are any items. See Get dates for details.
subTasks	Array	The subtasks of the task. Only included if there are any items. See Get subtasks for details.
labels	Array	The labels of the task. Only included if there are any items. See Get labels for details.
collaborators	Array	The collaborators of the task. Only included if there are any items. See Get collaborators for details.
customFields	Array	The custom fields of the task. Only included if there are any items. See Get custom fields for details.
Get tasks by column
Description
Returns all tasks in a column that is found either by id, name or index.

When there are more tasks to fetch in the column, the response will have tasksLimited=true and a nextTaskId, which points at the next task in line. Pass it in the next request as startTaskId to retrieve the succeeding tasks.

See Get task by ID for details of included properties for the individual tasks.

Request format
curl https://kanbanflow.com/api/v1/tasks?<PARAM_1>=<PARAM_VALUE_1>&<PARAM_2>=<PARAM_VALUE_2>&...<PARAM_N>=<PARAM_VALUE_N>
Please note that you should URL encode the parameter, especially if it contains spaces.

Example request (id)
curl https://kanbanflow.com/api/v1/tasks?columnId=CBO1VNGqDc4K
Example request (name)
curl "https://kanbanflow.com/api/v1/tasks?columnName=In%20progress"
Example request (index)
curl https://kanbanflow.com/api/v1/tasks?columnIndex=2
Example request (startTaskId, limit, order)
curl https://kanbanflow.com/api/v1/tasks?columnId=CBO1VNGqDc4K&startTaskId=T3s6UGyzY&limit=50&order=desc
Example request (startGroupingDate, limit, order)
curl https://kanbanflow.com/api/v1/tasks?columnId=CBO1VNGqDc4K&startGroupingDate=2023-10-01&limit=50&order=asc
Example response
[
    {
        "columnId": "CBO1VNGqDc4K",
        "columnName": "In progress",
        "tasksLimited": false,
        "tasks": [
            {
                "_id": "T3s6UGyzY",
                "name": "Write report",
                "description": "",
                "color": "red",
                "columnId": "CBO1VNGqDc4K"
            }
        ]
    }
]
Valid parameters
Parameter	Type	Comment
columnId	String	One of columnId, columnIndex or columnName is required. See Get board for information about how to get a column's ID.
columnIndex	Integer	One of columnId, columnIndex or columnName is required. 0 is first column, 1 the second column, etc.
columnName	String	One of columnId, columnIndex or columnName is required.
startTaskId	String	Optional. Can only be used if column is date grouped. Task ID to start from in date grouped columns. Can not be combined with startGroupingDate.
startGroupingDate	String	Optional. Can only be used if column is date grouped. Valid format is YYYY-MM-DD, e.g. 2023-12-31. Can not be combined with startTaskId.
limit	Integer	Optional. Can only be used if column is date grouped. The maximum number of tasks to retrieve. The highest value that can be used is 100. Default: 20.
order	String	Optional. Can only be used if column is date grouped. Determines in what order tasks should be searched for. Can be either asc (ascending) or desc (descending). Default: desc. Example: If using startGroupingDate=2023-12-31 and order=desc, it will get tasks for 2023-12-31 and earlier dates.
Get tasks by swimlane and column
Description
Returns all tasks in the cell confined by a column and swimlane. Both column and swimlane can be given by id, name or index. For date grouped columns, the number of tasks returned will be limited to 20 by default, but the limit is customizable (up to 100). When there are more tasks to fetch in the column, the response will have tasksLimited=true and a nextTaskId, which points at the next task in line. Pass it in the next request as startTaskId to retrieve the succeeding tasks. Instead of startTaskId, startGroupingDate can be used to start at a certain date (date finished). Format: YYYY-MM-DD. It is also possible to specify in which order tasks should be returned, either ascending (asc) or descending (desc). Default: desc.

See Get task by ID for details of included properties for the individual tasks.

Request format
curl https://kanbanflow.com/api/v1/tasks?<PARAM_1>=<PARAM_VALUE_1>&<PARAM_2>=<PARAM_VALUE_2>&...<PARAM_N>=<PARAM_VALUE_N>
Please note that you should URL encode the parameter, especially if it contains spaces.

Example request (swimlaneId, columnId)
curl https://kanbanflow.com/api/v1/tasks?swimlaneId=SqEB6zxG41e2&columnId=CBO1VNGqDc4K
Example request (startTaskId, limit, order)
curl https://kanbanflow.com/api/v1/tasks?swimlaneId=SqEB6zxG41e2&columnId=CBO1VNGqDc4K&startTaskId=T3s6UGyzY&limit=50&order=desc
Example request (startGroupingDate, limit, order)
curl https://kanbanflow.com/api/v1/tasks?swimlaneId=SqEB6zxG41e2&columnId=CBO1VNGqDc4K&startGroupingDate=2023-10-01&limit=50&order=asc
Example response
[
    {
        "swimlaneId": "SqEB6zxG41e2",
        "swimlaneName": "Team Beta",
        "columnId": "CBO1VNGqDc4K",
        "columnName": "In progress",
        "tasksLimited": false,
        "tasks": [
            {
                "_id": "T3s6UGyzY",
                "name": "Write report",
                "description": "",
                "color": "red",
                "columnId": "CBO1VNGqDc4K",
                "swimlaneId": "SqEB6zxG41e2"
            }
        ]
    }
]
Valid parameters
Parameter	Type	Comment
columnId	String	One of columnId, columnIndex or columnName is required. See Get board for information about how to get a column's ID.
columnIndex	Integer	One of columnId, columnIndex or columnName is required. 0 is first column, 1 the second column, etc.
columnName	String	One of columnId, columnIndex or columnName is required.
swimlaneId	String	One of swimlaneId, swimlaneIndex or swimlaneName is required. See Get board for information about how to get a swimlane's ID.
swimlaneIndex	String	One of swimlaneId, swimlaneIndex or swimlaneName is required. 0 is first swimlane, 1 the second swimlane, etc.
swimlaneName	String	One of swimlaneId, swimlaneIndex or swimlaneName is required.
startTaskId	String	Optional. Can only be used if column is date grouped. Task ID to start from in date grouped columns. Can not be combined with startGroupingDate.
startGroupingDate	String	Optional. Can only be used if column is date grouped. Valid format is YYYY-MM-DD, e.g. 2023-12-31. Can not be combined with startTaskId.
limit	Integer	Optional. Can only be used if column is date grouped. The maximum number of tasks to retrieve. The highest value that can be used is 100. Default: 20.
order	String	Optional. Can only be used if column is date grouped. Determines in what order tasks should be searched for. Can be either asc (ascending) or desc (descending). Default: desc. Example: If using startGroupingDate=2023-12-31 and order=desc, it will get tasks for 2023-12-31 and earlier dates.
Get all tasks
Description
Returns all tasks on a board. For date grouped columns, it will only return a maximum of 20 tasks per cell. If it has more than 20 tasks tasksLimited=true in the response. To get more tasks for a specific cell, take a look at Get tasks by swimlane and column.

See Get task by ID for details of included properties for the individual tasks.

Request format
curl https://kanbanflow.com/api/v1/tasks
Example response
[
    {
        "columnId": "C9LIn5sEEpqT",
        "columnName": "To-do",
        "tasksLimited": false,
        "tasks": [
            {
                "_id": "T3s6UGyzY",
                "name": "Write report",
                "description": "",
                "color": "red",
                "columnId": "C9LIn5sEEpqT"
            }
        ]
    },
    {
        "columnId": "CAtDNYBBuU04",
        "columnName": "Do today",
        "tasksLimited": false,
        "tasks": []
    },
    {
        "columnId": "CBO1VNGqDc4K",
        "columnName": "In progress",
        "tasksLimited": false,
        "tasks": []
    },
    {
        "columnId": "COxkPjd0wra4",
        "columnName": "Done",
        "tasksLimited": false,
        "tasks": []
    }
]