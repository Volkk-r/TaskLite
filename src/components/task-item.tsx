/** @jsxImportSource @emotion/react */
import { useState } from "react";
import styled from "@emotion/styled";
import type { Task } from "../entities/task";
import { useTheme } from "@emotion/react"; // 👈 добавить

type TaskItemProps = {
    task: Task;
    isFirst?: boolean;
    onToggle: (id: string) => void;
    onRemove: (id: string) => void;
    onEdit: (task: Task) => void;
};

const ListItem = styled.li<{ isFirst?: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: ${(p) => p.theme.spacing(1)};
    margin-bottom: ${(p) => p.theme.spacing(1)};
    background-color: ${(p) => p.theme.colors.surface};
    border: 1px solid ${(p) => p.theme.colors.border};
    border-radius: ${(p) => p.theme.radius.sm};
    font-weight: ${(p) => (p.isFirst ? "bold" : "normal")};
`;

const TitleRow = styled.div`
    display: flex;
    align-items: flex-end;
    gap: ${(p) => p.theme.spacing(0.5)};
`;

const Title = styled.span<{ completed?: boolean; isFirst?: boolean }>`
    text-decoration: ${(p) => (p.completed ? "line-through" : "none")};
    color: ${(p) =>
        p.completed ? p.theme.colors.textMuted : p.theme.colors.text};
    cursor: pointer;
    font-weight: ${(p) => (p.isFirst ? "bold" : "normal")};
    user-select: none;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

/* второстепенный текст под заголовком */
const Description = styled.div<{ expanded: boolean }>`
    font-size: 13px;
    color: ${(p) => p.theme.colors.textMuted};
    font-weight: normal; /* всегда обычный вес */
  
    line-height: 1.5;
max-width: ${(p) => (p.expanded ? "450px" : "0")};
    max-height: ${(p) => (p.expanded ? "200px" : "0")};
    opacity: ${(p) => (p.expanded ? 1 : 0)};
    overflow: hidden;
`;

const DateText = styled.span`
    font-size: 12px;
    color: ${(p) => p.theme.colors.textMuted};
    margin-top: 4px;
    font-weight: normal;
`;

const MoreButton = styled.button`
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 2px;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    svg {
        width: 14px;
        height: 14px;
    }
`;

const IconButton = styled.button`
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 0 2px;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    svg {
        width: 18px;
        height: 18px;
    }
`;

const DatesRow = styled.div`
    display: flex;
    align-items: flex-end;
    gap: ${(p) => p.theme.spacing(1)};
    font-size: 12px;
    margin-top: 2px;
`;

const DeadlineText = styled.span<{ color: string }>`
    color: ${(p) => p.color};
    font-weight: normal;
`;

const Arrow = styled.span`
    color: ${(p) => p.theme.colors.textMuted};
`;


export const TaskItem = (p: TaskItemProps) => {
    const [showDescription, setShowDescription] = useState(false);
    const theme = useTheme(); 

    const getDeadlineColor = (date: Date) => {
        const now = new Date();
        const diff = date.getTime() - now.getTime();
        const days = diff / (1000 * 60 * 60 * 24);

        if (days < 0) return theme.colors.error;        // просрочен
        if (days <= 1) return theme.colors.warning;     // сегодня/завтра
        if (days <= 3) return theme.colors.accent;      // скоро
        return theme.colors.textMuted;                  // далеко
    };
    return (
        <ListItem isFirst={p.isFirst}>
            <Content>
                <TitleRow>
                    <Title
                        completed={p.task.completed}
                        isFirst={p.isFirst}
                        onClick={() => p.onToggle(p.task.id)}
                    >
                        {p.task.title}
                    </Title>

                    {p.task.description && p.task.description.trim() !== "" && (
                        <MoreButton
                            onClick={() => setShowDescription((v) => !v)}
                            aria-label="Показать описание"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle cx="5" cy="12" r="2" fill="#757575" />
                                <circle cx="12" cy="12" r="2" fill="#757575" />
                                <circle cx="19" cy="12" r="2" fill="#757575" />
                            </svg>
                        </MoreButton>
                    )}
                </TitleRow>

                {/* описание теперь сразу под заголовком, но перед временем */}
                <Description expanded={showDescription}>
                    {p.task.description}
                </Description>

                <DatesRow>
                    <DateText>
                        {p.task.createdAt.toLocaleString("ru-RU", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </DateText>

                    {p.task.deadline && (
                        <>
                            <Arrow>→</Arrow>
                            <DeadlineText color={getDeadlineColor(p.task.deadline)}>
                                {p.task.deadline.toLocaleDateString("ru-RU", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                })}
                            </DeadlineText>
                        </>
                    )}
                </DatesRow>
            </Content>

            <div>
                {/* Кнопка редактирования */}
                <IconButton onClick={() => p.onEdit(p.task)} aria-label="Изменить">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M20.1498 7.93997L8.27978 19.81C7.21978 20.88 4.04977 21.3699 3.32977 20.6599C2.60977 19.9499 3.11978 16.78 4.17978 15.71L16.0498 3.84C16.5979 3.31801 17.3283 3.03097 18.0851 3.04019C18.842 3.04942 19.5652 3.35418 20.1004 3.88938C20.6356 4.42457 20.9403 5.14781 20.9496 5.90463C20.9588 6.66146 20.6718 7.39189 20.1498 7.93997V7.93997Z"
                            stroke="#c2c2c2"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </IconButton>

                {/* Кнопка удаления */}
                <IconButton onClick={() => p.onRemove(p.task.id)} aria-label="Удалить">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19 5L5 19M5.00001 5L19 19"
                            stroke="#dd8888"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </IconButton>
            </div>
        </ListItem>
    );
};
