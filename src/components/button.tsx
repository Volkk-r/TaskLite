/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

type ButtonProps = {
    label: string;
    onClick: () => void;
};

const StyledButton = styled.button`
    padding: ${(p) => p.theme.spacing(1)} ${(p) => p.theme.spacing(3)};
    border: none;
    border-radius: ${(p) => p.theme.radius.md};
    background: ${(p) => p.theme.colors.accent};
    color: #fff; /* теперь белый текст */
    font-weight: ${(p) => p.theme.font.weight.medium};
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
        background: ${(p) => p.theme.colors.accentHover};
    }

    &:active {
        transform: translateY(1px);
    }
`;

export const Button = (p: ButtonProps) => {
    return <StyledButton onClick={p.onClick}>{p.label}</StyledButton>;
};
