// src/entities/storage.ts
import type { Task } from "./task";

const STORAGE_KEY = "tasks";

// сохранение задач
export function saveTasks(tasks: Task[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// загрузка задач
export function loadTasks(): Task[] {
    try {
        const raw = localStorage.getItem("tasks");
        if (!raw) return [];
        const parsed: Task[] = JSON.parse(raw);

        return parsed.map((t) => ({
            ...t,
            createdAt: new Date(t.createdAt),     // 👈 восстановление даты
            deadline: t.deadline ? new Date(t.deadline) : null, // 👈 восстановление дедлайна
        }));
    } catch {
        return [];
    }
}