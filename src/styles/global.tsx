/** @jsxImportSource @emotion/react */
import { Global, css } from "@emotion/react";

export const GlobalStyles = () => (
    <Global
        styles={css`
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: 'Inter', system-ui, sans-serif;
                font-size: 15px;
                color: #1a1a1a;
                background: #fff;
                min-height: 100vh;
                position: relative;
                overflow-x: hidden;
            }

            h1 {
                font-size: 22px;
                font-weight: 600;
                margin-bottom: 16px;
            }

            button,
            input,
            select {
                font-family: inherit;
                font-size: inherit;
            }

            /* 🎨 Акварельный фон (статичный) */
            body::before {
                content: "";
                position: fixed;
                inset: 0;
                z-index: -1;
                background: radial-gradient(circle at 20% 30%, rgba(123, 94, 167, 0.25), transparent 60%),
                radial-gradient(circle at 80% 20%, rgba(255, 200, 150, 0.25), transparent 60%),
                radial-gradient(circle at 50% 80%, rgba(150, 220, 200, 0.25), transparent 60%);
                filter: blur(90px);
            }
        `}
    />
);
