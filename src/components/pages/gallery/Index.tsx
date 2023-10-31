import { Card, Container, Typography } from '@mui/material'
import React, { useState } from 'react'
import Album from './view/Album'
import Galleries from './view/Galleries'
import AddGallery from './create/AddGallery'

function Gallery() {

    const [albumId, setAlbumId] = useState()
    const [albumMenuId, setMenuAlbumId] = useState();
    const [galleryId, setGalleryId] = useState();
    const [openGalleryForm, setOpenGalleryForm] = useState(false);

    const handleClickGetId = (e: any) => {
        setAlbumId(e)
        setOpenGalleryForm(false);
    }

    const onCreateGalleryHandle = (id: any) => {
        setMenuAlbumId(id)
        setOpenGalleryForm(true);

    }

    const onUpdateGalleryHandle = (id: any) => {
        setGalleryId(id)
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
                            <Album getAlbumId={handleClickGetId} onCreateAlbumId={onCreateGalleryHandle} />
                        </div>
                        <div className='col-md-8'>
                            {openGalleryForm ?
                                <AddGallery galleryId={galleryId} albumId={albumMenuId} />
                                :
                                <Galleries getGalleryId={onUpdateGalleryHandle} albumId={albumId} />
                            }
                        </div>
                    </div>
                </Card>
            </Container>
        </>
    )
}

export default Gallery