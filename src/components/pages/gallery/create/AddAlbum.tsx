import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useCreateAlbumMutation, useUpdateAlbumMutation } from '../../../../shared/store/api/gallery';
import { TAlbum, TAlbumUpdate } from '../../../../shared/types/gallery';
import { albumUpdateValidationSchema, albumValidationSchema } from '../../../../shared/validations/AlbumGallery';
import { Form } from '../../../common/Form'

function AddAlbum(props: any) {

    const { onSetUpdateValue, setOpenValue } = props
    const albumId = onSetUpdateValue?._id;
    console.log("🚀 ~ file: AddAlbum.tsx:15 ~ AddAlbum ~ albumId:", albumId)
    const albumNameNew = onSetUpdateValue?.albumName;
    console.log("🚀 ~ file: AddAlbum.tsx:17 ~ AddAlbum ~ albumName:", albumNameNew)

    const [newAlbum] = useCreateAlbumMutation()

    const [updateAlbum] = useUpdateAlbumMutation()

    const albumFormValues = useForm({
        mode: "all",
        defaultValues: {
            albumName: ""
        },
        values: {
            albumName: albumNameNew
        },
        resolver: yupResolver(albumValidationSchema)
    });

    const formSubmitHandler = async (data: TAlbum) => {
        try {
            if (albumId) {
                await updateAlbum({ newAlbumName: data.albumName, albumId: albumId }).unwrap();
                toast.success("Album updated successfully!");
                albumFormValues.reset({ albumName: "" });
            }
            else {
                await newAlbum(data).unwrap();
                toast.success("Album created successfully!");
                albumFormValues.reset();
            }
        } catch (error: any) {
            toast.error('Something went wrong. Please try again later.')
        }
    };

    return (
        <>
            <Card variant="outlined" sx={{ p: 2, mb: 4 }}>
                <Typography variant="h6" className="text-center" sx={{ mb: 2 }}>
                    Add Album
                </Typography>
                <Form reactFormContext={albumFormValues} onSubmit={formSubmitHandler}>
                    <Form.Input label="Album Name" name="albumName" />
                    <div className="mt-4 text-center">
                        <Button type="submit" variant="contained" color="success">
                            Save
                        </Button>
                    </div>
                </Form>
            </Card>
        </>
    )
}

export default AddAlbum