/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import type { Task, Filter } from "../entities/task";
import { makeTask } from "../entities/task";
import { TaskInput } from "../components/task-input";
import { TaskList } from "../components/task-list";
import { FilterBar } from "../views/filter-bar";
import { SearchBar } from "../views/search-bar";
import { saveTasks, loadTasks } from "../entities/storage";
import { TaskModal } from "../components/task-modal";
import { ProgressBar } from "../components/progress-ring";

const Wrapper = styled.div`
    padding: ${(p) => p.theme.spacing(4)};
    max-width: 600px;
    margin: 0 auto;
`;

const Counter = styled.p`
    margin-top: ${(p) => p.theme.spacing(2)};
    font-size: 14px;
    color: ${(p) => p.theme.colors.textMuted};
`;
const ClearButton = styled.button`
    margin-top: ${(p) => p.theme.spacing(2)};
    padding: 6px 14px;
    border: 1px dashed ${(p) => p.theme.colors.accent};
    border-radius: ${(p) => p.theme.radius.sm};
    background: transparent;
    color: ${(p) => p.theme.colors.accent};
    font-size: 14px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
        background: ${(p) => p.theme.colors.accent}20; // лёгкий прозрачный акцент
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
        border-color: #8d8888;
        color: ${(p) => p.theme.colors.textMuted};
        background: transparent;
    }
`;
const CountWrapp = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
export const TasksPage = () => {
    // инициализация сразу из localStorage
    const [tasks, setTasks] = useState<Task[]>(() => loadTasks());
    const [filter, setFilter] = useState<Filter>("all");
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState<"newest" | "oldest">("newest");
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    // сохранение при каждом изменении списка
    useEffect(() => {
        saveTasks(tasks);
    }, [tasks]);

    // добавить задачу
    const handleAddTask = (title: string) => {
        const newTask = makeTask(title);
        setTasks([newTask, ...tasks]);
    };

    // переключить статус
    const handleToggleTask = (id: string) => {
        setTasks(
            tasks.map((t) =>
                t.id === id ? { ...t, completed: !t.completed } : t
            )
        );
    };

    // удалить задачу
    const handleRemoveTask = (id: string) => {
        setTasks(tasks.filter((t) => t.id !== id));
    };

    // очистить выполненные задачи
    const handleClearCompleted = () => {
        setTasks(tasks.filter((t) => !t.completed));
    };

    // редактировать задачу
    //   const handleEditTask = (id: string, newTitle: string) => {
    //     setTasks(
    //         tasks.map((t) =>
    //             t.id === id ? { ...t, title: newTitle } : t
    //         )
    //     );
    // };
    // обновляемая версия handleEditTask
    // const handleEditTask = (id: string, newTitle: string, newDescription: string) => {
    //     setTasks(
    //         tasks.map((t) =>
    //             t.id === id ? { ...t, title: newTitle, description: newDescription } : t
    //         )
    //     );
    // };
    // редактировать задачу
    const handleEditTask = (
        id: string,
        newTitle: string,
        newDescription: string,
        newDeadline: Date | null  
    ) => {
        setTasks(
            tasks.map((t) =>
                t.id === id
                    ? { ...t, title: newTitle, description: newDescription, deadline: newDeadline } 
                    : t
            )
        );
    };
    // применяем фильтр
    const filteredTasks = tasks.filter((t) => {
        if (filter === "active") return !t.completed;
        if (filter === "completed") return t.completed;
        return true;
    });

    // применяем поиск
    const searchedTasks = filteredTasks.filter((t) =>
        t.title.toLowerCase().includes(query.toLowerCase())
    );

    // применяем сортировку
    const sortedTasks = [...searchedTasks].sort((a, b) => {
        if (sort === "newest") {
            return b.createdAt.getTime() - a.createdAt.getTime();
        }
        return a.createdAt.getTime() - b.createdAt.getTime();
    });

    const total = tasks.length;
    const active = tasks.filter((t) => !t.completed).length;
    const completed = tasks.filter((t) => t.completed).length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    return (
        <Wrapper>
            <h1>TaskLite</h1>

            <TaskInput onAdd={handleAddTask} />

            <SearchBar query={query} onChange={setQuery} />

            <FilterBar
                filter={filter}
                onChange={setFilter}
                sort={sort}
                onSortChange={setSort}
            />
            <ProgressBar percent={percent} />

            <TaskList
                tasks={sortedTasks}
                onToggle={handleToggleTask}
                onRemove={handleRemoveTask}
                onEdit={(task) => setEditingTask(task)} // 👈 теперь onEdit открывает модалку
            />

            {editingTask && (
                <TaskModal
                    task={editingTask}
                    onClose={() => setEditingTask(null)}
                    onSave={handleEditTask}
                />
            )}
            <CountWrapp>
                <Counter>
                    Всего: {total} | Активных: {active} | Выполненных: {completed}
                </Counter>
                <ClearButton onClick={handleClearCompleted} disabled={completed === 0}>
                    Очистить выполненные
                </ClearButton>
            </CountWrapp>

        </Wrapper>
    );
};
