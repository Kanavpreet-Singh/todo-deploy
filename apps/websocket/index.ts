import { WebSocketServer } from "ws";
import { prisma } from "db";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
	ws.send("Welcome to the WebSocket server!");
	ws.on("message", (message) => {
		ws.send(`Echo: ${message}`);
	});
});

console.log("WebSocket server started on ws://localhost:8080");
