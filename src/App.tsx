import {
    AppBar, Box, Button,
    Container,
    createTheme,
    CssBaseline,
    IconButton,
    Menu,
    MenuItem,
    ThemeProvider,
    Toolbar
} from "@mui/material";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import {HomePage} from "./pages/HomePage.tsx";
import {NotFound} from "./pages/NotFound.tsx";
import MenuIcon from '@mui/icons-material/Menu';
import {useState} from "react";
import {PageMenu} from "./components/PageMenu.tsx";
import {Header} from "./components/Header.tsx";
import {PublicRiddlesPage} from "./pages/PublicRiddlesPage.tsx";
import {ReceivedRiddlesPage} from "./pages/ReceivedRiddlesPage.tsx";
import {MyRiddlesPage} from "./pages/MyRiddlesPage.tsx";
import {indigo, deepOrange, red} from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: "#001233"
        },
        primary: {
            main: deepOrange[500], //TODO: replace
        },
        secondary: {
            main: red[400]
        },
        text: {
        //
        }
    },
    typography: {
        fontFamily: [
            '"Baloo 2"',
            "Roboto"
        ].join(', ')
    }
});

export const App = () => {
    const x = "aoj éo";

    return (<ThemeProvider theme={theme}>
        <CssBaseline>
            <BrowserRouter>
                <Header></Header>
            <Container
                maxWidth="md"
                component="main"
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    gap: 2,
                    justifyContent: 'center',
                    my: 4,
                }}
            >
                {x}
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/my-riddles" element={<MyRiddlesPage/>}/>
                        <Route path="/public-riddles" element={<PublicRiddlesPage/>}/>
                        <Route path="/received-riddles" element={<ReceivedRiddlesPage/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
            </Container>
            </BrowserRouter>
        </CssBaseline>
    </ThemeProvider>)
}
