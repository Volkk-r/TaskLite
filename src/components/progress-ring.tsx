/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

type ProgressBarProps = {
    percent: number;
};

const Wrapper = styled.div`
    margin: ${(p) => p.theme.spacing(2)} 0;
`;

const BarBackground = styled.div`
    width: 100%;
    height: 10px;
    background: ${(p) => p.theme.colors.border};
    border-radius: 9999px;
    overflow: hidden;
`;

const BarFill = styled.div<{ percent: number }>`
    height: 100%;
    width: ${(p) => p.percent}%;
    background: linear-gradient(
        90deg,
        ${(p) => p.theme.colors.accent},
        ${(p) => p.theme.colors.accentHover}
    );
    transition: width 0.4s ease;
    border-radius: 9999px;
`;

const Label = styled.p`
    margin-top: ${(p) => p.theme.spacing(1)};
    font-size: ${(p) => p.theme.font.size.sm};
    color: ${(p) => p.theme.colors.textMuted};
    text-align: center;
`;

export const ProgressBar = ({ percent }: ProgressBarProps) => {
    return (
        <Wrapper>
            <BarBackground>
                <BarFill percent={percent} />
            </BarBackground>
            <Label>Завершено: {percent}%</Label>
        </Wrapper>
    );
};
