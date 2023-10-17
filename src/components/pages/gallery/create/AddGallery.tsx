import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { useForm } from 'react-hook-form';
import { galleryValidationSchema } from '../../../../shared/validations/AlbumGallery';
import { TGalleryCreate } from '../../../../shared/types/gallery';
import { toast } from 'react-toastify';
import { Button, Card, Grid, Typography } from '@mui/material';
import { Form } from '../../../common/Form';

function AddGallery() {

    const galleryFormValues = useForm({
        mode: "all",
        defaultValues: {
            title: "",
            description: "",
            file: ""
        },
        resolver: yupResolver(galleryValidationSchema)
    });

    const formSubmitHandler = async (data: TGalleryCreate) => {
        try {
            console.log("Data", data)
            toast.success("Album created successfully!");
            galleryFormValues.reset();
        } catch (error: any) {
            toast.error('Something went wrong. Please try again later.')
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
                            <Form.Input type="file" label="" name="file" />
                        </Grid>
                    </Grid>
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

export default AddGallery