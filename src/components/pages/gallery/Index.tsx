import { Card, Container, Typography } from '@mui/material'
import React, { useState } from 'react'
import Album from './view/Album'
import Galleries from './view/Galleries'

function Gallery() {

    const [albumId, setAlbumId] = useState()

    const handleClickGetId = (e: any) => {
        setAlbumId(e)
    }

    return (
        <>
            <Container sx={{ mt: 4 }} maxWidth="lg">
                <Card variant="outlined" sx={{ p: 4 }}>
                    <Typography variant="h4" className="text-center" sx={{ mb: 4 }}>
                        Album & Gallery
                    </Typography>
                    <div className='row'>
                        <div className='col-md-4'>
                            <Album getAlbumId={handleClickGetId} />
                        </div>
                        <div className='col-md-8'>
                            <Galleries albumId={albumId} />
                        </div>
                    </div>
                </Card>
            </Container>
        </>
    )
}

export default Gallery