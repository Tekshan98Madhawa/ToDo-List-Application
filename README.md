# ToDo-List-Application
# Todo List API

A simple Node.js REST API for managing a todo list with basic validation and error handling.

## Features

- CRUD operations for tasks
- In-memory data storage
- Input validation
- Error handling
- Status management for tasks

## Requirements

- Node.js (v12 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd todo-api
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The server will start running on http://localhost:3000

## API Endpoints

### GET /tasks
- Retrieves all tasks
- Response: Array of task objects

### POST /tasks
- Creates a new task
- Request body: `{ "title": "string", "description": "string" }`
- Validation:
  - Title and description are required
  - Title must be at least 3 characters long
- Response: Created task object

### PUT /tasks/:id
- Updates an existing task
- Request body: `{ "title": "string", "description": "string" }`
- Response: Updated task object

### PATCH /tasks/:id/status
- Updates task status
- Request body: `{ "status": "pending" | "in_progress" | "completed" }`
- Response: Updated task object

### DELETE /tasks/:id
- Deletes a task
- Response: 204 No Content

## Error Handling

The API returns appropriate status codes and error messages for:
- 400: Bad Request (validation errors)
- 404: Not Found (task doesn't exist)
- 500: Internal Server Error

## Testing

You can test the API using curl or any API testing tool like Postman:

```bash
# Create a task
curl -X POST -H "Content-Type: application/json" \
  -d '{"title":"Learn Node.js","description":"Build a REST API"}' \
  http://localhost:3000/tasks

# Get all tasks
curl http://localhost:3000/tasks

# Update task status
curl -X PATCH -H "Content-Type: application/json" \
  -d '{"status":"completed"}' \
  http://localhost:3000/tasks/1

# Delete a task
curl -X DELETE http://localhost:3000/tasks/1
```
