import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { useForm } from 'react-hook-form';
import { galleryValidationSchema } from '../../../../shared/validations/AlbumGallery';
import { TGalleryCreate } from '../../../../shared/types/gallery';
import { toast } from 'react-toastify';
import { Button, Card, Grid, Typography } from '@mui/material';
import { Form } from '../../../common/Form';
import { useCreateGalleryMutation, useUpdateGalleryMutation } from '../../../../shared/store/api/gallery';

function AddGallery(props: any) {

    const { albumId, galleryData } = props
    const [addGallery] = useCreateGalleryMutation()

    const [updateGallery] = useUpdateGalleryMutation()
    const galleryId = galleryData?._id
    console.log("🚀 ~ file: AddGallery.tsx:18 ~ AddGallery ~ galleryId:", galleryId)

    const galleryFormValues = useForm({
        mode: "all",
        defaultValues: {
            title: "",
            description: "",
            file: ""
        },
        values: {
            title: galleryData?.title,
            description: galleryData?.description,
            file: ""
        },
        resolver: yupResolver(galleryValidationSchema)
    });


    const getData = (data: any) => {
        let reqBody = {};
        reqBody = {
            title: data.title,
            description: data.description,
            albumId: albumId,
            file: data?.file
        }
        return reqBody;
    }

    const updateGalleryData = (data: any) => {
        let reqBody = {};
        reqBody = {
            newTitle: data.title,
            newDescription: data.description,
            file: data?.file,
            galleryId: galleryId,
        }
        return reqBody;
    }

    const formSubmitHandler = async (data: any) => {
        try {
            if (galleryData) {
                const requestBody = updateGalleryData(data);
                const fileKeys = Object.entries(requestBody);
                let formData = new FormData();
                fileKeys.forEach((elm: any) => {
                    if (Array.isArray(elm[1])) {
                        if (elm[1] !== undefined)
                            elm[1].forEach((file) => {
                                formData.append(elm[0], file);
                            });
                    } else {
                        if (elm[1] !== undefined) formData.append(elm[0], elm[1]);
                    }
                });
                await updateGallery(formData).unwrap();
                toast.success("Gallery updated successfully!");
                galleryFormValues.reset({ title: "", description: "", file: "" });
            }
            else {
                const requestBody = getData(data);
                const fileKeys = Object.entries(requestBody);
                let formData = new FormData();
                fileKeys.forEach((elm: any) => {
                    if (Array.isArray(elm[1])) {
                        if (elm[1] !== undefined)
                            elm[1].forEach((file) => {
                                formData.append(elm[0], file);
                            });
                    } else {
                        if (elm[1] !== undefined) formData.append(elm[0], elm[1]);
                    }
                });
                await addGallery(formData).unwrap();
                toast.success("Gallery created successfully!");
                galleryFormValues.reset();
            }
        } catch (error: any) {
            toast.error('Something went wrong. Please try again later.')
            galleryFormValues.reset();
            galleryFormValues.reset({ title: "", description: "", file: "" });
        }
    };

    return (
        <>
            <Card variant="outlined" sx={{ p: 2, mb: 4 }}>
                <Typography variant="h6" className="text-center" sx={{ mb: 2 }}>
                    Create Gallery
                </Typography>
                <Form reactFormContext={galleryFormValues} onSubmit={formSubmitHandler}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
                            <Form.Input label="Title" name="title" />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
                            <Form.Input label="Description" name="description" />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
                            <Form.FileInput multiple name="file" />
                        </Grid>
                    </Grid>
                    <div className="mt-4 text-center">
                        <Button type="submit" variant="contained" color="success">
                            Save
                        </Button>
                        <Button sx={{ ml: 2 }} type="button" variant="contained" color="error">
                            Cancel
                        </Button>
                    </div>
                </Form>
            </Card>
        </>
    )
}

export default AddGallery