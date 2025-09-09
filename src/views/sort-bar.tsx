/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

type SortBarProps = {
    sort: "newest" | "oldest";
    onChange: (value: "newest" | "oldest") => void;
};

const Select = styled.select`
    padding: ${(p) => p.theme.spacing(1)};
    border: 1px solid ${(p) => p.theme.colors.border};
    border-radius: ${(p) => p.theme.radius.md};
    background: ${(p) => p.theme.colors.surface};
    color: ${(p) => p.theme.colors.text};
    cursor: pointer;
    font-size: ${(p) => p.theme.font.size.md};
    transition: border-color 0.2s ease, background 0.2s ease;

    &:hover {
        border-color: ${(p) => p.theme.colors.accent};
        background: #f5f5f5;
    }

    &:focus {
        outline: none;
        border-color: ${(p) => p.theme.colors.accent};
        background: #f5f5f5;
    }
`;

export const SortBar = (p: SortBarProps) => {
    return (
        <Select
            value={p.sort}
            onChange={(e) => p.onChange(e.target.value as "newest" | "oldest")}
        >
            <option value="newest">Сначала новые</option>
            <option value="oldest">Сначала старые</option>
        </Select>
    );
};
