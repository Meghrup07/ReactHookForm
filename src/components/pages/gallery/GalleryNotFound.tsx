import React from 'react'
import { Box, Typography } from '@mui/material';


function GalleryNotFound() {
    return (
        <>
            <Box
                sx={{
                    alignItems: "center",
                    backgroundColor: "background.paper",
                    display: "flex",
                    minHeight: "100%",
                    px: 3,
                }}
            >
                <Typography align="center" color="textPrimary" variant={"sm" ? "h4" : "h1"}>
                    The gallery you are looking for is not found
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
            </Box>
        </>
    )
}

export default GalleryNotFound