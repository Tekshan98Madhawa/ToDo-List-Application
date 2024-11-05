const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let tasks = [];
let nextId = 1;

const validateTask = (req, res, next) => {
    const { title, description } = req.body;
    
    
    if (req.method === 'POST') {
        if (!title || !description) {
            return res.status(400).json({
                error: 'Both title and description are required for creating a task'
            });
        }
    }

    
    if (title && title.length <3) {
        return res.status(400).json({
            error: 'Title must be at least 3 characters long'
        });
    }

    next();
};

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', validateTask, (req, res) => {
    const { title, description } = req.body;

    const task = {
        id: nextId++,
        title,
        description,
        status: 'pending' // default status on creation
    };

    tasks.push(task);
    res.status(201).json(task);
});

app.put('/tasks/:id', validateTask, (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const { title, description } = req.body;
    tasks[taskIndex] = {
        ...tasks[taskIndex],
        title: title || tasks[taskIndex].title,
        description: description || tasks[taskIndex].description
    };

    res.json(tasks[taskIndex]);
});

app.patch('/tasks/:id/status', (req, res) => {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    
    const validStatuses = ['pending', 'in_progress', 'completed'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({
            error: 'Invalid status. Must be one of: pending, in_progress, completed'
        });
    }

    tasks[taskIndex].status = status;
    res.json(tasks[taskIndex]);
}); 

app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks.splice(taskIndex, 1);
    res.status(204).send();
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'error !! Something went wrong.'
    });
}); 

app.listen(port, () => {
    console.log(`Todo API server running at http://localhost:${port}`);
});