Get board
Description
Returns the structure of the board belonging to the token.

Request format
curl https://kanbanflow.com/api/v1/board
Example response
{
    "_id": "BZrWANX8T",
    "name": "My first board",
    "columns": [
        {
            "name": "To-do",
            "uniqueId": "C9LIn5sEEpqT"
        },
        {
            "name": "Do today",
            "uniqueId": "CAtDNYBBuU04"
        },
        {
            "name": "In progress",
            "uniqueId": "CBO1VNGqDc4K"
        },
        {
            "name": "Done",
            "uniqueId": "COxkPjd0wra4"
        }
    ],
    "swimlanes": [
        {
            "name": "Team Alpha",
            "uniqueId": "SqEB6zxG41e2"
        },
        {
            "name": "Team Beta",
            "uniqueId": "S3KhosIqdvqk"
        }
    ],
    "colors": [
        {
            "name": "Bug",
            "value": "red",
            "description": "This is a bug."
        },
        {
            "name": "Feature",
            "value": "green",
            "description": "This is a feature."
        }
    ]
}