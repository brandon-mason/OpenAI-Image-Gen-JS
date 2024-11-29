import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import Router from "./Router";
import "./global.css";

export default function App() {
    return <MantineProvider theme={theme}>
        <Router/>
    </MantineProvider>;
}
