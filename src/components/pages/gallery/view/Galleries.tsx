import { Button, Card, Tooltip, Typography } from '@mui/material'
import { skipToken } from '@reduxjs/toolkit/dist/query';
import React from 'react'
import { useGetGalleryQuery } from '../../../../shared/store/api/gallery'
import GalleryNotFound from '../GalleryNotFound';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function Galleries(props: any) {
    const { albumId } = props

    const { data: galleryList, isSuccess } = useGetGalleryQuery(albumId ?? skipToken);

    const galleryDataList = galleryList?.result || []

    return (
        <>
            <Card variant="outlined" sx={{ p: 4 }}>
                {isSuccess ?
                    <>
                        {galleryDataList?.map((list: any) => (
                            <Card key={list._id} variant="outlined" sx={{ p: 4 }}>
                                <div className='galleryList'>
                                    <div className='title_wraper'>
                                        <div className="card-description-social">
                                            <Typography className="card-description-title">
                                                {list.title}
                                            </Typography>
                                            <Typography className="card-description-social-follow">
                                                {list.description}
                                            </Typography>
                                        </div>
                                        <div className='action-buttons'>
                                            <Button
                                                sx={{ ml: 1 }}
                                            >
                                                <Tooltip title="Edit" placement="top">
                                                    <EditIcon color="primary" />
                                                </Tooltip>
                                            </Button>
                                            <Button sx={{ ml: 1 }}>
                                                <Tooltip title="Delete" placement="top">
                                                    <DeleteIcon color="error" />
                                                </Tooltip>
                                            </Button>
                                        </div>
                                    </div>
                                    <div className='galleryImg-wraper mt-3'>
                                        {list.mediaFileInformation?.map((img: any) => (
                                            <img src={img.mediaUrl} alt='img' />
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </>
                    :
                    <GalleryNotFound />
                }
            </Card>
        </>
    )
}

export default Galleries