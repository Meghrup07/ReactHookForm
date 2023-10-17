import { Button, Card, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDeleteAlbumMutation, useGetAlbumQuery } from '../../../../shared/store/api/gallery'
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from '@mui/icons-material/Add';
import AddAlbum from '../create/AddAlbum';
import { toast } from 'react-toastify';

function Album(props: any) {

    const { getAlbumId
    } = props

    const [albumData, setAlbumData] = useState()
    const [open, setOpen] = useState(false);

    const { data: albumList } = useGetAlbumQuery()
    const albumMenu = albumList?.result || []

    const [deleteAlbum] = useDeleteAlbumMutation()

    const onHandleDelete = async (id: any) => {
        try {
            if (window.confirm("Do you really want to delete?")) {
                await deleteAlbum(id).unwrap().then(() => {
                    toast.success("Album deleted successfully!")
                })
            }
        } catch (error: any) {
            toast.error('Something went wrong. Please try again later.')
        }
    }

    const onUpdateAlbum = (album: any) => {
        setAlbumData(album)
        setOpen(true)
    }

    const onHandleClickGetId = (e: any) => {
        getAlbumId(e)
    }

    return (
        <>
            <Card variant="outlined" sx={{ p: 2 }}>
                <AddAlbum onSetUpdateValue={albumData} setOpenValue={open} />
                <div className='albumList'>
                    <ul>
                        {albumMenu?.map((list: any) => (
                            <li key={list._id}>
                                <Typography className='list_wraper'>
                                    <Button variant="text" onClick={(e) => onHandleClickGetId(list._id)}>{list.albumName}</Button>
                                </Typography>
                                <div className='action_wraper'>
                                    <Button>
                                        <Tooltip title="Creat" placement="top">
                                            <AddIcon color="info" />
                                        </Tooltip>
                                    </Button>
                                    <Button onClick={() => onUpdateAlbum(list)}>
                                        <Tooltip title="Edit" placement="top">
                                            <EditIcon color="secondary" />
                                        </Tooltip>
                                    </Button>
                                    <Button onClick={() => onHandleDelete(list._id)}>
                                        <Tooltip title="Delete" placement="top">
                                            <DeleteIcon color="error" />
                                        </Tooltip>
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </Card>
        </>
    )
}

export default Album

