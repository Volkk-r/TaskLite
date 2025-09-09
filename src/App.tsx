/** @jsxImportSource @emotion/react */
import { ThemeProvider } from "@emotion/react";
import { GlobalStyles } from "./styles/global";
import { theme } from "./styles/theme";
import { TasksPage } from "./pages/tasks-page";

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <TasksPage />
        </ThemeProvider>
    );
};

export default App;
