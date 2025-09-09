// Тип задачи
export type Task = {
    readonly id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
    description?: string;
    deadline?: Date | null;
};

// Тип фильтра для списка задач
export type Filter = "all" | "active" | "completed";

// Фабрика для создания новой задачи
export function makeTask(title: string): Task {
    return {
        id: Math.random().toString(36).slice(2, 9),
        title: title.trim(),
        completed: false,
        createdAt: new Date(),
        description: "",
        deadline: null,  
    };
}
