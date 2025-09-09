/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import type { Task } from "../entities/task";

type TaskModalProps = {
    task: Task;
    onSave: (id: string, title: string, description: string, deadline: Date | null) => void;
    onClose: () => void;
};

const Overlay = styled.div<{ visible: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;

    opacity: ${(p) => (p.visible ? 1 : 0)};
    transition: opacity 0.3s ease;
`;

const Modal = styled.div<{ visible: boolean }>`
    background: ${(p) => p.theme.colors.surface};
    padding: ${(p) => p.theme.spacing(3)};
    border-radius: ${(p) => p.theme.radius.md};
    width: 400px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    gap: ${(p) => p.theme.spacing(2)};

    opacity: ${(p) => (p.visible ? 1 : 0)};
    transform: scale(${(p) => (p.visible ? 1 : 0.8)});
    transition: transform 0.3s ease, opacity 0.3s ease;
`;

const Input = styled.input`
    padding: ${(p) => p.theme.spacing(1)};
    border: 1px solid ${(p) => p.theme.colors.border};
    border-radius: ${(p) => p.theme.radius.sm};
    font-size: 14px;
`;

const TextArea = styled.textarea`
    padding: ${(p) => p.theme.spacing(1)};
    border: 1px solid ${(p) => p.theme.colors.border};
    border-radius: ${(p) => p.theme.radius.sm};
    font-size: 14px;
    resize: vertical;
    min-height: 80px;
`;

const Actions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: ${(p) => p.theme.spacing(1)};
`;

const Button = styled.button<{ variant?: "primary" | "secondary" }>`
    padding: 6px 14px;
    border-radius: ${(p) => p.theme.radius.sm};
    border: 1px solid
        ${(p) =>
        p.variant === "primary"
            ? p.theme.colors.accent
            : p.theme.colors.border};
    background: ${(p) =>
        p.variant === "primary"
            ? p.theme.colors.accent
            : p.theme.colors.surface};
    color: ${(p) =>
        p.variant === "primary" ? "#fff" : p.theme.colors.text};
    cursor: pointer;

    &:hover {
        opacity: 0.9;
    }
`;
const DateInput = styled.input`
  padding: ${(p) => p.theme.spacing(0.5)}; // 4px
  border: 1px solid ${(p) => p.theme.colors.border}; // #e5e5e5
  border-radius: ${(p) => p.theme.radius.sm};        // 4px
  font-size: ${(p) => p.theme.font.size.sm};        // 14px
  margin-left: ${(p) => p.theme.spacing(1)};        // 8px
`;
export const TaskModal = (p: TaskModalProps) => {
    const [title, setTitle] = useState(p.task.title);
    const [description, setDescription] = useState(p.task.description ?? "");
    const [visible, setVisible] = useState(false);
    const [deadline, setDeadline] = useState<string>(
        p.task.deadline ? p.task.deadline.toISOString().split("T")[0] : ""
    );


    // анимация появления
    useEffect(() => {
        const timeout = setTimeout(() => setVisible(true), 10);
        return () => clearTimeout(timeout);
    }, []);

    // закрытие по Esc
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setVisible(false);
                setTimeout(p.onClose, 300); // ждём анимацию
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [p]);

    return (
        <Overlay visible={visible}>
            <Modal visible={visible}>
                <h2>Редактирование задачи</h2>
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Название задачи"
                />
                <TextArea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Описание задачи"
                />
                <label>
                    Дедлайн:
                    <DateInput
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                    />
                </label>

                <Actions>
                    <Button
                        onClick={() => {
                            setVisible(false);
                            setTimeout(p.onClose, 300);
                        }}
                    >
                        Отмена
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            if (title.trim() !== "") {
                                p.onSave(
                                    p.task.id,
                                    title.trim(),
                                    description.trim(),
                                    deadline ? new Date(deadline) : null   // 👈 NEW
                                );
                                p.onClose();
                            }
                        }}
                    >
                        Сохранить
                    </Button>
                </Actions>
            </Modal>
        </Overlay>
    );
};
