import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate()
    return (
        <>
            <Box
                sx={{
                    alignItems: "center",
                    backgroundColor: "background.paper",
                    display: "flex",
                    minHeight: "100%",
                    px: 3,
                    py: "80px",
                }}
            >
                <Container maxWidth="lg">
                    <Typography align="center" color="textPrimary" variant={"sm" ? "h4" : "h1"}>
                        The page you are looking for isn’t here
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: 6,
                        }}
                    >
                        <Box
                            alt="Under development"
                            component="img"
                            src="https://retriever.dev.indous.in/static/error/error404_light.svg"
                            sx={{
                                height: "auto",
                                maxWidth: "100%",
                                width: 400,
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: 6,
                        }}
                    >
                        <Button color="primary" variant="outlined" onClick={() => navigate("")}>
                            Back to home
                        </Button>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default NotFound;