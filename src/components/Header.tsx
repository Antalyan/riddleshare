import {AppBar, Box, Button, MenuItem, Toolbar, Typography} from "@mui/material";
import {PageMenu} from "./PageMenu.tsx";
import {useNavigate} from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate();
    const pageItems = <>
        <MenuItem key={'home'} onClick={() => navigate('/todo')}>
            Home
        </MenuItem>
        <MenuItem key={'public'} onClick={() => navigate('/public-riddles')}>
            Public riddles
        </MenuItem>
        <MenuItem key={'public'} onClick={() => navigate('/received-riddles')}>
            Received riddles
        </MenuItem>
        <MenuItem key={'public'} onClick={() => navigate('/my-riddles')}>
            My riddles
        </MenuItem>
    </>

    return(<AppBar sx={{ position: 'sticky'}}>
        <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
            <Typography color={"secondary"}>
                RiddleShare
            </Typography>
            <Box display={{xs: "block", md: "none"}}>
                <PageMenu> {pageItems}</PageMenu>
            </Box>
            <Box display={{xs: "none", md: "flex"}} flexDirection={"row"} gap={2}>
                {pageItems}
            </Box>
        </Toolbar>
    </AppBar>)
}
