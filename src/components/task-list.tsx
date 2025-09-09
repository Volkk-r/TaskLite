/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import type { Task } from "../entities/task";
import { TaskItem } from "./task-item";

type TaskListProps = {
    tasks: Task[];
    onToggle: (id: string) => void;
    onRemove: (id: string) => void;
    onEdit: (task: Task) => void; // 👈 теперь принимает задачу целиком
};

const List = styled.ul`
    margin-top: ${(p) => p.theme.spacing(2)};
    list-style: none;
    padding: 0;
`;

export const TaskList = (p: TaskListProps) => {
    return (
        <List>
            {p.tasks.map((t, index) => (
                <TaskItem
                    key={t.id}
                    task={t}
                    isFirst={index === 0}
                    onToggle={p.onToggle}
                    onRemove={p.onRemove}
                    onEdit={p.onEdit} // 👈 пробрасываем задачу
                />
            ))}
        </List>
    );
};
