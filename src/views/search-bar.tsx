/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

type SearchBarProps = {
    query: string;
    onChange: (value: string) => void;
};

const Input = styled.input`
  width: 100%;
  padding: ${(p) => p.theme.spacing(1)};
  border: 1px solid ${(p) => p.theme.colors.border};
  border-radius: ${(p) => p.theme.radius.sm};
  margin-bottom: ${(p) => p.theme.spacing(2)};
`;

export const SearchBar = (p: SearchBarProps) => {
    return (
        <Input
            type="text"
            placeholder="Поиск задач..."
            value={p.query}
            onChange={(e) => p.onChange(e.target.value)}
        />
    );
};
