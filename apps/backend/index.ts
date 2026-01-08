import express from "express"
import { prismaClient } from "db/client";

const app = express();
app.use(express.json());

// Fetch all todos
app.get("/todos", async (req, res) => {
    try {
        const todos = await prismaClient.todo.findMany();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch todos" });
    }
});

// Create a new todo
app.post("/todos", async (req, res) => {
    const { task, done = false, userId } = req.body;
    try {
        const todo = await prismaClient.todo.create({
            data: { task, done, userId },
        });
        res.status(201).json(todo);
    } catch (error) {
        res.status(400).json({ error: "Failed to create todo" });
    }
});

// Fetch all users
app.get("/users", async (req, res) => {
    try {
        const users = await prismaClient.user.findMany({
            include: { todos: true }
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// Create a new user
app.post("/users", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await prismaClient.user.create({
            data: { username, password },
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: "Failed to create user" });
    }
});

app.listen(3001);